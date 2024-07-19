import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tr7FormComponent } from './tr7-form.component';

describe('Tr7FormComponent', () => {
  let component: Tr7FormComponent;
  let fixture: ComponentFixture<Tr7FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tr7FormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tr7FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
