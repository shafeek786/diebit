import { TestBed } from '@angular/core/testing';

import { SharedCaloriesService } from './shared-calories.service';

describe('SharedCaloriesService', () => {
  let service: SharedCaloriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCaloriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
