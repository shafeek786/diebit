import { TestBed } from '@angular/core/testing';

import { UserTrainerService } from './user-trainer.service';

describe('UserTrainerService', () => {
  let service: UserTrainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTrainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
