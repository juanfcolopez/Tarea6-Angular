import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TradeChartReducer } from './store/tradecharts.reducer'
import { TradeReducer } from './store/trade.reducer'
import { TickerReducer } from './store/ticker.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTradechartComponent } from './list-tradechart/list-tradechart.component';
import { ListTradeComponent } from './list-trade/list-trade.component';
import { ListTickerComponent } from './list-ticker/list-ticker.component';

@NgModule({
  declarations: [
    AppComponent,
    ListTradechartComponent,
    ListTradeComponent,
    ListTickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({tradecharts: TradeChartReducer, trades: TradeReducer, tickers: TickerReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
