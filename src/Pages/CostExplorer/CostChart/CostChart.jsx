import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";   
import ReactFusioncharts from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";


Charts(FusionCharts);
FusionTheme(FusionCharts);

export default function CostChart({ chartType }) {
  const categories = [
    {
      category: [
        { label: "Jun 2025" },
        { label: "Jul 2025" },
        { label: "Aug 2025" },
        { label: "Sep 2025" },
        { label: "Oct 2025" },
        { label: "Nov 2025" },
      ],
    },
  ];

  const dataset = [
    {
      seriesname: "No Instance Type",
      data: [
        { value: 95000 },
        { value: 98000 },
        { value: 101000 },
        { value: 93000 },
        { value: 88000 },
        { value: 104000 },
      ],
    },
    {
      seriesname: "db.m6g.2xlarge",
      data: [
        { value: 3000 },
        { value: 3200 },
        { value: 3500 },
        { value: 3100 },
        { value: 2900 },
        { value: 3400 },
      ],
    },
    {
      seriesname: "cache.m6g.large",
      data: [
        { value: 22000 },
        { value: 23000 },
        { value: 23500 },
        { value: 22800 },
        { value: 22000 },
        { value: 24000 },
      ],
    },
    {
      seriesname: "db.m6g.xlarge",
      data: [
        { value: 1500 },
        { value: 1800 },
        { value: 1600 },
        { value: 1700 },
        { value: 1550 },
        { value: 1650 },
      ],
    },
    {
      seriesname: "i3.2xlarge",
      data: [
        { value: 900 },
        { value: 1100 },
        { value: 1050 },
        { value: 1000 },
        { value: 970 },
        { value: 1200 },
      ],
    },
    {
      seriesname: "Others",
      data: [
        { value: 3000 },
        { value: 3100 },
        { value: 3300 },
        { value: 2900 },
        { value: 2800 },
        { value: 3500 },
      ],
    },
  ];

  const chartConfigs = {
    type: chartType,              // mscolumn2d | msline | msstackedcolumn2d
    width: "100%",
    height: "380",
    dataFormat: "json",
    dataSource: {
      chart: {
        theme: "fusion",
        showvalues: "0",
        yAxisName: "Cost ($)",
        xAxisName: "Months",
        numDivLines: "6",
        divLineColor: "#E0E6F1",
        divLineDashed: "1",
        paletteColors: "#2D8CFF,#00D1FF,#FFBB00,#89E894,#33B35A,#FFCA28",
        plotSpacePercent: "20",
        showLegend: "1",
        legendItemFontSize: "12",
      },
      categories,
      dataset,
    },
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <ReactFusioncharts {...chartConfigs} />
    </div>
  );
}
