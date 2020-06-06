import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import * as TradeChartActions from './../store/TradeChart.actions';
import { WebsocketService } from '../ws-service/websocket.service';
import { TradeChartCandleService } from '../services/tradechartcandle.service';

@Component({
  selector: 'app-add-tradechart',
  templateUrl: './add-tradechart.component.html',
  styleUrls: ['./add-tradechart.component.css'],
  providers: [WebsocketService, TradeChartCandleService]
})
export class AddTradechartComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private tradechartcandleservice: TradeChartCandleService
  ) {}

  ngOnInit() {
    this.tradechartcandleservice.candles.subscribe(candle => {
      this.addTradeChart(candle.time, candle.open, candle.high, candle.low, candle.close);
    })
 
  
  }
  // Disparamos la accion
  addTradeChart(time, open, high, low, close) {
    this.store.dispatch( new TradeChartActions.AddTradeChart({
      time: time,
      open: open,
      high: high,
      low: low,
      close: close
    })
    )
  }

  ngOnDestroy() {
    this.tradechartcandleservice.candles.unsubscribe();
   }
}
