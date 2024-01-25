import { TestBed } from '@angular/core/testing';

import { SharedcaloriesService } from './sharedcalories.service';

describe('SharedcaloriesService', () => {
  let service: SharedcaloriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedcaloriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
