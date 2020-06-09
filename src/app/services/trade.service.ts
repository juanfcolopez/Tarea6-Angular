import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { WebsocketService } from "../ws-service/websocket.service";
import * as TradeActions from './../store/trade.actions';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';


const market = "BTCUSDT"
const TRADE_URL = (trade) => ("wss://stream.binance.com:9443/ws/"+trade.toLowerCase()+"@aggTrade");
export interface Trade {
    time: string;
    amount: string;
    price: string;
    side: string;
}


@Injectable()
export class TradeService {
  public trades: Subject<Trade>;

  constructor(wsService: WebsocketService, private store: Store<AppState>) {
    
    this.openConnection(wsService, "BTCUSDT");
    
  }

  openConnection (wsService: WebsocketService, stock_trade: string) {
    this.trades = <Subject<Trade>>wsService.connect(TRADE_URL(stock_trade)).map(
      (response: MessageEvent): Trade => {
        let data = JSON.parse(response.data);
        return {
          time: this.timeConverter(data.E),
          amount: data.q,
          price: data.p,
          side: data.m ? "buy": "sell"
        };
      }
    );

    this.trades.subscribe(trade => {
      this.addTrade(trade.time, trade.amount, trade.price, trade.side);
    })

  }

  closeConnection () {
    this.trades.unsubscribe();
  }

  addTrade(time: string, amount: string, price: string, side: string) {
    this.store.dispatch( new TradeActions.AddTrade({
      time: time,
      amount: amount,
      price: price,
      side: side
    })
    )
  }

  
  strPad(n) {
    return String("00" + n).slice(-2);
  }
    // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  timeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp);
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = this.strPad(hour) + ':' + this.strPad(min) + ':' + this.strPad(sec) ;
    return time;
  }
}