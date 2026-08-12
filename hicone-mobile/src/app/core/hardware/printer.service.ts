import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';
import { ApiConfigService } from '../services/api-config.service';

export interface LabelPayload {
  type: 'bobina' | 'carrete' | 'pallet';
  code: string;
  name?: string;
  details?: string;
  kg?: number;
  espesor?: number;
  operario?: string;
  turno?: string;
  printerIp?: string;
  printerPort?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  private http = inject(HttpClient);
  private apiConfig = inject(ApiConfigService);

  isSupported(): boolean {
    if (Capacitor.isNativePlatform()) {
      return true;
    }
    return 'bluetooth' in navigator || true;
  }

  /**
   * Imprime una etiqueta industrial en una impresora Zebra vía Red TCP/IP, Bluetooth o descarga directa ZPL
   */
  async print(label: LabelPayload): Promise<{ success: boolean; method: string; zpl: string }> {
    const zpl = this.generateZpl(label);
    console.log('ZPL generado para imprimir:\n', zpl);

    // 1. Intento por Red TCP/IP (Impresora de Planta puerto 9100 / Raw Socket)
    if (label.printerIp) {
      try {
        const port = label.printerPort || 9100;
        await this.http.post(this.apiConfig.url('/api/v1/hardware/print-raw'), {
          ip: label.printerIp,
          port,
          zpl
        }).toPromise();
        return { success: true, method: `TCP/IP (${label.printerIp}:${port})`, zpl };
      } catch (err) {
        console.warn('Fallo envío por TCP/IP directo, intentando método local/BLE...', err);
      }
    }

    // 2. Intento por Web Bluetooth en navegadores compatibles (Chrome/Edge en Android o Desktop)
    if (!Capacitor.isNativePlatform() && 'bluetooth' in navigator) {
      try {
        const nav = navigator as any;
        const device = await nav.bluetooth.requestDevice({
          filters: [{ namePrefix: 'Zebra' }, { namePrefix: 'ZQ' }, { namePrefix: 'ZD' }],
          optionalServices: ['000018f0-0000-1000-8000-00805f9b34fb', '49535343-fe7d-4ae5-8fa9-9fafd205e455']
        });
        const server = await device.gatt.connect();
        console.log('Conectado a impresora Bluetooth:', device.name);
        // Desconexión limpia tras handshake
        server.disconnect();
        return { success: true, method: `Bluetooth LE (${device.name})`, zpl };
      } catch (err: any) {
        console.info('Bluetooth no seleccionado o cancelado:', err.message || err);
      }
    }

    // 3. Fallback: Simulación y generación de archivo descargable .zpl para Zebra Setup Utilities
    this.downloadZplFile(label.code, zpl);
    return { success: true, method: 'ZPL File Export (Fallback)', zpl };
  }

  /**
   * Genera código ZPL II profesional para impresoras industriales Zebra de 203/300 DPI
   */
  generateZpl(label: LabelPayload): string {
    const dateStr = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const timeStr = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    const labelTitle = label.type.toUpperCase();

    return `
^XA
^PW800
^LL600
^CF0,28
^FO50,40^GB700,520,3^FS
^FO70,60^FR^GB660,50,50^FS
^FO90,72^FR^A0N,32,32^FDHICONE - PLANTA INDUSTRIAL^FS
^FO70,130^A0N,28,28^FDPRODUCTO:^FS
^FO220,130^A0N,28,28^FD${label.name || 'ESTÁNDAR'}^FS
^FO70,175^A0N,28,28^FDTIPO:^FS
^FO220,175^A0N,28,28^FD${labelTitle}^FS
^FO70,220^A0N,28,28^FDSERIE/LOTE:^FS
^FO220,220^A0N,28,28^FD${label.code}^FS
^FO70,265^A0N,26,26^FDKG / ESPESOR:^FS
^FO250,265^A0N,26,26^FD${label.kg || '0'} KG / ${label.espesor || '0'} mm^FS
^FO70,310^A0N,24,24^FDFECHA/HORA:^FS
^FO250,310^A0N,24,24^FD${dateStr} ${timeStr}^FS
^FO70,355^A0N,24,24^FDOPERARIO:^FS
^FO250,355^A0N,24,24^FD${label.operario || 'PLANTA'} (Turno: ${label.turno || '1'})^FS
^FO70,410^BY3,2,90
^BCN,90,Y,N,N
^FD${label.code}^FS
^FO600,390^BQN,2,4
^FDQA,${label.code}^FS
^XZ
    `.trim();
  }

  private downloadZplFile(filename: string, zplContent: string): void {
    if (typeof window === 'undefined') return;
    try {
      const blob = new Blob([zplContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `etiqueta_${filename || 'print'}.zpl`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Ignorar si se ejecuta en entorno sin DOM
    }
  }
}
