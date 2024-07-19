import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdsDetailsComponent } from './tds-details.component';

describe('TdsDetailsComponent', () => {
  let component: TdsDetailsComponent;
  let fixture: ComponentFixture<TdsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TdsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
