import { TestBed } from '@angular/core/testing';

import { HederaSDKService } from './hedera-sdk.service';

describe('HederaSDKService', () => {
  let service: HederaSDKService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HederaSDKService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
