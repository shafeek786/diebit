import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedusersComponent } from './subscribedusers.component';

describe('SubscribedusersComponent', () => {
  let component: SubscribedusersComponent;
  let fixture: ComponentFixture<SubscribedusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribedusersComponent]
    });
    fixture = TestBed.createComponent(SubscribedusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
