import { Injectable, inject, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfflineStoreService } from './offline-store.service';
import { lastValueFrom, fromEvent } from 'rxjs';

export interface PendingOp {
  id: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body: any;
  createdAt: number;
}

export interface FlushResult {
  /** Operaciones aceptadas por el servidor (2xx). */
  succeeded: number;
  /** Operaciones que siguen en la cola por error temporal (red/5xx) — se reintentarán. */
  failed: number;
  /** Operaciones movidas a la bandeja de fallidos por error de cliente (4xx) — NO se reintentan y requieren revisión. */
  deadLettered: number;
}

@Injectable({
  providedIn: 'root'
})
export class SyncQueueService {
  private http = inject(HttpClient);
  private store = inject(OfflineStoreService);
  private queueKey = 'sync_queue';
  /** Bandeja de operaciones que el servidor rechazó (4xx). Visibles para el operador, nunca descartadas en silencio. */
  private deadLetterKey = 'sync_dead_letter';
  private isSyncing = false;
  private ngZone = inject(NgZone);

  constructor() {
    fromEvent(window, 'online').subscribe(() => {
      this.ngZone.run(() => {
        this.flush().catch(err => console.error('On-online flush failed:', err));
      });
    });
  }

  async enqueue(op: PendingOp): Promise<void> {
    const queue = await this.getQueue();
    queue.push(op);
    await this.store.set(this.queueKey, queue);
    
    // Si estamos online, intentar vaciar de inmediato
    if (navigator.onLine) {
      this.flush().catch(err => console.error('Auto-flush failed:', err));
    }
  }

  async getQueue(): Promise<PendingOp[]> {
    const queue = await this.store.get<PendingOp[]>(this.queueKey);
    return queue || [];
  }

  async pendingCount(): Promise<number> {
    const queue = await this.getQueue();
    return queue.length;
  }

  /** Operaciones que el servidor rechazó (4xx). Requieren revisión manual del operador/supervisor. */
  async getDeadLetter(): Promise<PendingOp[]> {
    const dl = await this.store.get<PendingOp[]>(this.deadLetterKey);
    return dl || [];
  }

  async deadLetterCount(): Promise<number> {
    const dl = await this.getDeadLetter();
    return dl.length;
  }

  /** Un error de cliente (4xx) es permanente: reintentar no ayuda. Excepción: 408 (timeout) y 429 (rate limit) sí son reintentables. */
  private isPermanentClientError(status: number): boolean {
    return status >= 400 && status < 500 && status !== 408 && status !== 429;
  }

  async flush(): Promise<FlushResult> {
    if (this.isSyncing) {
      return { succeeded: 0, failed: 0, deadLettered: 0 };
    }
    this.isSyncing = true;

    let succeeded = 0;
    let failed = 0;
    let deadLettered = 0;

    try {
      const queue = await this.getQueue();
      const remainingQueue: PendingOp[] = [];
      const newDeadLetter: PendingOp[] = [];

      for (const op of queue) {
        if (!navigator.onLine) {
          // Si se pierde la red a mitad del proceso, detenerse
          remainingQueue.push(op);
          failed++;
          continue;
        }

        try {
          // Ejecutar la petición HTTP convirtiendo el Observable a Promesa.
          // Idempotency-Key: el servidor deduplica por este id, evitando registros
          // duplicados si la op se reenvía tras un timeout en que el servidor ya la procesó.
          await lastValueFrom(
            this.http.request(op.method, op.endpoint, {
              body: op.body,
              headers: { 'Idempotency-Key': op.id }
            })
          );
          succeeded++;
        } catch (error: any) {
          if (this.isPermanentClientError(error.status)) {
            // El servidor rechazó la operación (4xx). Reintentar no la arreglaría y trabaría
            // la cola. NO se descarta en silencio: se mueve a la bandeja de fallidos para
            // que el operador/supervisor la vea y la corrija manualmente.
            console.error(`Operacion rechazada por el servidor (${error.status}), movida a bandeja de fallidos:`, op);
            newDeadLetter.push(op);
            deadLettered++;
          } else {
            // Error temporal (0 sin red, 5xx, 408, 429): se mantiene en cola para reintento.
            console.error(`Error temporal (${error.status}) en operacion, se conserva en cola:`, op);
            remainingQueue.push(op);
            failed++;
          }
        }
      }

      await this.store.set(this.queueKey, remainingQueue);

      if (newDeadLetter.length > 0) {
        const existingDeadLetter = await this.getDeadLetter();
        await this.store.set(this.deadLetterKey, [...existingDeadLetter, ...newDeadLetter]);
      }
    } finally {
      this.isSyncing = false;
    }

    return { succeeded, failed, deadLettered };
  }
}
