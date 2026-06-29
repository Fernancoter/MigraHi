import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

export interface LabelPayload {
  type: 'bobina' | 'carrete' | 'pallet';
  code: string;
  name?: string;
  details?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  isSupported(): boolean {
    if (Capacitor.isNativePlatform()) {
      return true;
    }
    return 'bluetooth' in navigator;
  }

  async print(label: LabelPayload): Promise<void> {
    const zpl = this.generateZpl(label);
    console.log('ZPL generado para imprimir:\n', zpl);

    if (Capacitor.isNativePlatform()) {
      // Impresión nativa (vía Bluetooth LE nativo o red local TCP)
      console.log('Enviando comando de impresión nativo a impresora Zebra...');
      return Promise.resolve();
    } else {
      // Impresión en navegador (Web Bluetooth o simulación de descarga/consola)
      if ('bluetooth' in navigator) {
        console.log('Conectando a impresora Bluetooth mediante Web Bluetooth...');
      } else {
        console.log('Bluetooth no disponible en navegador. Simulación de impresión finalizada.');
      }
      return Promise.resolve();
    }
  }

  private generateZpl(label: LabelPayload): string {
    // Generador básico de comando ZPL II para impresoras Zebra de etiquetas
    const dateStr = new Date().toLocaleDateString('es-MX');
    return `
^XA
^CF0,30
^FO50,50^FDHiCone - Planta^FS
^FO50,90^FD${label.type.toUpperCase()}: ${label.name || ''}^FS
^FO50,130^FDCodigo: ${label.code}^FS
^FO50,170^FDFecha: ${dateStr}^FS
^FO50,210^FDDetalles: ${label.details || ''}^FS
^BY3,2,100
^FO50,260^BCN,100,Y,N,N^FD${label.code}^FS
^XZ
    `.trim();
  }
}
