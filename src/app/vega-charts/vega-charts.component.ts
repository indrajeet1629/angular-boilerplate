import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import embed, { Mode, VisualizationSpec } from 'vega-embed';
import ScatterPlot from './dummyResponse';

@Component({
  selector: 'app-vega-charts',
  templateUrl: './vega-charts.component.html',
  styleUrls: ['./vega-charts.component.css'],
})
export class VegaChartsComponent implements AfterViewInit {
  constructor() {}

  data1: any = {
    width: 700,
    data: {
      values: [
        { category: 'A', group: 'x', value: 0.1 },
        { category: 'A', group: 'y', value: 0.6 },
        { category: 'A', group: 'z', value: 0.9 },
        { category: 'B', group: 'x', value: 0.7 },
        { category: 'B', group: 'y', value: 0.2 },
        { category: 'B', group: 'z', value: 1.1 },
        { category: 'C', group: 'x', value: 0.6 },
        { category: 'C', group: 'y', value: 0.1 },
        { category: 'C', group: 'z', value: 0.2 },
      ],
    },
    selection: {
      brush: {
        type: 'interval',
        zoom: 'wheel![event.shiftKey]',
      },
    },
    mark: { type: 'bar', tooltip: true },
    encoding: {
      x: { field: 'category' },
      y: { field: 'value', type: 'quantitative' },
      xOffset: { field: 'group' },
      color: { field: 'group' },
    },
  };

  data2: any = {
    width: 700,
    $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
    data: {
      values: ScatterPlot,
      format: {
        type: 'json',
      },
    },
    selection: {
      grid: {
        type: 'interval',
        bind: 'scales',
        on: '[mousedown, window:mouseup] > window:mousemove!',
        encodings: ['x', 'y'],
        translate: '[mousedown, window:mouseup] > window:mousemove!',
        zoom: 'wheel!',
        mark: {
          fill: '#333',
          fillOpacity: 0.125,
          stroke: 'white',
        },
        resolve: 'global',
      },
    },
    mark: 'circle',
    encoding: {
      x: {
        field: 'Horsepower',
        type: 'quantitative',
        scale: {
          domain: [75, 150],
        },
      },
      y: {
        field: 'Miles_per_Gallon',
        type: 'quantitative',
        scale: {
          domain: [20, 40],
        },
      },
      size: {
        field: 'Cylinders',
        type: 'quantitative',
      },
    },
  };

  embedOpts = {
    actions: false,
    mode: 'vega-lite' as Mode,
    defaultStyle: false,
  };

  @ViewChild('graph') graph: ElementRef;
  @ViewChild('graph1') graph1: ElementRef;

  ngAfterViewInit(): void {
    embed(this.graph.nativeElement, this.data1, this.embedOpts);
    embed(this.graph1.nativeElement, this.data2, this.embedOpts);
  }
}
