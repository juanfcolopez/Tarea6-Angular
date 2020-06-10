// 1 - Importaciones
import { TradeChart } from '../models/trade-chart.model'
import * as TradeChartActions from './TradeChart.actions'

// 2 - Estado inicial
const initialState: TradeChart = {
    time: "",
    open: 0,
    high: 0,
    low: 0,
    close: 0,
}

// 3 - Switch con las funciones puras
export function TradeChartReducer(state: TradeChart[] = [initialState], action: TradeChartActions.Actions) {
  switch (action.type) {
    case TradeChartActions.ADD_TRADECHART:
      if (state.length > 0 && state[state.length-1].time === action.payload.time){
        return [...state.slice(0, -1), action.payload];
      }  else {
        return [...state, action.payload];
      }
    case TradeChartActions.SET_TRADECHART:  {
      return action.payload;
    }
    default:
      return state;
  }
}
