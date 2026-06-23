import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfflineStoreService } from './offline-store.service';
import { lastValueFrom } from 'rxjs';

export interface PendingOp {
  id: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body: any;
  createdAt: number;
}

export interface FlushResult {
  succeeded: number;
  failed: number;
}

@Injectable({
  providedIn: 'root'
})
export class SyncQueueService {
  private http = inject(HttpClient);
  private store = inject(OfflineStoreService);
  private queueKey = 'sync_queue';
  private isSyncing = false;

  constructor() {
    window.addEventListener('online', () => {
      this.flush().catch(err => console.error('On-online flush failed:', err));
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

  async flush(): Promise<FlushResult> {
    if (this.isSyncing) {
      return { succeeded: 0, failed: 0 };
    }
    this.isSyncing = true;
    
    let succeeded = 0;
    let failed = 0;
    
    try {
      const queue = await this.getQueue();
      const remainingQueue: PendingOp[] = [];

      for (const op of queue) {
        if (!navigator.onLine) {
          // Si se pierde la red a mitad del proceso, detenerse
          remainingQueue.push(op);
          failed++;
          continue;
        }

        try {
          // Ejecutar la petición HTTP convirtiendo el Observable a Promesa
          await lastValueFrom(
            this.http.request(op.method, op.endpoint, { body: op.body })
          );
          succeeded++;
        } catch (error: any) {
          // Si es un error del lado del servidor permanente (ej: 400 Bad Request, 403, 404),
          // probablemente no debamos reintentarlo indefinidamente porque trabaría la cola.
          // Si es un error temporal (0 - Sin red, 500, 503, 504), lo mantenemos en la cola para reintento.
          if (error.status >= 400 && error.status < 500 && error.status !== 408 && error.status !== 429) {
            console.error(`Discarding operation due to client error ${error.status}:`, op);
            succeeded++; // Lo contamos como "procesado" (descartado) para no trabar la cola
          } else {
            console.error(`Temporary error ${error.status} for operation, keeping in queue:`, op);
            remainingQueue.push(op);
            failed++;
          }
        }
      }

      await this.store.set(this.queueKey, remainingQueue);
    } finally {
      this.isSyncing = false;
    }

    return { succeeded, failed };
  }
}
