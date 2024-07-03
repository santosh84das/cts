import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampDenominationDropdownComponent } from './stamp-denomination-dropdown.component';

describe('StampDenominationDropdownComponent', () => {
  let component: StampDenominationDropdownComponent;
  let fixture: ComponentFixture<StampDenominationDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampDenominationDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampDenominationDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
