import { Action } from '@ngrx/store'
import { TradeChart } from './../trade-chart.model'

// 2 - Definición del tipo de acción
export const ADD_TRADECHART = 'Add tradechart'

// 3 - Creación de la clase tipo AddTask
export class AddTradeChart implements Action {
  readonly type = ADD_TRADECHART
  constructor(public payload: TradeChart) { }
}

// 4 - Exportación de la acción
export type Actions = AddTradeChart