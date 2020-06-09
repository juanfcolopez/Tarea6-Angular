/* import { Component, OnInit, OnDestroy } from '@angular/core';


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
    
    private tradechartcandleservice: TradeChartCandleService
  ) {}

  ngOnInit() {
    this.tradechartcandleservice.candles.subscribe(candle => {
      this.addTradeChart(candle.time, candle.open, candle.high, candle.low, candle.close);
    })
 
  
  }
  // Disparamos la accion
 

  ngOnDestroy() {
    
   }
}
 */