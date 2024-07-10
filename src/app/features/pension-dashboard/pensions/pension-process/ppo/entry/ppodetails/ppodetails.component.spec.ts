import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpodetailsComponent } from './ppodetails.component';

describe('PpodetailsComponent', () => {
  let component: PpodetailsComponent;
  let fixture: ComponentFixture<PpodetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpodetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
