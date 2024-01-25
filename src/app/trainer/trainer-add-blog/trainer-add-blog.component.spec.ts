import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerAddBlogComponent } from './trainer-add-blog.component';


describe('TrainerAddBlogComponent', () => {
  let component: TrainerAddBlogComponent;
  let fixture: ComponentFixture<TrainerAddBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerAddBlogComponent]
    });
    fixture = TestBed.createComponent(TrainerAddBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
