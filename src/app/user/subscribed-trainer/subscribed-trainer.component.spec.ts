import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedTrainerComponent } from './subscribed-trainer.component';

describe('SubscribedTrainerComponent', () => {
  let component: SubscribedTrainerComponent;
  let fixture: ComponentFixture<SubscribedTrainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribedTrainerComponent]
    });
    fixture = TestBed.createComponent(SubscribedTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
