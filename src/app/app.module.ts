import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TradeChartReducer } from './store/tradecharts.reducer'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTradechartComponent } from './add-tradechart/add-tradechart.component';
import { ListTradechartComponent } from './list-tradechart/list-tradechart.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTradechartComponent,
    ListTradechartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({tradecharts: TradeChartReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
