import { Action } from '@ngrx/store'
import { TradeChart } from '../models/trade-chart.model'

export const ADD_TRADECHART = 'Add data to tradechart';
export const SET_TRADECHART = 'Set tradechart data';

export class AddTradeChart implements Action {
  readonly type = ADD_TRADECHART
  constructor(public payload: TradeChart) { }
};

export class SetTradeChart implements Action {
  readonly type = SET_TRADECHART
  constructor(public payload: TradeChart[]) { }
};


export type Actions = AddTradeChart | SetTradeChart
