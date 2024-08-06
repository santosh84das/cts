import { TestBed } from '@angular/core/testing';

import { SearchPopupService } from './search-popup.service';

describe('SearchPopupService', () => {
  let service: SearchPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
