import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDetailsWiseEC137Component } from './vendor-details-wise-ec137.component';

describe('VendorDetailsWiseEC137Component', () => {
  let component: VendorDetailsWiseEC137Component;
  let fixture: ComponentFixture<VendorDetailsWiseEC137Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorDetailsWiseEC137Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorDetailsWiseEC137Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
