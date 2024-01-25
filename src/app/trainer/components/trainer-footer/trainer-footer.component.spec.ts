import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerFooterComponent } from './trainer-footer.component';

describe('TrainerFooterComponent', () => {
  let component: TrainerFooterComponent;
  let fixture: ComponentFixture<TrainerFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerFooterComponent]
    });
    fixture = TestBed.createComponent(TrainerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
