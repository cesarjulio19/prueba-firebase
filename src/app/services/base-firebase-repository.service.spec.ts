import { TestBed } from '@angular/core/testing';

import { BaseFirebaseRepositoryService } from './base-firebase-repository.service';

describe('BaseFirebaseRepositoryService', () => {
  let service: BaseFirebaseRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseFirebaseRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
