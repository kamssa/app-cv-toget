import { TestBed } from '@angular/core/testing';

import { MessageAlerteService } from './message-alerte.service';

describe('MessageAlerteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageAlerteService = TestBed.get(MessageAlerteService);
    expect(service).toBeTruthy();
  });
});
