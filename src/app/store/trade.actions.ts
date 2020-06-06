import { Action } from '@ngrx/store'
import { Trade } from '../models/trade.model'

// 2 - Definición del tipo de acción
export const ADD_TRADE = 'Add trade'

// 3 - Creación de la clase tipo AddTask
export class AddTrade implements Action {
  readonly type = ADD_TRADE
  constructor(public payload: Trade) { }
}

// 4 - Exportación de la acción
export type Actions = AddTrade