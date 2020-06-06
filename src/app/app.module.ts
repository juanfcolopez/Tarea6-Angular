import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TradeChartReducer } from './store/tradecharts.reducer'
import { TradeReducer } from './store/trade.reducer'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTradechartComponent } from './add-tradechart/add-tradechart.component';
import { ListTradechartComponent } from './list-tradechart/list-tradechart.component';
import { AddTradeComponent } from './add-trade/add-trade.component';
import { ListTradeComponent } from './list-trade/list-trade.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTradechartComponent,
    ListTradechartComponent,
    AddTradeComponent,
    ListTradeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({tradecharts: TradeChartReducer, trades: TradeReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
