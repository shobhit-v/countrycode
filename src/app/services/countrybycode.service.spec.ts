import { TestBed } from '@angular/core/testing';

import { CountrybycodeService } from './countrybycode.service';

describe('CountrybycodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountrybycodeService = TestBed.get(CountrybycodeService);
    expect(service).toBeTruthy();
  });
});
