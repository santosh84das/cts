import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampRequisitionStagingComponent } from './stamp-requisition-staging.component';

describe('StampRequisitionStagingComponent', () => {
  let component: StampRequisitionStagingComponent;
  let fixture: ComponentFixture<StampRequisitionStagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampRequisitionStagingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampRequisitionStagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
