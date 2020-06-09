import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Trade } from '../models/trade.model';
import { AppState } from './../app.state';
import { createChart } from 'lightweight-charts';
import { WebsocketService } from '../ws-service/websocket.service';
import { TradeService } from '../services/trade.service';

@Component({
  selector: 'app-list-trade',
  templateUrl: './list-trade.component.html',
  styleUrls: ['./list-trade.component.css'],
  providers: [WebsocketService, TradeService]
})
export class ListTradeComponent implements OnInit {

  trades: Observable<Trade[]>;
  constructor(
    private store: Store<AppState>
  ) { 
    // Accedemos a la store:
    this.trades = this.store.select('trades');
  }

  ngOnInit() {


  }

}
