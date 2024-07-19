import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDynamicTableComponent } from './basic-dynamic-table.component';

describe('BasicDynamicTableComponent', () => {
  let component: BasicDynamicTableComponent;
  let fixture: ComponentFixture<BasicDynamicTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDynamicTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDynamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
