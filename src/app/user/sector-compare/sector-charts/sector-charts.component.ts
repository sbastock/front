import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sector-charts',
  templateUrl: './sector-charts.component.html',
  styleUrls: ['./sector-charts.component.css']
})
export class SectorChartsComponent implements OnInit {

  option: any;

  constructor() { }

  ngOnInit() {
    this.setOption();
  }

  setOption() {
    this.option = {

      backgroundColor: '#21202D',
    textStyle: {
            color: '#fff'
        },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:['蒸发量','降水量'],
         inactiveColor: '#777',
        textStyle: {
            color: '#fff'
        }
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            axisPointer: {
                type: 'shadow'
            },
            axisLine: { lineStyle: { color: '#8392A5' } }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '水量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value} ml'
            },
            axisLine: { lineStyle: { color: '#8392A5' } }
        }
    ],
    series: [
        {
            name:'CompanyA',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            color: '#dd6b66'    ,
            
        },
        {
            name:'SectorA',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            color: '#759aa0',
        }
    ]



    }

  }

}
