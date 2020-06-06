// 1 - Importaciones
import { Trade } from '../models/trade.model'
import * as TradeActions from './trade.actions'

// 2 - Estado inicial
const initialState: Trade = {
    time: '',
    amount:'',
    price: '',
    side: '',
}

// 3 - Switch con las funciones puras
export function TradeReducer(state: Trade[] = [initialState], action: TradeActions.Actions) {
  switch (action.type) {
    case TradeActions.ADD_TRADE:
      return [...state, action.payload];
    default:
      return state;
  }
}