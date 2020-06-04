// 1 - Importaciones
import { TradeChart } from './../trade-chart.model'
import * as TradeChartActions from './TradeChart.actions'

// 2 - Estado inicial
const initialState: TradeChart = {
    time: '',
    open: '',
    high: '',
    low: '',
    close: '',
}

// 3 - Switch con las funciones puras
export function TradeChartReducer(state: TradeChart[] = [initialState], action: TradeChartActions.Actions) {
  switch (action.type) {
    case TradeChartActions.ADD_TRADECHART:
      return [...state, action.payload];
    default:
      return state;
  }
}