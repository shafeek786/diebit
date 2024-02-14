import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerEditBlogComponent } from './trainer-edit-blog.component';

describe('TrainerEditBlogComponent', () => {
  let component: TrainerEditBlogComponent;
  let fixture: ComponentFixture<TrainerEditBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerEditBlogComponent]
    });
    fixture = TestBed.createComponent(TrainerEditBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
