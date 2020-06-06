import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TradeChart } from '../models/trade-chart.model';
import { AppState } from './../app.state';
import { createChart } from 'lightweight-charts';

@Component({
  selector: 'app-list-tradechart',
  templateUrl: './list-tradechart.component.html',
  styleUrls: ['./list-tradechart.component.css']
})

export class ListTradechartComponent implements OnInit {

  strPad(n) {
    return String("00" + n).slice(-2);
  }
  datetimeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const datetime = year + '-' + month + '-' + date;
    return datetime;
  }
 
  

  // Definimos el observable:
  tradecharts: Observable<TradeChart[]>;
  

  constructor(private store: Store<AppState>,
   
    ) { 
    // Acceedemos a la Store
    /* 
    this.tradecharts = this.store.select('tradecharts'); */
    
   
  }
  
  ngOnInit(){
    let el: HTMLElement = document.getElementById('TradeChart');
   
    let chart = createChart(el, { width: 600,
      height: 350,  
      priceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        borderVisible: false,
      },
      layout: {
        backgroundColor: '#131722',
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: {
          color: 'rgba(42, 46, 57, 0)',
        },
        horzLines: {
          color: 'rgba(42, 46, 57, 0.6)',
        },
      },
      timeScale: {
        timeVisible: true,
        visible: false,
      },
    });
    
    let lineSeries = chart.addCandlestickSeries();
    this.store.select(state => state).subscribe(data => {
      let info = data.tradecharts[data.tradecharts.length - 1]
      let time = new Date();
      let Candle = {
        time: this.datetimeConverter(time.getTime()),
        open: parseInt(info.open),
        close: parseInt(info.close),
        high: parseInt(info.high),
        low: parseInt(info.low)
      }
     
      lineSeries.update(Candle);
    });
  }

  ngAfterContentInit(){

  }

  ngDoCheck() {
    
  }
}
