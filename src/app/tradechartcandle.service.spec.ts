import { TestBed } from '@angular/core/testing';

import { TradechartcandleService } from './tradechartcandle.service';

describe('TradechartcandleService', () => {
  let service: TradechartcandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradechartcandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
