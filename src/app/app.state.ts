import { TradeChart } from './models/trade-chart.model';

export interface AppState {
  readonly tradecharts: TradeChart[];
}