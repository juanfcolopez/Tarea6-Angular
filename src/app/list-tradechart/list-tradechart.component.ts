import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TradeChart } from '../models/trade-chart.model';
import { AppState } from './../app.state';
import { createChart, MouseEventParams, CrosshairOptions } from 'lightweight-charts';
import { WebsocketService } from '../ws-service/websocket.service';
import { TradeChartCandleService } from '../services/tradechartcandle.service';
import { WindowRef } from '../services/windowRef.service';

@Component({
  selector: 'app-list-tradechart',
  templateUrl: './list-tradechart.component.html',
  styleUrls: ['./list-tradechart.component.css'],
  providers: [WebsocketService, WindowRef, TradeChartCandleService]
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
  }
  
  ngOnInit(){
    let chart = createChart(document.getElementById("TradeChart"),
      { width: 600,
        height: 350,
        localization: {
          locale: 'es-CL',
          timeFormatter: function(timestamp) {
            const a = new Date(timestamp*1000);
            const hour = a.getHours();
            const min = a.getMinutes();
            const sec = a.getSeconds();
            const time = String("00" + hour).slice(-2) + ':' + String("00" + min).slice(-2) + ':' + String("00" + sec).slice(-2) ;
            return time;
          },
        },
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

    chart.timeScale().applyOptions({ fixLeftEdge: true,
    });

    window.addEventListener('resize', (event) => {
      chart.resize(document.getElementById("TradeChart").clientWidth, 350);
    });

    chart.resize(document.getElementById("TradeChart").clientWidth, 350);

    const toolTipWidth = 120;
    const toolTipHeight = 100;
    const toolTipMargin = 15;
    const width = 600;
    const height = 300;

    let tooltip = document.getElementById("TradeChartTooltip");
    // update tooltip
    chart.subscribeCrosshairMove((param: MouseEventParams) => {
    	if (!param.time || param.point.x < 0 || param.point.x > width || param.point.y < 0 || param.point.y > height) {
    		tooltip.style.display = 'none';
    		return;
    	}

    	const dateStr = param.time.toLocaleString;

    	tooltip.style.display = 'block';
    	const candle = param.seriesPrices.get(lineSeries);

    	tooltip.innerHTML = '<div style="font-size: 8px; margin: 4px 0px"> o: '+candle.toString+' - h: '+candle.toString+' - l: '+candle.toString+' - c: '+candle.toString+'</div>' +
    		'<div>' + dateStr + '</div>';

    	const y = param.point.y;

    	let left = param.point.x + toolTipMargin;
    	if (left > width - toolTipWidth) {
    		left = param.point.x - toolTipMargin - toolTipWidth;
    	}

    	let top = y + toolTipMargin;
    	if (top > height - toolTipHeight) {
    		top = y - toolTipHeight - toolTipMargin;
    	}

    	tooltip.style.left = left + 'px';
    	tooltip.style.top = top + 'px';
    });

    this.store.select(state => state).subscribe(data => {
      let info = data.tradecharts[data.tradecharts.length - 1]
      let time = new Date();
      let candle = {
        time: this.datetimeConverter(time.getTime()),
        open: parseInt(info.open),
        close: parseInt(info.close),
        high: parseInt(info.high),
        low: parseInt(info.low)
      }
     
      lineSeries.update(candle);
    });
  }

  ngAfterContentInit(){

  }

  ngDoCheck() {
    
  }
}
