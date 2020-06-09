import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { WebsocketService } from "../ws-service/websocket.service";
import { WindowRef } from "../services/windowRef.service";
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import * as TradeChartActions from './../store/TradeChart.actions';

const STOCK_URL = (ticker) => ("wss://stream.binance.com:9443/ws/"+ticker.toLowerCase()+"@kline_1h");

export interface Candle {
  time: string;
  open: string;
  high: string;
  low: string;
  close: string;
}


@Injectable()
export class TradeChartCandleService {
  public candles: Subject<Candle>;

  constructor(wsService: WebsocketService, private store: Store<AppState>, private windowRef: WindowRef) {
    this.openConnection(wsService, "BTCUSDT");
  }

  addTradeChart = (time:string , open: string, high:string, low:string, close:string) => {
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
          open: data.k.o,
          high: data.k.h,
          low: data.k.l,
          close: data.k.c
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
