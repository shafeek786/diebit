import { TestBed } from '@angular/core/testing';

import { SimpleWebRTCService } from './simple-web-rtc.service';

describe('SimpleWebRTCService', () => {
  let service: SimpleWebRTCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleWebRTCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
