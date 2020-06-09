/* import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import * as TickerActions from './../store/ticker.actions';
import { WebsocketService } from '../ws-service/websocket.service';
import { TickerService } from '../services/ticker.service';

@Component({
  selector: 'app-add-ticker',
  templateUrl: './add-ticker.component.html',
  styleUrls: ['./add-ticker.component.css'],
  providers: [WebsocketService, TickerService]
})
export class AddTickerComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private tickerservice: TickerService
  ){}

  ngOnInit() {
      
  }



  ngOnDestroy() {
    this.tickerservice.tickers.unsubscribe();
  }
}
 */