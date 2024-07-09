import { TestBed } from '@angular/core/testing';

import { StampRequisitionService } from './stamp-requisition.service';

describe('StampRequisitionService', () => {
  let service: StampRequisitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StampRequisitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
