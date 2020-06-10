import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { Ticker } from '../models/ticker.model';
import { WebsocketService } from "../ws-service/websocket.service";
import * as TickerActions from './../store/ticker.actions';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';


const TICKER_URL = (ticker) => ("wss://stream.binance.com:9443/ws/"+ticker.toLowerCase()+"@ticker");

@Injectable()
export class TickerService {
  public ticker: Subject<Ticker>;

  constructor(wsService: WebsocketService,  private store: Store<AppState>) {
    this.openConnection(wsService, "BTCUSDT");
  }

  addTicker(volume: number, variation: number, high: number, low: number, last: number) {
    this.store.dispatch( new TickerActions.AddTicker({
        volume: volume,
        variation: variation,
        high: high,
        low: low,
        last: last
    })
  )}

  openConnection (wsService: WebsocketService, stock_ticker: string) {
    this.ticker = <Subject<Ticker>>wsService.connect(TICKER_URL(stock_ticker)).map(
      (response: MessageEvent): Ticker => {
        let data = JSON.parse(response.data);
        return {
            volume: Math.round(data.v*100)/100,
            variation: Math.round((data.c - data.o)/data.o*10000)/100,
            high: Math.round(data.h*100)/100,
            low: Math.round(data.l*100)/100,
            last: Math.round(data.c*100)/100
        };
      }
    );

    this.ticker.subscribe(ticker => {
      this.addTicker(ticker.volume, ticker.variation, ticker.high, ticker.low, ticker.last);
    })
  }

  closeConnection () {
    this.ticker.unsubscribe();
  }



}
