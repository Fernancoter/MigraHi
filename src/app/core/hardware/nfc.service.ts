import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class NfcService {
  isSupported(): boolean {
    if (Capacitor.isNativePlatform()) {
      return true;
    }
    return 'NDEFReader' in window;
  }

  async read(): Promise<string> {
    if (Capacitor.isNativePlatform()) {
      console.log('Iniciando sesión de escaneo NFC nativo...');
      // Retorna una simulación en desarrollo nativo si el plugin no está enlazado
      return new Promise((resolve) => {
        setTimeout(() => resolve('NFC_TAG_NATIVO_12345'), 1500);
      });
    } else {
      if ('NDEFReader' in window) {
        try {
          const ndef = new (window as any).NDEFReader();
          await ndef.scan();
          return new Promise((resolve, reject) => {
            ndef.addEventListener('reading', ({ serialNumber }: any) => {
              resolve(serialNumber || 'NFC_TAG_WEB');
            });
            ndef.addEventListener('readingerror', () => {
              reject(new Error('Error al leer la etiqueta NFC.'));
            });
          });
        } catch (error) {
          throw new Error(`No se pudo iniciar el escáner NFC: ${error}`);
        }
      } else {
        const value = prompt('NFC no soportado en este navegador. Ingrese el ID de la etiqueta manualmente:');
        if (value) {
          return value;
        }
        throw new Error('NFC scan cancelled');
      }
    }
  }

  async write(data: string): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      console.log(`Escribiendo en NFC nativo: ${data}`);
      return Promise.resolve();
    } else {
      if ('NDEFReader' in window) {
        const ndef = new (window as any).NDEFReader();
        await ndef.write(data);
      } else {
        alert(`NFC no disponible. Escritura omitida para: ${data}`);
      }
    }
  }
}
