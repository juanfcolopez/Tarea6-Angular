import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import * as  StockActions  from './../store/stock.actions';



@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements OnInit {
  constructor(private store: Store<AppState>){}


  stocks = [
    {
      id: "BTCUSDT",
      base: "BTC",
      quote: "USDT",
    },
    {
      id: "ETHUSDT",
      base: "ETH",
      quote: "USDT",
    },
    {
      id: "BNBUSDT",
      base: "BNB",
      quote: "USDT",
    },
    {
      id: "ADAUSDT",
      base: "ADA",
      quote: "USDT",
    },
    {
      id: "BUSDUSDT",
      base: "BUSD",
      quote: "USDT",
    },
    {
      id: "XRPUSDT",
      base: "XRP",
      quote: "USDT",
    },
    {
      id: "BCHUSDT",
      base: "BCH",
      quote: "USDT",
    },
    {
      id: "ETCUSDT",
      base: "ETC",
      quote: "USDT",
    },
    {
      id: "EOSUSDT",
      base: "EOS",
      quote: "USDT",
    },
   {
      id: "LTCUSDT",
      base: "XRP",
      quote: "USDT",
    },
     {
      id: "DASHUSDT",
      base: "DASH",
      quote: "USDT",
    },
     {
      id: "XMRUSDT",
      base: "XMR",
      quote: "USDT",
    }
  ];

  selectedStock: string;

  ngOnInit(){
    this.selectedStock = '';
  }

  stockClicked(symbol:string) {
    this.selectedStock = symbol;
    this.store.dispatch( new StockActions.SetStock(symbol) );
  }

}
