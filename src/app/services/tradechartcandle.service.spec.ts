import { TestBed } from '@angular/core/testing';

import { TradeChartCandleService } from './tradechartcandle.service';

describe('TradechartcandleService', () => {
  let service: TradeChartCandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeChartCandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
