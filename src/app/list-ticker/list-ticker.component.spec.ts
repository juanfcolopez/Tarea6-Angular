import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTickerComponent } from './list-ticker.component';

describe('ListTickerComponent', () => {
  let component: ListTickerComponent;
  let fixture: ComponentFixture<ListTickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
