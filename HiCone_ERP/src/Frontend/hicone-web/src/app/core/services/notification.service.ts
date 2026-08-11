import { Injectable, signal } from '@angular/core';

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  toasts = signal<ToastNotification[]>([]);

  show(type: 'success' | 'error' | 'warning' | 'info', message: string, title?: string, duration = 4000) {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5);
    const toast: ToastNotification = { id, type, message, title, duration };
    
    // Evitar notificaciones duplicadas idénticas activas
    const existing = this.toasts().find(t => t.message === message && t.type === type);
    if (existing) return;

    this.toasts.update(list => [...list, toast]);

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }
  }

  success(message: string, title = 'Éxito') {
    this.show('success', message, title);
  }

  error(message: string, title = 'Error') {
    this.show('error', message, title, 5000);
  }

  warning(message: string, title = 'Advertencia') {
    this.show('warning', message, title, 4000);
  }

  info(message: string, title = 'Información') {
    this.show('info', message, title);
  }

  dismiss(id: string) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}
