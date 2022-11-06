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
import { UserService } from "../../user/user.service";
import * as moment from "moment";

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
  chartItem: any;
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "CHART" },
      { label: "JOBCHART", active: true },
    ];

    this._fetchData();
  }

  private _fetchData() {
    this.loading = true;
    this.userService.getDashboard().subscribe(
      (data) => {
        this.loading = false;
        this.chartItem = data.body.payLoad;
        const dataTime = [];
        const dataSeries = [];
        this.chartItem?.clickOnJobGraph.forEach((data) => {
          dataTime.push(moment(data.datetime).format("DD/MM/YYYY"));
          dataSeries.push(data.count);
        });
        this.barChart = barChart;
        this.barChart.xAxis[0].data = dataTime;
        this.barChart.series[0].data = dataSeries;
      },
      (err) => {
        this.loading = false;
      }
    );

    this.lineChart = lineChart;
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
