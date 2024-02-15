import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerWalletComponent } from './trainer-wallet.component';

describe('TrainerWalletComponent', () => {
  let component: TrainerWalletComponent;
  let fixture: ComponentFixture<TrainerWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerWalletComponent]
    });
    fixture = TestBed.createComponent(TrainerWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
