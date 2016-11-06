import {Component, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';

import {select} from 'd3-selection';
import {line, Line} from 'd3-shape';
import {scaleTime, scaleLinear} from 'd3-scale';
import {min, max} from 'd3-array';
import {axisBottom} from 'd3-axis';

class DatePoint {

  constructor(public date: Date, public value: Number) {
  }
}

@Component({
  selector: 'line-chart',
  template: '<svg:svg #chartContainer></svg:svg>',
  styleUrls: ['./line.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class LineChartComponent implements AfterViewInit {

  @ViewChild("chartContainer") chartContainer;

  constructor() {
  }

  ngAfterViewInit() {

    var data: Array<DatePoint> = [
      new DatePoint(new Date(2007, 3, 24), 93.24),
      new DatePoint(new Date(2007, 3, 25), 95.35),
      new DatePoint(new Date(2007, 3, 26), 98.84),
      new DatePoint(new Date(2007, 3, 27), 99.92),
      new DatePoint(new Date(2007, 3, 30), 99.80),
      new DatePoint(new Date(2007, 4, 1), 99.47)
    ];

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var x = scaleTime().rangeRound([0, width]);
    var y = scaleLinear().rangeRound([height, 0]);

    var minDate: Date = min(data, function (d: DatePoint) {
      return d.date;
    });

    var maxDate: Date = max(data, function (d: DatePoint) {
      return d.date;
    });

    var minValue = min(data, function (d: DatePoint) {
      return d.value;
    });

    var maxValue = max(data, function (d: DatePoint) {
      return d.value;
    });

    var l: Line<DatePoint> = line<DatePoint>()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        return y(d.value);
      });

    x.domain([minDate, maxDate]);
    y.domain([minValue, maxValue]);

    var el = this.chartContainer.nativeElement;
    var svg = select(el)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));

    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", l);
  }
}
