import { TestBed } from '@angular/core/testing';

import { OutilService } from './outil.service';

describe('OutilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutilService = TestBed.get(OutilService);
    expect(service).toBeTruthy();
  });
});
