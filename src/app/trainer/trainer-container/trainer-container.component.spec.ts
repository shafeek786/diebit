import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerContainerComponent } from './trainer-container.component';

describe('TrainerContainerComponent', () => {
  let component: TrainerContainerComponent;
  let fixture: ComponentFixture<TrainerContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerContainerComponent]
    });
    fixture = TestBed.createComponent(TrainerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
