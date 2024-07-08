import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcsNeftComponent } from './ecs-neft.component';

describe('EcsNeftComponent', () => {
  let component: EcsNeftComponent;
  let fixture: ComponentFixture<EcsNeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcsNeftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcsNeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
