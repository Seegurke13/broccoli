import { TestBed } from '@angular/core/testing';

import { PluginRepositoryService } from './plugin-repository.service';

describe('PluginRepositoryService', () => {
  let service: PluginRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluginRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
