import { TestBed } from '@angular/core/testing';

import { PhoneCodesService } from './phone-codes.service';

describe('PhoneCodesService', () => {
  let service: PhoneCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneCodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
