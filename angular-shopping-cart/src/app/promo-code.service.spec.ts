import { TestBed } from '@angular/core/testing';

import { PromoCodeService } from './promo-code.service';

describe('PromoCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromoCodeService = TestBed.get(PromoCodeService);
    expect(service).toBeTruthy();
  });
});
