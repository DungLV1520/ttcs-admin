import { Component, OnInit } from "@angular/core";
import { ChartType } from "./echart.model";
import {
  lineChart,
  barChart,
  pieChart,
  customPieChart,
  gradientBarChart,
  gaugeChart,
  lineBarChart,
  donughnutChart,
  bubbleChart,
  dynamicChart,
} from "./data";

@Component({
  selector: "app-echart",
  templateUrl: "./echart.component.html",
  styleUrls: ["./echart.component.scss"],
})
export class EchartComponent implements OnInit {
  lineChart: ChartType;
  barChart: ChartType;
  pieChart: ChartType;
  customPieChart: ChartType;
  gradientBarChart: ChartType;
  lineBarChart: ChartType;
  donughnutChart: ChartType;
  bubbleChart: ChartType;
  gaugeChart: ChartType;
  dynamicChart: ChartType;
  breadCrumbItems: Array<{}>;

  constructor() {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "CHART" },
      { label: "JOBCHART", active: true },
    ];

    this._fetchData();
  }

  private _fetchData() {
    this.lineChart = lineChart;
    this.barChart = barChart;
    this.pieChart = pieChart;
    this.customPieChart = customPieChart;
    this.gradientBarChart = gradientBarChart;
    this.lineBarChart = lineBarChart;
    this.donughnutChart = donughnutChart;
    this.bubbleChart = bubbleChart;
    this.gaugeChart = gaugeChart;
    this.dynamicChart = dynamicChart;
  }
}
