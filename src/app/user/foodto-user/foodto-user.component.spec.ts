import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodtoUserComponent } from './foodto-user.component';

describe('FoodtoUserComponent', () => {
  let component: FoodtoUserComponent;
  let fixture: ComponentFixture<FoodtoUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodtoUserComponent]
    });
    fixture = TestBed.createComponent(FoodtoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
