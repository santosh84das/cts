import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampLabelDropdownComponent } from './stamp-label-dropdown.component';

describe('StampLabelDropdownComponent', () => {
  let component: StampLabelDropdownComponent;
  let fixture: ComponentFixture<StampLabelDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampLabelDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampLabelDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
