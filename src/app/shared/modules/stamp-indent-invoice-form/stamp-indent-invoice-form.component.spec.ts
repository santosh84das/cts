import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampIndentInvoiceFormComponent } from './stamp-indent-invoice-form.component';

describe('StampIndentInvoiceFormComponent', () => {
  let component: StampIndentInvoiceFormComponent;
  let fixture: ComponentFixture<StampIndentInvoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StampIndentInvoiceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampIndentInvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
