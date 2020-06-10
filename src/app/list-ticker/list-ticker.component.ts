import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ticker } from '../models/ticker.model';
import { AppState } from './../app.state';
import { WebsocketService } from '../ws-service/websocket.service';
import { TickerService } from '../services/ticker.service';
import * as TickerActions from './../store/ticker.actions';


const TICKER_URL = (ticker:string) => ("wss://stream.binance.com:9443/ws/"+ticker.toLowerCase()+"@ticker");

@Component({
  selector: 'app-list-ticker',
  templateUrl: './list-ticker.component.html',
  styleUrls: ['./list-ticker.component.css'],
  providers: [WebsocketService, TickerService]
})
export class ListTickerComponent implements OnInit {
  ticker: Observable<Ticker>;
  wsService: WebsocketService;
  tickerservice: Subject<Ticker>;

  constructor(
    private store: Store<AppState>,
    private service: TickerService
  ) {
    this.ticker = this.store.select("tickers");
  
  
   }
    ngOnInit(){
   }
  }




   