import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorChartsComponent } from './sector-charts.component';

describe('SectorChartsComponent', () => {
  let component: SectorChartsComponent;
  let fixture: ComponentFixture<SectorChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
