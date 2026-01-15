import React, { useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";   
import ReactFusioncharts from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { useMemo } from "react";


Charts(FusionCharts);
FusionTheme(FusionCharts);

export default function CostChart({ chartType, groupWise }) {
  
 const { categories, dataset } = useMemo(() => {
    if (!groupWise || groupWise.length === 0) {
      return { categories: [], dataset: [] };
    }

    
    const months = Array.from(
      new Set(
        groupWise.flatMap(g => Object.keys(g.monthlyData))
      )
    ).sort();

    
    const categories = [{
      category: months.map(m => ({ label: m }))
    }];

    
    const dataset = groupWise.map(group => ({
      seriesname: group.groupName,
      data: months.map(month => ({
        value: group.monthlyData[month] ?? 0
      }))
    }));

    return { categories, dataset };
  }, [groupWise]);

  const chartConfigs = {
    type: chartType,              
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
