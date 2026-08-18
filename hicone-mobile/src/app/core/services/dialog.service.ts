import { Injectable, signal } from '@angular/core';

export interface DialogConfig {
  message: string;
  title?: string;
  type: 'alert' | 'confirm';
  acceptLabel?: string;
  cancelLabel?: string;
  resolve: (value: boolean) => void;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public activeDialog = signal<DialogConfig | null>(null);

  alert(message: string, title?: string, acceptLabel = 'Aceptar'): Promise<void> {
    return new Promise<void>((resolve) => {
      this.activeDialog.set({
        message,
        title,
        type: 'alert',
        acceptLabel,
        resolve: () => {
          this.activeDialog.set(null);
          resolve();
        }
      });
    });
  }

  confirm(message: string, title?: string, acceptLabel = 'Aceptar', cancelLabel = 'Cancelar'): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.activeDialog.set({
        message,
        title,
        type: 'confirm',
        acceptLabel,
        cancelLabel,
        resolve: (result: boolean) => {
          this.activeDialog.set(null);
          resolve(result);
        }
      });
    });
  }
}
