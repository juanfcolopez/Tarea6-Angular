import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ticker } from '../models/ticker.model';
import { AppState } from './../app.state';
import { WebsocketService } from '../ws-service/websocket.service';
import { TickerService } from '../services/ticker.service';

@Component({
  selector: 'app-list-ticker',
  templateUrl: './list-ticker.component.html',
  styleUrls: ['./list-ticker.component.css'],
  providers: [WebsocketService, TickerService]
})
export class ListTickerComponent implements OnInit {
  tickers: Observable<Ticker[]>;
  constructor(
    private store: Store<AppState>
  ) {
    this.tickers = this.store.select('tickers');
   }

  ngOnInit(){
  }

}
