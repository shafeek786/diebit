import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiogComponent } from './biog.component';

describe('BiogComponent', () => {
  let component: BiogComponent;
  let fixture: ComponentFixture<BiogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BiogComponent]
    });
    fixture = TestBed.createComponent(BiogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
