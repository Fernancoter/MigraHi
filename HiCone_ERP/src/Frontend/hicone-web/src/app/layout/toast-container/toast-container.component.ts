import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container-qa">
      @for (toast of notifySvc.toasts(); track toast.id) {
        <div class="toast-card-qa" [ngClass]="toast.type" (click)="notifySvc.dismiss(toast.id)">
          <div class="toast-icon-qa">
            @switch (toast.type) {
              @case ('success') { ✓ }
              @case ('error') { ✕ }
              @case ('warning') { ⚠️ }
              @case ('info') { ℹ️ }
            }
          </div>
          <div class="toast-content-qa">
            @if (toast.title) {
              <div class="toast-title-qa">{{ toast.title }}</div>
            }
            <div class="toast-message-qa">{{ toast.message }}</div>
          </div>
          <button class="toast-close-qa" (click)="notifySvc.dismiss(toast.id); $event.stopPropagation()">✕</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container-qa {
      position: fixed;
      top: 70px;
      right: 24px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 420px;
      width: calc(100vw - 48px);
      pointer-events: none;
    }

    .toast-card-qa {
      pointer-events: auto;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08);
      border-left: 5px solid #cbd5e1;
      cursor: pointer;
      animation: slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      transition: all 0.2s ease;
      font-family: 'Inter', sans-serif;
    }

    .toast-card-qa:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 30px -5px rgba(0, 0, 0, 0.18);
    }

    .toast-card-qa.success {
      border-left-color: #10b981;
      background: #ffffff;
    }
    .toast-card-qa.success .toast-icon-qa {
      background: #10b981;
      color: #ffffff;
    }

    .toast-card-qa.error {
      border-left-color: #ef4444;
      background: #ffffff;
    }
    .toast-card-qa.error .toast-icon-qa {
      background: #ef4444;
      color: #ffffff;
    }

    .toast-card-qa.warning {
      border-left-color: #f59e0b;
      background: #ffffff;
    }
    .toast-card-qa.warning .toast-icon-qa {
      background: #f59e0b;
      color: #ffffff;
    }

    .toast-card-qa.info {
      border-left-color: #3b82f6;
      background: #ffffff;
    }
    .toast-card-qa.info .toast-icon-qa {
      background: #3b82f6;
      color: #ffffff;
    }

    .toast-icon-qa {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .toast-content-qa {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .toast-title-qa {
      font-size: 0.85rem;
      font-weight: 700;
      color: #0f172a;
    }

    .toast-message-qa {
      font-size: 0.825rem;
      color: #334155;
      line-height: 1.4;
      word-break: break-word;
    }

    .toast-close-qa {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 14px;
      cursor: pointer;
      padding: 0 4px;
      line-height: 1;
      border-radius: 4px;
      transition: color 0.15s;
    }

    .toast-close-qa:hover {
      color: #334155;
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `]
})
export class ToastContainerComponent {
  notifySvc = inject(NotificationService);
}
