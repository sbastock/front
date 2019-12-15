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
            dataView: {show: false, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: false},
            saveAsImage: {show: false}
        }
    },
    legend: {
        data:['AliNana','Healthcare'],
         inactiveColor: '#777',
        textStyle: {
            color: '#fff'
        }
    },
    xAxis: [
        {
            type: 'category',
            data: ['2019/12/04','2019/12/05','2019/12/06','2019/12/07','2019/12/08','2019/12/09','2019/12/10','2019/12/11','2019/12/12','2019/12/13','2019/12/14','2019/12/15'],
            axisPointer: {
                type: 'shadow'
            },
            axisLine: { lineStyle: { color: '#8392A5' } }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'Price',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value} '
            },
            axisLine: { lineStyle: { color: '#8392A5' } }
        }
    ],
    series: [
        {
            name:'AliNana',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 10.7, 10.8, 10.2, 19.6, 20.0, 19, 3.3],
            color: '#dd6b66'    ,
            
        },
        {
            name:'Healthcare',
            type:'bar',
            data:[182, 203, 204.0, 170.4, 245.7, 199.7, 178.6, 202.2, 199.7, 180.8, 150.0, 100.3],
            color: '#759aa0',
        }
    ]



    }

  }

}
