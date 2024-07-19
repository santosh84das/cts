import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableSkeletonComponent } from './datatable-skeleton.component';

describe('DatatableSkeletonComponent', () => {
  let component: DatatableSkeletonComponent;
  let fixture: ComponentFixture<DatatableSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatatableSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatableSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
