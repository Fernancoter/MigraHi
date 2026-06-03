import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, HeaderComponent],
  template: `
    <div class="layout-container">
      <app-header></app-header>
      
      <div class="body-container" [class.sidebar-mini]="!(isSidebarVisible$ | async)">
        <div class="sidebar-wrapper" [class.collapsed]="!(isSidebarVisible$ | async)">
           <app-sidebar></app-sidebar>
        </div>
        <main class="page-container animate-fade-in">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: var(--bg-main);
    }
    
    .body-container {
      display: flex;
      flex: 1;
      overflow: hidden;
      position: relative;
    }
    
    .sidebar-wrapper {
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      width: 250px;
      overflow: hidden;
    }

    .sidebar-wrapper.collapsed {
      width: 76px;
    }

    .page-container {
      padding: 0;
      flex: 1;
      overflow-y: auto;
      background: white;
      transition: width 0.3s;
    }
  `]
})
export class MainLayoutComponent {
  isSidebarVisible$;

  constructor(private navService: NavigationService) {
    this.isSidebarVisible$ = this.navService.isSidebarVisible$;
  }
}
