import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { WebsocketService } from "../ws-service/websocket.service";


const market = "BTCUSDT"
const TRADE_URL = "wss://stream.binance.com:9443/ws/"+market.toLowerCase()+"@aggTrade"
export interface Trade {
    time: string;
    amount: string;
    price: string;
    side: string;
}


@Injectable()
export class TradeService {
  public trades: Subject<Trade>;

  constructor(wsService: WebsocketService) {
    this.trades = <Subject<Trade>>wsService.connect(TRADE_URL).map(
      (response: MessageEvent): Trade => {
        let data = JSON.parse(response.data);
        console.log(data);
        return {
          time: this.timeConverter(data.E),
          amount: data.q,
          price: data.p,
          side: data.m ? "buy": "sell"
        };
      }
    );
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