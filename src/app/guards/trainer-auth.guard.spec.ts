import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { trainerAuthGuard } from './trainer-auth.guard';

describe('trainerAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => trainerAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
