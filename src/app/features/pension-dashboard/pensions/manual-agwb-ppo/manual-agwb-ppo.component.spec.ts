import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAgwbPpoComponent } from './manual-agwb-ppo.component';

describe('ManualAgwbPpoComponent', () => {
  let component: ManualAgwbPpoComponent;
  let fixture: ComponentFixture<ManualAgwbPpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualAgwbPpoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualAgwbPpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
