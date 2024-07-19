import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampRequisitionApprovalComponent } from './stamp-requisition-approval.component';

describe('StampRequisitionApprovalComponent', () => {
  let component: StampRequisitionApprovalComponent;
  let fixture: ComponentFixture<StampRequisitionApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampRequisitionApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampRequisitionApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
