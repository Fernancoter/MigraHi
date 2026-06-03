import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProduccionListComponent } from './produccion-list';
import { ProduccionService } from '../../../core/services/produccion';

describe('ProduccionListComponent', () => {
  let component: ProduccionListComponent;
  let fixture: ComponentFixture<ProduccionListComponent>;
  let mockProduccionService: any;

  beforeEach(async () => {
    mockProduccionService = {
      getExtrusiones: () => of([]),
      getPrensados: () => of([]),
      getCausasInterrupcion: () => of([])
    };

    await TestBed.configureTestingModule({
      imports: [ProduccionListComponent],
      providers: [
        { provide: ProduccionService, useValue: mockProduccionService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProduccionListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
