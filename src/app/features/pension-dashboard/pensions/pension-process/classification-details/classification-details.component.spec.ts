import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationDetailsComponent } from './classification-details.component';

describe('ClassificationDetailsComponent', () => {
  let component: ClassificationDetailsComponent;
  let fixture: ComponentFixture<ClassificationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassificationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
