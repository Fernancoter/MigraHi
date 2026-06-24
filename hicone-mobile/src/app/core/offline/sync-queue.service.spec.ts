import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { SyncQueueService, PendingOp } from './sync-queue.service';
import { OfflineStoreService } from './offline-store.service';

describe('SyncQueueService', () => {
  let service: SyncQueueService;
  let mockStore: any;
  let httpMock: HttpTestingController;
  let originalOnLine: boolean;

  beforeEach(() => {
    originalOnLine = navigator.onLine;
    mockStore = {
      getCalls: [] as string[],
      setCalls: [] as any[],
      removeCalls: [] as string[],
      getReturnValue: [] as any,
      // Mapa opcional por clave. Si una clave está aquí, gana sobre getReturnValue.
      // Necesario para tests que tocan dos claves a la vez (cola + bandeja de fallidos).
      data: null as Record<string, any> | null,

      get(key: string) {
        this.getCalls.push(key);
        if (this.data && key in this.data) {
          return Promise.resolve(this.data[key]);
        }
        return Promise.resolve(this.getReturnValue);
      },
      set(key: string, value: any) {
        this.setCalls.push({ key, value });
        if (this.data) {
          this.data[key] = value;
        }
        return Promise.resolve();
      },
      remove(key: string) {
        this.removeCalls.push(key);
        return Promise.resolve();
      }
    };

    TestBed.configureTestingModule({
      providers: [
        SyncQueueService,
        { provide: OfflineStoreService, useValue: mockStore },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(SyncQueueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    Object.defineProperty(navigator, 'onLine', {
      value: originalOnLine,
      configurable: true
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should enqueue operation and call set (when offline)', async () => {
    mockStore.getReturnValue = [];

    // Force network offline so enqueue doesn't trigger auto-flush
    Object.defineProperty(navigator, 'onLine', {
      value: false,
      configurable: true
    });

    const op: PendingOp = {
      id: '1',
      endpoint: '/api/v1/test',
      method: 'POST',
      body: { name: 'test' },
      createdAt: Date.now()
    };

    await service.enqueue(op);

    expect(mockStore.getCalls).toContain('sync_queue');
    expect(mockStore.setCalls.length).toBe(1);
    expect(mockStore.setCalls[0]).toEqual({ key: 'sync_queue', value: [op] });
  });

  it('should flush successfully completed requests and empty queue', async () => {
    const op: PendingOp = {
      id: '1',
      endpoint: '/api/v1/test',
      method: 'POST',
      body: { name: 'test' },
      createdAt: Date.now()
    };

    mockStore.getReturnValue = [op];

    // Mock network online
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      configurable: true
    });

    const flushPromise = service.flush();

    // Esperar a que la cola se recupere del almacén y realice la petición HTTP
    await new Promise(resolve => setTimeout(resolve, 10));

    const req = httpMock.expectOne('/api/v1/test');
    expect(req.request.method).toBe('POST');
    req.flush({ ok: true });

    const result = await flushPromise;

    expect(result.succeeded).toBe(1);
    expect(result.failed).toBe(0);
    expect(result.deadLettered).toBe(0);
    expect(mockStore.setCalls.length).toBe(1);
    expect(mockStore.setCalls[0]).toEqual({ key: 'sync_queue', value: [] });
  });

  it('should send the Idempotency-Key header equal to the op id', async () => {
    const op: PendingOp = {
      id: 'op-abc-123',
      endpoint: '/api/v1/test',
      method: 'POST',
      body: { name: 'test' },
      createdAt: Date.now()
    };

    mockStore.getReturnValue = [op];
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });

    const flushPromise = service.flush();
    await new Promise(resolve => setTimeout(resolve, 10));

    const req = httpMock.expectOne('/api/v1/test');
    expect(req.request.headers.get('Idempotency-Key')).toBe('op-abc-123');
    req.flush({ ok: true });

    await flushPromise;
  });

  it('should move a 4xx-rejected op to the dead-letter, not count it as succeeded', async () => {
    const op: PendingOp = {
      id: '1',
      endpoint: '/api/v1/test',
      method: 'POST',
      body: { name: 'test' },
      createdAt: Date.now()
    };

    // Mock consciente de claves: la cola tiene la op, la bandeja arranca vacía.
    mockStore.data = { sync_queue: [op], sync_dead_letter: [] };
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });

    const flushPromise = service.flush();
    await new Promise(resolve => setTimeout(resolve, 10));

    const req = httpMock.expectOne('/api/v1/test');
    req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });

    const result = await flushPromise;

    // No se cuenta como éxito; se contabiliza aparte y se conserva visible.
    expect(result.succeeded).toBe(0);
    expect(result.failed).toBe(0);
    expect(result.deadLettered).toBe(1);

    // La cola queda vacía y la op aparece en la bandeja de fallidos.
    expect(mockStore.data['sync_queue']).toEqual([]);
    expect(mockStore.data['sync_dead_letter']).toEqual([op]);
  });

  it('should keep a 5xx-failed op in the queue for retry', async () => {
    const op: PendingOp = {
      id: '1',
      endpoint: '/api/v1/test',
      method: 'POST',
      body: { name: 'test' },
      createdAt: Date.now()
    };

    mockStore.data = { sync_queue: [op], sync_dead_letter: [] };
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });

    const flushPromise = service.flush();
    await new Promise(resolve => setTimeout(resolve, 10));

    const req = httpMock.expectOne('/api/v1/test');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

    const result = await flushPromise;

    expect(result.succeeded).toBe(0);
    expect(result.failed).toBe(1);
    expect(result.deadLettered).toBe(0);

    // Se conserva en la cola; no entra a la bandeja de fallidos.
    expect(mockStore.data['sync_queue']).toEqual([op]);
    expect(mockStore.data['sync_dead_letter']).toEqual([]);
  });
});
