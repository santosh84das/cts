import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampRequisitionComponent } from './stamp-requisition.component';

describe('StampRequisitionComponent', () => {
  let component: StampRequisitionComponent;
  let fixture: ComponentFixture<StampRequisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampRequisitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
