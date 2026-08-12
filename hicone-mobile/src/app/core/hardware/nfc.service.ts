import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

export interface NfcReadResult {
  serialNumber: string;
  data: string;
  records: Array<{ recordType: string; data: string }>;
}

@Injectable({
  providedIn: 'root'
})
export class NfcService {
  private abortController: AbortController | null = null;

  isSupported(): boolean {
    if (Capacitor.isNativePlatform()) {
      return true;
    }
    return typeof window !== 'undefined' && 'NDEFReader' in window;
  }

  /**
   * Inicia una sesión de lectura NFC para leer tags de bobinas, carretes o tarjetas de operador
   */
  async read(): Promise<NfcReadResult> {
    if (this.isSupported() && typeof window !== 'undefined' && 'NDEFReader' in window) {
      try {
        this.stopScanning();
        this.abortController = new AbortController();
        const ndef = new (window as any).NDEFReader();
        await ndef.scan({ signal: this.abortController.signal });

        return new Promise<NfcReadResult>((resolve, reject) => {
          ndef.addEventListener('reading', (event: any) => {
            const serialNumber = event.serialNumber || 'NFC_UNKNOWN_UID';
            const records: Array<{ recordType: string; data: string }> = [];
            let mainData = serialNumber;

            if (event.message && event.message.records) {
              const decoder = new TextDecoder();
              for (const record of event.message.records) {
                let text = '';
                if (record.data) {
                  text = decoder.decode(record.data);
                }
                records.push({ recordType: record.recordType || 'unknown', data: text });
                if (text && !mainData) {
                  mainData = text;
                }
              }
            }

            resolve({ serialNumber, data: mainData, records });
          }, { once: true });

          ndef.addEventListener('readingerror', () => {
            reject(new Error('Error al leer el tag NFC. Asegúrese de mantener el dispositivo cerca del tag.'));
          }, { once: true });
        });
      } catch (error: any) {
        if (error.name === 'NotAllowedError') {
          throw new Error('Permiso de NFC denegado por el usuario o el sistema.');
        }
        throw new Error(`No se pudo iniciar el escaneo NFC: ${error.message || error}`);
      }
    } else {
      // Fallback para pruebas en navegador sin hardware NFC
      const value = prompt('NFC no detectado en este dispositivo. Ingrese el ID / Código del tag manualmente:');
      if (value && value.trim()) {
        return {
          serialNumber: value.trim(),
          data: value.trim(),
          records: [{ recordType: 'text', data: value.trim() }]
        };
      }
      throw new Error('Lectura de NFC cancelada.');
    }
  }

  /**
   * Escribe un registro de texto o ID en un tag NFC NDEF
   */
  async write(data: string): Promise<boolean> {
    if (this.isSupported() && typeof window !== 'undefined' && 'NDEFReader' in window) {
      try {
        const ndef = new (window as any).NDEFReader();
        await ndef.write({
          records: [
            { recordType: 'text', data },
            { recordType: 'mime', mediaType: 'application/json', data: JSON.stringify({ hicone: true, id: data, timestamp: Date.now() }) }
          ]
        });
        return true;
      } catch (error: any) {
        throw new Error(`Error al escribir en el tag NFC: ${error.message || error}`);
      }
    } else {
      console.info(`[NFC Simulación] Escribiendo datos en tag: ${data}`);
      return true;
    }
  }

  /**
   * Cancela la sesión activa de lectura NFC
   */
  stopScanning(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }
}
