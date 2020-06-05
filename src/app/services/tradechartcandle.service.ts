import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { WebsocketService } from "../ws-service/websocket.service";

const market = "BTCUSDT"
const STOCK_URL = "wss://stream.binance.com:9443/ws/"+market.toLowerCase()+"@kline_1h";

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

  constructor(wsService: WebsocketService) {
    this.candles = <Subject<Candle>>wsService.connect(STOCK_URL).map(
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
  }
}