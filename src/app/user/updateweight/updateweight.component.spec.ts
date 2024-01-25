import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateweightComponent } from './updateweight.component';

describe('UpdateweightComponent', () => {
  let component: UpdateweightComponent;
  let fixture: ComponentFixture<UpdateweightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateweightComponent]
    });
    fixture = TestBed.createComponent(UpdateweightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
