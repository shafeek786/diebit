import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometricsComponent } from './biometrics.component';

describe('BiometricsComponent', () => {
  let component: BiometricsComponent;
  let fixture: ComponentFixture<BiometricsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BiometricsComponent]
    });
    fixture = TestBed.createComponent(BiometricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
