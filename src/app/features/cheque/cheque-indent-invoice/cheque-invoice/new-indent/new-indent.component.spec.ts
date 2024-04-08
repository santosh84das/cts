import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIndentComponent } from './new-indent.component';

describe('NewIndentComponent', () => {
  let component: NewIndentComponent;
  let fixture: ComponentFixture<NewIndentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewIndentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
