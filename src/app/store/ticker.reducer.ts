// 1 - Importaciones
import { Ticker } from '../models/ticker.model'
import * as TickerActions from './ticker.actions'

// 2 - Estado inicial
const initialState: Ticker = {
    volume: 0,
    variation:0,
    high: 0,
    low: 0,
    last: 0
}

// 3 - Switch con las funciones puras
export function TickerReducer(state: Ticker[] = [initialState], action: TickerActions.Actions) {
  switch (action.type) {
    case TickerActions.ADD_TICKER: {
        return action.payload;
      }
    default:
      return state;
  }
}
