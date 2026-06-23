import { TestBed } from '@angular/core/testing';
import { ScannerService } from './scanner.service';

describe('ScannerService', () => {
  let service: ScannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScannerService]
    });
    service = TestBed.inject(ScannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a boolean for isSupported', () => {
    const supported = service.isSupported();
    expect(typeof supported).toBe('boolean');
  });
});
