import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTradechartComponent } from './add-tradechart.component';

describe('AddTradechartComponent', () => {
  let component: AddTradechartComponent;
  let fixture: ComponentFixture<AddTradechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTradechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTradechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
