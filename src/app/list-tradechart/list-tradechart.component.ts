import { Component, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TradeChart } from '../models/trade-chart.model';
import { AppState } from './../app.state';
import { createChart, MouseEventParams, CrosshairOptions, UTCTimestamp } from 'lightweight-charts';
import { WebsocketService } from '../ws-service/websocket.service';
import { TradeChartCandleService } from '../services/tradechartcandle.service';
import { WindowRef } from '../services/windowRef.service';

@Component({
  selector: 'app-list-tradechart',
  templateUrl: './list-tradechart.component.html',
  styleUrls: ['./list-tradechart.component.css'],
  providers: [WebsocketService, WindowRef, TradeChartCandleService]
})

export class ListTradechartComponent implements AfterContentInit {
  constructor(private store: Store<AppState>, private service: TradeChartCandleService) {
  }

  ngAfterContentInit(){
    let chart = createChart(document.getElementById("TradeChart"),
    { width: 600,
      height: 350,
      localization: {
        locale: 'es-CL',
      },
      priceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        borderVisible: true,
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

    chart.timeScale().applyOptions({
      fixLeftEdge: true,
      timeVisible: true,
      visible: false
    });

    chart.timeScale().applyOptions({ fixLeftEdge: true, });

    window.addEventListener('resize', (event) => {
      chart.resize(document.getElementById("TradeChart").clientWidth, 350);
    });

    chart.resize(document.getElementById("TradeChart").clientWidth, 350);

    this.store.select('tradecharts').subscribe(data => {
      if (data[0].time !== "") {
        let data_candles = data;
        let candles = data_candles.map((candle) => ({
          time: Number(candle.time) as UTCTimestamp,
          open: candle.open,
          close: candle.close,
          high: candle.high,
          low: candle.low
        }));
        lineSeries.setData(candles);
        chart.timeScale().applyOptions({
          fixLeftEdge: true,
          timeVisible: true,
          visible: false,
        });
      }
    });
  }

  strPad(n) {
    return String("00" + n).slice(-2);
  }

  datetimeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp);
    return a;
  }
}






















