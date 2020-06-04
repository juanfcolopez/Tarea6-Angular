import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TradeChart } from './../trade-chart.model';
import { AppState } from './../app.state';

@Component({
  selector: 'app-list-tradechart',
  templateUrl: './list-tradechart.component.html',
  styleUrls: ['./list-tradechart.component.css']
})
export class ListTradechartComponent implements OnInit {

  // Definimos el observable:
  tradecharts: Observable<TradeChart[]>;

  constructor(private store: Store<AppState>) { 
    // Acceedemos a la Store
    this.tradecharts = this.store.select('tradecharts');
  }

  ngOnInit(): void {
  }

}
