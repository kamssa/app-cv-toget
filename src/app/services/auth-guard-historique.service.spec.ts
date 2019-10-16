import { TestBed } from '@angular/core/testing';

import { AuthGuardHistoriqueService } from './auth-guard-historique.service';

describe('AuthGuardHistoriqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardHistoriqueService = TestBed.get(AuthGuardHistoriqueService);
    expect(service).toBeTruthy();
  });
});
