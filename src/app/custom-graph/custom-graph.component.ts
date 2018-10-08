import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-custom-graph',
  templateUrl: './custom-graph.component.html',
  styleUrls: ['./custom-graph.component.css']
})
export class CustomGraphComponent implements OnInit {
  options:Object;
  view: any[] = [700, 400];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor() { }

  ngOnInit() {

    Highcharts.chart('container', {
    
    title: {
    text: 'Run Maintainence'
    },
    
    subtitle: {
    // text: 'FIDO CLUP'
    },
    
    yAxis: {
    title: {
    text: 'Number of bus'
    }
    },
    xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    // la
    title: {
    text: 'Monthly'
    }
    },
    
    legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
    },
    
    plotOptions: {
    series: {
    pointStart: 1
    }
    },
    
    series: [{
    name: 'Vehicles Arrived',
    data: [20, 25, 15, 30, 26, 35, 19,34,30,35,40]
    }, {
    name: 'Vehicles Delivered',
    data: [10,20,13,29,22,32,18,30,25,30,39]
    }]
    
    }); 
    
}

OpenDepDetail(){}
  }


