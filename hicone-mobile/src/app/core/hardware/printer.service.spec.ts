import { TestBed } from '@angular/core/testing';
import { PrinterService } from './printer.service';

describe('PrinterService', () => {
  let service: PrinterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrinterService]
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
});
