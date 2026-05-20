import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { VentasListComponent } from './ventas-list';
import { VentasService } from '../../../core/services/ventas';

describe('VentasListComponent', () => {
  let component: VentasListComponent;
  let fixture: ComponentFixture<VentasListComponent>;
  let mockVentasService: any;

  beforeEach(async () => {
    mockVentasService = {
      getVentas: () => of([])
    };

    await TestBed.configureTestingModule({
      imports: [VentasListComponent],
      providers: [
        { provide: VentasService, useValue: mockVentasService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VentasListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


