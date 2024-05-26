import { TestBed } from '@angular/core/testing';

import { InvoiceCaptureService } from './invoice-capture.service';

describe('InvoiceCaptureService', () => {
  let service: InvoiceCaptureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceCaptureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
