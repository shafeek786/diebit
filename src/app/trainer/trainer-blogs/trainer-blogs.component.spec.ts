import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerBlogsComponent } from './trainer-blogs.component';

describe('TrainerBlogsComponent', () => {
  let component: TrainerBlogsComponent;
  let fixture: ComponentFixture<TrainerBlogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerBlogsComponent]
    });
    fixture = TestBed.createComponent(TrainerBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
