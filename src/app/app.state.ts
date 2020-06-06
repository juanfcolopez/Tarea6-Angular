import { TradeChart } from './models/trade-chart.model';
import { Trade } from './models/trade.model'; 
import { Ticker } from './models/ticker.model';

export interface AppState {
  readonly tradecharts: TradeChart[];
  readonly trades: Trade[];
  readonly tickers: Ticker[];
}