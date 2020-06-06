import { TradeChart } from './models/trade-chart.model';
import { Trade } from './models/trade.model'; 

export interface AppState {
  readonly tradecharts: TradeChart[];
  readonly trades: Trade[];
}