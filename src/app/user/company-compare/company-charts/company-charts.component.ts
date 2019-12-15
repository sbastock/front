import { Component, OnInit, Input } from '@angular/core';
import { SeriesData } from 'src/app/models/SeriesData';

@Component({
  selector: 'app-company-charts',
  templateUrl: './company-charts.component.html',
  styleUrls: ['./company-charts.component.css']
})
export class CompanyChartsComponent implements OnInit {
  option: any;
  @Input() seriesdata: SeriesData;


  constructor() { }

  ngOnInit() {
    this.setOption(this.seriesdata);
  }



  setOption(data: SeriesData) {
    this.option = {
      title: {
          text: 'Compare Company Price Per Share'
      },
      tooltip: {
          trigger: 'axis'
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      toolbox: {
          feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.s_date
      },
      yAxis: {
          type: 'value',
          axisLabel: {
                  formatter: '${value}'
              }
      },
      series: data.s_data
  };

  }
}
