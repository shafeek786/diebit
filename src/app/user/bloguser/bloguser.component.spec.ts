import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloguserComponent } from './bloguser.component';

describe('BloguserComponent', () => {
  let component: BloguserComponent;
  let fixture: ComponentFixture<BloguserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloguserComponent]
    });
    fixture = TestBed.createComponent(BloguserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
