import { TestBed } from '@angular/core/testing';

import { TrainerSharedService } from './trainer-shared.service';

describe('TrainerSharedService', () => {
  let service: TrainerSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainerSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
