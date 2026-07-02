import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';

export interface ScanResult {
  value: string;
  format: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScannerService {
  isSupported(): boolean {
    if (Capacitor.isNativePlatform()) {
      return true;
    }
    return 'BarcodeDetector' in window;
  }

  async scan(): Promise<ScanResult> {
    if (Capacitor.isNativePlatform()) {
      // Pedir permisos de cámara
      const status = await BarcodeScanner.requestPermissions();
      if (status.camera !== 'granted') {
        throw new Error('Camera permission not granted');
      }

      // Iniciar el scanner nativo
      const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.Code128, BarcodeFormat.QrCode]
      });

      if (barcodes.length > 0) {
        return {
          value: barcodes[0].rawValue || '',
          format: barcodes[0].format || ''
        };
      }
      throw new Error('No barcode detected');
    } else {
      // Fallback para Web / PWA en navegador de escritorio
      const value = prompt('Escáner Web: Ingrese el código de barras manualmente (o conecte un escáner físico de teclado):');
      if (value) {
        return { value, format: 'MANUAL' };
      }
      throw new Error('Scan cancelled by user');
    }
  }
}
