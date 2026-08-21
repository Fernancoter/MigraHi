import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ManualSection {
  id: string;
  title: string;
  badge: string;
  icon: string;
  summary: string;
  image?: string;
  steps: {
    number: number;
    title: string;
    description: string;
    tip?: string;
  }[];
}

@Component({
  selector: 'app-manual-ayuda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="manual-container animate-fade-in">
      <!-- HEADER BANNER DE AYUDA -->
      <div class="manual-header">
        <div class="header-top">
          <button class="btn-back" (click)="goBack()" title="Regresar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" class="icon-back">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div class="header-titles">
            <h1>Manual de Ayuda y Procedimientos</h1>
            <p>Guía de Operación PWA Hi-Cone Planta México v3.6</p>
          </div>
        </div>

        <!-- BARRA DE BÚSQUEDA RÁPIDA -->
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            placeholder="Buscar tema (ej. bobinas, QR, silos, turnos, prensados)..."
            (input)="onSearch()" />
          <button *ngIf="searchQuery" (click)="clearSearch()" class="btn-clear-search">✕</button>
        </div>
      </div>

      <!-- TABS NAVEGADORES DE CATEGORÍA -->
      <div class="category-tabs">
        <button 
          *ngFor="let sec of sections" 
          class="cat-tab" 
          [class.active]="activeSectionId === sec.id" 
          (click)="selectSection(sec.id)">
          <span class="tab-icon">{{ sec.icon }}</span>
          <span class="tab-title">{{ sec.title }}</span>
        </button>
      </div>

      <!-- CONTENIDO PRINCIPAL DE LA SECCIÓN SELECCIONADA -->
      <div class="manual-body" *ngIf="activeSection">
        
        <!-- TARJETA PRINCIPAL DEL RESUMEN Y NAVEGACIÓN -->
        <div class="section-card">
          <div class="card-header-badge">
            <span class="badge-tag">{{ activeSection.badge }}</span>
            <h2>{{ activeSection.icon }} {{ activeSection.title }}</h2>
          </div>
          <p class="section-summary">{{ activeSection.summary }}</p>

          <!-- ILUSTRACIÓN VISUAL (SI LA TIENE) -->
          <div class="illustration-box" *ngIf="activeSection.image" (click)="openImageZoom(activeSection.image)">
            <img [src]="activeSection.image" [alt]="activeSection.title" class="manual-img" />
            <div class="img-caption">
              <span>🔍 Haz clic para ampliar diagrama interactivo de proceso</span>
            </div>
          </div>

          <!-- PASOS SECUENCIALES -->
          <div class="steps-timeline">
            <div class="timeline-item" *ngFor="let step of activeSection.steps">
              <div class="step-badge">{{ step.number }}</div>
              <div class="step-content">
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
                <div class="step-tip" *ngIf="step.tip">
                  <span class="tip-icon">💡</span>
                  <span><strong>Consejo Operativo:</strong> {{ step.tip }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- SECCIÓN DE PREGUNTAS FRECUENTES (FAQ) ACCORDION -->
        <div class="faq-section">
          <h3 class="faq-title">❓ Preguntas Frecuentes y Solución de Problemas</h3>
          
          <div class="faq-accordion">
            <div 
              class="faq-item" 
              *ngFor="let faq of faqs; let i = index" 
              [class.open]="openFaqIndex === i"
              (click)="toggleFaq(i)">
              
              <div class="faq-question">
                <span>{{ faq.q }}</span>
                <span class="faq-toggle">{{ openFaqIndex === i ? '▲' : '▼' }}</span>
              </div>
              
              <div class="faq-answer" *ngIf="openFaqIndex === i">
                <p>{{ faq.a }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- MODAL DE ZOOM DE IMAGEN / DIAGRAMA -->
      <div class="modal-overlay animate-fade-in" *ngIf="zoomedImage" (click)="closeImageZoom()">
        <div class="zoom-card" (click)="$event.stopPropagation()">
          <button (click)="closeImageZoom()" class="btn-close-zoom">✕</button>
          <img [src]="zoomedImage" alt="Diagrama ampliado" style="width: 100%; height: auto; max-height: 80vh; object-fit: contain; border-radius: 8px;" />
        </div>
      </div>

    </div>
  `,
  styles: [`
    .manual-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding-bottom: 40px;
      color: #f8fafc;
    }

    /* HEADER BANNER */
    .manual-header {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    }

    .header-top {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .btn-back {
      background: #334155;
      border: none;
      color: #f8fafc;
      width: 42px;
      height: 42px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-back:hover {
      background: #475569;
    }

    .icon-back {
      width: 22px;
      height: 22px;
    }

    .header-titles h1 {
      font-size: 22px;
      font-weight: 800;
      margin: 0 0 4px 0;
      color: #38bdf8;
    }

    .header-titles p {
      font-size: 13px;
      color: #94a3b8;
      margin: 0;
    }

    /* BARRA BÚSQUEDA */
    .search-box {
      display: flex;
      align-items: center;
      background: #090d16;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 0 14px;
      gap: 10px;
    }

    .search-icon {
      font-size: 16px;
    }

    .search-box input {
      flex: 1;
      background: transparent;
      border: none;
      color: #ffffff;
      font-size: 14px;
      padding: 12px 0;
      outline: none;
    }

    .btn-clear-search {
      background: none;
      border: none;
      color: #94a3b8;
      font-size: 16px;
      cursor: pointer;
    }

    /* CATEGORY TABS */
    .category-tabs {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 6px;
      scrollbar-width: thin;
    }

    .cat-tab {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 12px 18px;
      color: #94a3b8;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      transition: all 0.2s;
    }

    .cat-tab:hover {
      background: #334155;
      color: #ffffff;
    }

    .cat-tab.active {
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      color: #ffffff;
      border-color: #38bdf8;
      box-shadow: 0 4px 14px rgba(56, 189, 248, 0.3);
    }

    /* SECTION CARD */
    .section-card {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    }

    .card-header-badge {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .badge-tag {
      background: rgba(56, 189, 248, 0.1);
      color: #38bdf8;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 4px 10px;
      border-radius: 6px;
      width: fit-content;
      border: 1px solid rgba(56, 189, 248, 0.2);
    }

    .card-header-badge h2 {
      font-size: 20px;
      font-weight: 700;
      color: #f8fafc;
      margin: 0;
    }

    .section-summary {
      font-size: 14px;
      color: #cbd5e1;
      line-height: 1.6;
      margin: 0;
    }

    /* ILUSTRACIÓN */
    .illustration-box {
      border: 1px solid #334155;
      border-radius: 12px;
      overflow: hidden;
      background: #000;
      cursor: pointer;
      transition: transform 0.2s, border-color 0.2s;
    }

    .illustration-box:hover {
      transform: translateY(-2px);
      border-color: #38bdf8;
    }

    .manual-img {
      width: 100%;
      height: auto;
      max-height: 380px;
      object-fit: cover;
      display: block;
    }

    .img-caption {
      background: #1e293b;
      color: #38bdf8;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      padding: 10px;
    }

    /* TIMELINE DE PASOS */
    .steps-timeline {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .timeline-item {
      display: flex;
      gap: 16px;
      background: #182234;
      border: 1px solid #28374d;
      border-radius: 12px;
      padding: 18px;
    }

    .step-badge {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #0284c7;
      color: #ffffff;
      font-weight: 800;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 0 12px rgba(2, 132, 199, 0.4);
    }

    .step-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .step-content h3 {
      font-size: 16px;
      font-weight: 700;
      color: #f8fafc;
      margin: 0;
    }

    .step-content p {
      font-size: 13.5px;
      color: #cbd5e1;
      line-height: 1.5;
      margin: 0;
    }

    .step-tip {
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.3);
      border-radius: 8px;
      padding: 10px 12px;
      color: #fef08a;
      font-size: 12.5px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-top: 6px;
    }

    .tip-icon {
      font-size: 16px;
    }

    /* FAQ ACCORDION */
    .faq-section {
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 10px;
    }

    .faq-title {
      font-size: 18px;
      font-weight: 700;
      color: #f8fafc;
      margin: 0;
    }

    .faq-accordion {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .faq-item {
      background: #182234;
      border: 1px solid #28374d;
      border-radius: 10px;
      padding: 16px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .faq-item:hover {
      background: #1e293b;
    }

    .faq-question {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      font-size: 14px;
      color: #38bdf8;
    }

    .faq-toggle {
      font-size: 12px;
      color: #94a3b8;
    }

    .faq-answer {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px dashed #334155;
      font-size: 13.5px;
      color: #cbd5e1;
      line-height: 1.5;
    }

    .faq-answer p {
      margin: 0;
    }

    /* ZOOM MODAL */
    .zoom-card {
      position: relative;
      max-width: 90vw;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 16px;
    }

    .btn-close-zoom {
      position: absolute;
      top: -12px;
      right: -12px;
      background: #ef4444;
      color: #ffffff;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
      box-shadow: 0 4px 10px rgba(0,0,0,0.5);
    }
  `]
})
export class ManualAyudaComponent {
  private location = inject(Location);

  searchQuery = '';
  activeSectionId = 'extrusion';
  openFaqIndex: number | null = null;
  zoomedImage: string | null = null;

  sections: ManualSection[] = [
    {
      id: 'extrusion',
      title: 'Arranque de Extrusión y Turnos',
      badge: 'Módulo de Extrusión',
      icon: '⚙️',
      summary: 'Procedimiento operativo para la selección de máquina, confirmación previa de turno y producto antes de iniciar la línea de extrusión.',
      image: 'assets/images/manual/extrusion_flow.jpg',
      steps: [
        {
          number: 1,
          title: 'Selección de Extrusora',
          description: 'En el menú superior (icono de engrane ⚙️), seleccione la máquina en la cual trabajará (ej. Extrusora 1, EXT-02).'
        },
        {
          number: 2,
          title: 'Selección de Turno Activo',
          description: 'Presione el icono del reloj 🕒 en la barra superior para activar su turno actual (Matutino, Vespertino o Nocturno). El sistema calculará automáticamente el tiempo restante de su jornada.',
          tip: 'Si ingresa a mitad de turno (ej. a las 8:00 PM en turno de 7:00 PM a 5:00 AM), la app ajusta dinámicamente las horas que le restan a su jornada.'
        },
        {
          number: 3,
          title: 'Vista Previa de Confirmación',
          description: 'Al tocar la extrusora, el sistema le mostrará la tarjeta de confirmación previa con el producto asignado, calibre, ancho y turno. Presione el botón verde "▶ INICIAR TRABAJO EN EXTRUSORA" para habilitar la consola.'
        }
      ]
    },
    {
      id: 'bobinas',
      title: 'Registro de Bobinas y Código QR',
      badge: 'Puntaje y Control de Serie',
      icon: '🏷️',
      summary: 'Guía paso a paso para la captura instantánea de pesaje en Kg, control de calibre y generación de etiquetas térmicas con Folio QR.',
      image: 'assets/images/manual/qr_label_guide.jpg',
      steps: [
        {
          number: 1,
          title: 'Tocar "AGREGAR BOBINAS"',
          description: 'En la consola de la extrusora activa, presione el botón "AGREGAR BOBINAS". El sistema sugerirá automáticamente el siguiente número consecutivo.'
        },
        {
          number: 2,
          title: 'Registro del Pesaje (Kg) y Espesor (mm)',
          description: 'Ingrese el peso bruto obtenido de la báscula y el espesor o calibre. Al dar clic en "REGISTRAR Y GENERAR QR", la bobina se guarda optimistamente en 0 ms.'
        },
        {
          number: 3,
          title: 'Generación e Impresión del Código QR',
          description: 'En la pestaña "Validado (QA)" o haciendo clic en el icono de la impresora 🖨️, el sistema abre la vista previa de la etiqueta con el Código QR de alta precisión para escaneo en planta.',
          tip: 'Si la bobina sale fuera de tolerancia de calibre o por contaminación, seleccione la opción "Descartar y enviar a Molino" para registrar el motivo.'
        }
      ]
    },
    {
      id: 'silos',
      title: 'Cambio de Silos y Mezcla',
      badge: 'Control de Material',
      icon: '📦',
      summary: 'Registro y seguimiento de silos de material virgen, molido y paquetes de aditivos durante el proceso de extrusión.',
      steps: [
        {
          number: 1,
          title: 'Presionar "CAMBIO DE SILOS"',
          description: 'Abra el panel de dosificación de mezcla desde la consola principal.'
        },
        {
          number: 2,
          title: 'Seleccionar Silo Virgen y Silo Molido',
          description: 'Indique los kilos de material virgen y molido a suministrar en la tolva de la máquina.'
        },
        {
          number: 3,
          title: 'Confirmar y Guardar Consumo',
          description: 'Al dar clic en "PROCESAR MEZCLA", la configuración queda registrada en la orden y se refleja de inmediato en los reportes de producción.'
        }
      ]
    },
    {
      id: 'prensados',
      title: 'Prensados y Troqueles',
      badge: 'Módulo de Prensado',
      icon: '🏭',
      summary: 'Asignación de troquel en prensa, control de carreras de corte y registro de producción por pallet.',
      image: 'assets/images/manual/prensados_guide.jpg',
      steps: [
        {
          number: 1,
          title: 'Seleccionar Prensa Activa',
          description: 'Ingrese al módulo de Prensados y seleccione la prensa asignada a su turno.'
        },
        {
          number: 2,
          title: 'Asignar Troquel de Corte',
          description: 'Verifique que el troquel montado coincida con la clave del producto. De lo contrario, utilice la función "Cambiar Troquel".'
        },
        {
          number: 3,
          title: 'Cierre de Carrera y Pallet',
          description: 'Al completar la cuota de carreras, registre el lote para cerrar el pallet y generar la etiqueta de empaque.'
        }
      ]
    },
    {
      id: 'reportes',
      title: 'Reportes e Historial',
      badge: 'Consultas de Planta',
      icon: '📊',
      summary: 'Monitoreo de producción, desglose de bobinas fabricadas y reimpresión de folios QR por máquina y fecha.',
      steps: [
        {
          number: 1,
          title: 'Consultar por Fecha o Máquina',
          description: 'Al abrir el módulo de Reportes, se muestran automáticamente todas las órdenes de la fecha actual. Utilice el selector para filtrar por una máquina en específico.'
        },
        {
          number: 2,
          title: 'Desplegar "Ver Detalle de Silos y Bobinas"',
          description: 'Toque el botón desplegable en cualquier orden para ver la mezcla de silos utilizada y la lista completa de bobinas registradas.'
        },
        {
          number: 3,
          title: 'Reimpresión de QR',
          description: 'Haga clic en el botón "🖨️ QR" junto a cualquier bobina del reporte para reimprimir la etiqueta térmica en cualquier momento.'
        }
      ]
    }
  ];

  faqs = [
    {
      q: '¿Qué hago si la pantalla de extrusión no me deja iniciar el trabajo?',
      a: 'Verifique en la barra superior que tenga seleccionada tanto la Extrusora (icono de engrane ⚙️) como un Turno activo (icono de reloj 🕒). Una vez seleccionados, aparecerá el botón verde "▶ INICIAR TRABAJO EN EXTRUSORA".'
    },
    {
      q: '¿Cómo reimprimo un código QR si la bobina se registró previamente?',
      a: 'Puede reimprimirlo en cualquier momento desde la pestaña "Validado (QA)" en Extrusión o ingresando al módulo de "Reportes", desplegando el detalle de la orden y haciendo clic en el botón "🖨️ QR".'
    },
    {
      q: '¿Qué sucede si se interrumpe la conexión a internet en la planta?',
      a: 'La aplicación PWA Hi-Cone funciona con tecnología Offline-First. Sus registros de bobinas y pesaje se guardan instantáneamente en el dispositivo y se sincronizarán automáticamente con el servidor backend cuando se restablezca la red.'
    },
    {
      q: '¿Dónde consulto qué silos de material virgen o molido utilicé?',
      a: 'En el módulo de Reportes, al tocar el botón desplegable "📜 Ver Detalle de Silos y Bobinas" en la tarjeta de la orden, se mostrará el cuadro informativo con los silos y kilos consumidos.'
    }
  ];

  get activeSection(): ManualSection | undefined {
    return this.sections.find(s => s.id === this.activeSectionId) || this.sections[0];
  }

  selectSection(id: string) {
    this.activeSectionId = id;
  }

  toggleFaq(index: number) {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }

  onSearch() {
    if (!this.searchQuery.trim()) return;
    const q = this.searchQuery.toLowerCase();
    const found = this.sections.find(s => 
      s.title.toLowerCase().includes(q) || 
      s.summary.toLowerCase().includes(q) ||
      s.steps.some(st => st.title.toLowerCase().includes(q) || st.description.toLowerCase().includes(q))
    );
    if (found) {
      this.activeSectionId = found.id;
    }
  }

  clearSearch() {
    this.searchQuery = '';
  }

  openImageZoom(imgUrl: string) {
    this.zoomedImage = imgUrl;
  }

  closeImageZoom() {
    this.zoomedImage = null;
  }

  goBack() {
    this.location.back();
  }
}
