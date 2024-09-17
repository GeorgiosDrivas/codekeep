import { TestBed } from '@angular/core/testing';

import { SharedService } from './user-service.service';

describe('UserServiceService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
