import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStampRequisitionComponent } from './new-stamp-requisition.component';

describe('NewStampRequisitionComponent', () => {
  let component: NewStampRequisitionComponent;
  let fixture: ComponentFixture<NewStampRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStampRequisitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStampRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
