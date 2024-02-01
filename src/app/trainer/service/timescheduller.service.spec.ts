import { TestBed } from '@angular/core/testing';

import { TimeschedullerService } from './timescheduller.service';

describe('TimeschedullerService', () => {
  let service: TimeschedullerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeschedullerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
