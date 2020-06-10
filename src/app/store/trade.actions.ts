import { Action } from '@ngrx/store'
import { Trade } from '../models/trade.model'

export const ADD_TRADE = 'Add trade'

export class AddTrade implements Action {
  readonly type = ADD_TRADE
  constructor(public payload: Trade) { }
}


export type Actions = AddTrade
