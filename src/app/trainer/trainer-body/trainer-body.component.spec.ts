import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerBodyComponent } from './trainer-body.component';

describe('TrainerBodyComponent', () => {
  let component: TrainerBodyComponent;
  let fixture: ComponentFixture<TrainerBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerBodyComponent]
    });
    fixture = TestBed.createComponent(TrainerBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
