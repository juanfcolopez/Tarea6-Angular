import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTradechartComponent } from './list-tradechart.component';

describe('ListTradechartComponent', () => {
  let component: ListTradechartComponent;
  let fixture: ComponentFixture<ListTradechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTradechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTradechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
