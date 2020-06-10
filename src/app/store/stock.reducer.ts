// 1 - Importaciones
import * as StockActions from './stock.actions';

// 2 - Estado inicial
const initialState: string = "BTCUSDT";

// 3 - Switch con las funciones puras
export function StockReducer(state: string = initialState, action: StockActions.Actions) {
  switch (action.type) {
    case StockActions.SET_STOCK: {
        return action.payload;
      }
    default:
      return state;
  }
}
