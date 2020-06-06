import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { WebsocketService } from "../ws-service/websocket.service";


const market = "BTCUSDT"
const TICKER_URL = "wss://stream.binance.com:9443/ws/"+market.toLowerCase()+"@ticker"
export interface Ticker {
    volume: number;
    variation: number;
    high: number;
    low: number;
    last: number;
}


@Injectable()
export class TickerService {
  public tickers: Subject<Ticker>;

  constructor(wsService: WebsocketService) {
    this.tickers = <Subject<Ticker>>wsService.connect(TICKER_URL).map(
      (response: MessageEvent): Ticker => {
        let data = JSON.parse(response.data);
        console.log(data);
        return {
            volume: Math.round(data.v*100)/100,
            variation: Math.round((data.c - data.o)/data.o*10000)/100,
            high: Math.round(data.h*100)/100,
            low: Math.round(data.l*100)/100,
            last: Math.round(data.c*100)/100
        };
      }
    );
  }
 
}