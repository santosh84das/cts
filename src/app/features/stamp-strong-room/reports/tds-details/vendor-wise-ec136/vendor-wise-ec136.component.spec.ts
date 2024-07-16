import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorWiseEC136Component } from './vendor-wise-ec136.component';

describe('VendorWiseEC136Component', () => {
  let component: VendorWiseEC136Component;
  let fixture: ComponentFixture<VendorWiseEC136Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorWiseEC136Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorWiseEC136Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
