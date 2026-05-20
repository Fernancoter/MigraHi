import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ArticulosListComponent } from './articulos-list';
import { InventarioService } from '../../../core/services/inventario';

describe('ArticulosListComponent', () => {
  let component: ArticulosListComponent;
  let fixture: ComponentFixture<ArticulosListComponent>;
  let mockInventarioService: any;

  beforeEach(async () => {
    mockInventarioService = {
      getArticulos: () => of([])
    };

    await TestBed.configureTestingModule({
      imports: [ArticulosListComponent],
      providers: [
        { provide: InventarioService, useValue: mockInventarioService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticulosListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


