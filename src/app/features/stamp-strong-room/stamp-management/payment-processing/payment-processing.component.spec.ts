import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProcessingComponent } from './payment-processing.component';

describe('PaymentProcessingComponent', () => {
  let component: PaymentProcessingComponent;
  let fixture: ComponentFixture<PaymentProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentProcessingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
