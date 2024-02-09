import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainervideocallComponent } from './trainervideocall.component';

describe('TrainervideocallComponent', () => {
  let component: TrainervideocallComponent;
  let fixture: ComponentFixture<TrainervideocallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainervideocallComponent]
    });
    fixture = TestBed.createComponent(TrainervideocallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
