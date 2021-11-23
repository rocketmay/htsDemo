import { TestBed } from '@angular/core/testing';

import { TokenCreateServiceService } from './token-create-service.service';

describe('TokenCreateServiceService', () => {
  let service: TokenCreateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenCreateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
