import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { trainerLoginGuard } from './trainer-login.guard';

describe('trainerLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => trainerLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
