import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="main-header glass">
      <div class="header-search">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Buscar en el ERP..." class="search-input">
      </div>
      
      <div class="header-actions">
        <button class="action-btn">
          <span class="btn-icon">🔔</span>
          <span class="badge">3</span>
        </button>
        <div class="divider"></div>
        <div class="date-display">
          <span class="date-label">Hoy:</span>
          <span class="date-value">{{ today | date:'longDate':'':'es-MX' }}</span>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .main-header {
      height: var(--header-height);
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 90;
      margin: 1rem;
      border-radius: var(--radius-md);
    }
    
    .header-search {
      display: flex;
      align-items: center;
      background: var(--bg-main);
      padding: 0.5rem 1rem;
      border-radius: 10px;
      width: 300px;
      border: 1px solid var(--border-color);
    }
    
    .search-icon { font-size: 0.875rem; margin-right: 0.5rem; }
    .search-input {
      background: transparent;
      border: none;
      outline: none;
      color: var(--text-main);
      width: 100%;
      font-size: 0.875rem;
    }
    
    .header-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    
    .action-btn {
      background: transparent;
      border: none;
      position: relative;
      cursor: pointer;
      font-size: 1.25rem;
      color: var(--text-muted);
    }
    
    .badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: var(--danger);
      color: white;
      font-size: 0.6rem;
      padding: 2px 4px;
      border-radius: 10px;
      font-weight: 700;
    }
    
    .divider { width: 1px; height: 24px; background: var(--border-color); }
    
    .date-display { display: flex; flex-direction: column; }
    .date-label { font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; }
    .date-value { font-size: 0.875rem; font-weight: 600; }
  `]
})
export class HeaderComponent {
  today = new Date();
}
