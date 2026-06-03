import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClientesListComponent } from './clientes-list';
import { ClientesService } from '../../../core/services/clientes';

describe('ClientesListComponent', () => {
  let component: ClientesListComponent;
  let fixture: ComponentFixture<ClientesListComponent>;
  let mockClientesService: any;

  beforeEach(async () => {
    mockClientesService = {
      getClientes: () => of([])
    };

    await TestBed.configureTestingModule({
      imports: [ClientesListComponent],
      providers: [
        { provide: ClientesService, useValue: mockClientesService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
