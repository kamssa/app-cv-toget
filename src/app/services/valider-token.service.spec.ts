import { TestBed } from '@angular/core/testing';

import { ValiderTokenService } from './valider-token.service';

describe('ValiderTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValiderTokenService = TestBed.get(ValiderTokenService);
    expect(service).toBeTruthy();
  });
});
