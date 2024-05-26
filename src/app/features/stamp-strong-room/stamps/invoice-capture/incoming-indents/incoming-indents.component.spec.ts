import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingIndentsComponent } from './incoming-indents.component';

describe('IncomingIndentsComponent', () => {
  let component: IncomingIndentsComponent;
  let fixture: ComponentFixture<IncomingIndentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingIndentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomingIndentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
