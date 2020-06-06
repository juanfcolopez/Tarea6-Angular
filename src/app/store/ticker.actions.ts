import { Action } from '@ngrx/store'
import { Ticker } from '../models/ticker.model'

// 2 - Definición del tipo de acción
export const ADD_TICKER = 'Add ticker'

// 3 - Creación de la clase tipo AddTask
export class AddTicker implements Action {
  readonly type = ADD_TICKER
  constructor(public payload: Ticker) { }
}

// 4 - Exportación de la acción
export type Actions = AddTicker