import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { HttpClient } from '@angular/common/http';

import { WebsocketService } from "../ws-service/websocket.service";
import { WindowRef } from "../services/windowRef.service";
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import * as TradeChartActions from './../store/TradeChart.actions';

const STOCK_URL = (ticker) => ("wss://stream.binance.com:9443/ws/"+ticker.toLowerCase()+"@kline_1h");

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}


@Injectable()
export class TradeChartCandleService {
  public candles: Subject<Candle>;

  constructor(wsService: WebsocketService,
              private store: Store<AppState>,
              private windowRef: WindowRef,
              protected http: HttpClient) {
    this.store.select('stock').subscribe((stock)=>{
      this.getHistory(stock);
      this.openConnection(wsService, stock);
  })
  }

  getHistory(stock_trade: string) {
    this.http.get<Array<Array<string|number>>>("https://api.binance.com/api/v3/klines?symbol="+stock_trade+"&interval=1h")
    .subscribe(
      (data) => { // Success
        let candles = data.map((o,i) => { return({  time: o[0].toString(),
                                                    open: Number(o[1]),
                                                    high: Number(o[2]),
                                                    low: Number(o[3]),
                                                    close: Number(o[4]) });
        });
        this.store.dispatch( new TradeChartActions.SetTradeChart(candles) );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addTradeChart = (time:string , open:number, high:number, low:number, close:number) => {
    this.store.dispatch( new TradeChartActions.AddTradeChart({
      time: time,
      open: open,
      high: high,
      low: low,
      close: close
    })
  )};

  openConnection(wsService: WebsocketService, stock_trade: string) {
    this.candles = <Subject<Candle>>wsService.connect(STOCK_URL(stock_trade)).map(
      (response: MessageEvent): Candle => {
        let data = JSON.parse(response.data);

        return {
          time: data.k.t,
          open: Number(data.k.o),
          high: Number(data.k.h),
          low: Number(data.k.l),
          close: Number(data.k.c)
        };
      }
    );

    this.candles.subscribe(candle => {
      this.addTradeChart(candle.time, candle.open, candle.high, candle.low, candle.close);
    });
  }

  closeConnection() {
    this.candles.unsubscribe();
  }
}
