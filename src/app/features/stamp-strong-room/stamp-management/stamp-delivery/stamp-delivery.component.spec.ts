import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampDeliveryComponent } from './stamp-delivery.component';

describe('StampDeliveryComponent', () => {
  let component: StampDeliveryComponent;
  let fixture: ComponentFixture<StampDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
