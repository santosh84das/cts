import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDetailsDropdownComponent } from './vendor-details-dropdown.component';

describe('VendorDetailsDropdownComponent', () => {
  let component: VendorDetailsDropdownComponent;
  let fixture: ComponentFixture<VendorDetailsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorDetailsDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorDetailsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
