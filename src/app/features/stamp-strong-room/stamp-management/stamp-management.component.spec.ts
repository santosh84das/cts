import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampManagementComponent } from './stamp-management.component';

describe('StampManagementComponent', () => {
  let component: StampManagementComponent;
  let fixture: ComponentFixture<StampManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
