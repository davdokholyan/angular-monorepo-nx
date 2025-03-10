import { TestBed } from '@angular/core/testing';

import { RegistrationManagementService } from './registration-management.service';

describe('RegistrationManagementService', () => {
  let service: RegistrationManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
