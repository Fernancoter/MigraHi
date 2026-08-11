import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PrinterService } from './printer.service';
import { ApiConfigService } from '../services/api-config.service';

describe('PrinterService', () => {
  let service: PrinterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PrinterService,
        ApiConfigService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PrinterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a boolean for isSupported', () => {
    const supported = service.isSupported();
    expect(typeof supported).toBe('boolean');
  });

  it('should generate valid ZPL code with label parameters', () => {
    const zpl = service.generateZpl({
      type: 'bobina',
      code: 'BOB-2026-001',
      name: 'Bobina Virgen 6"',
      kg: 35.5,
      espesor: 1.25,
      operario: 'Juan Perez',
      turno: '1'
    });
    expect(zpl).toContain('^XA');
    expect(zpl).toContain('BOB-2026-001');
    expect(zpl).toContain('HICONE - PLANTA INDUSTRIAL');
    expect(zpl).toContain('^XZ');
  });
});
