/*
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import * as TradeActions from './../store/trade.actions';
import { WebsocketService } from '../ws-service/websocket.service';
import { TradeService } from '../services/trade.service';


@Component({
  selector: 'app-add-trade',
  templateUrl: './add-trade.component.html',
  styleUrls: ['./add-trade.component.css'],
  providers: [WebsocketService, TradeService]
})
export class AddTradeComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private tradeservice: TradeService
  ) {}

  ngOnInit() {
  
  }
  // Disparamos la accion


  ngOnDestroy() {
    this.tradeservice.trades.unsubscribe();
   }

}
*/
