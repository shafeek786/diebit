import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrainersComponent } from './admin-trainers.component';

describe('AdminTrainersComponent', () => {
  let component: AdminTrainersComponent;
  let fixture: ComponentFixture<AdminTrainersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTrainersComponent]
    });
    fixture = TestBed.createComponent(AdminTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
