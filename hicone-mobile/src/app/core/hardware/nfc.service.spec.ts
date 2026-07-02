import { TestBed } from '@angular/core/testing';
import { NfcService } from './nfc.service';

describe('NfcService', () => {
  let service: NfcService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NfcService]
    });
    service = TestBed.inject(NfcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a boolean for isSupported', () => {
    const supported = service.isSupported();
    expect(typeof supported).toBe('boolean');
  });
});
