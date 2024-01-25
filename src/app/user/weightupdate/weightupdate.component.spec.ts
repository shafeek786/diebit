import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightupdateComponent } from './weightupdate.component';

describe('WeightupdateComponent', () => {
  let component: WeightupdateComponent;
  let fixture: ComponentFixture<WeightupdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeightupdateComponent]
    });
    fixture = TestBed.createComponent(WeightupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
