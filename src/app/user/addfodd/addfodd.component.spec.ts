import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfoddComponent } from './addfodd.component';

describe('AddfoddComponent', () => {
  let component: AddfoddComponent;
  let fixture: ComponentFixture<AddfoddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddfoddComponent]
    });
    fixture = TestBed.createComponent(AddfoddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
