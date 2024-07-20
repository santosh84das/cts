import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PentionDetailComponent } from './pention-detail.component';

describe('PentionDetailComponent', () => {
  let component: PentionDetailComponent;
  let fixture: ComponentFixture<PentionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PentionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PentionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
