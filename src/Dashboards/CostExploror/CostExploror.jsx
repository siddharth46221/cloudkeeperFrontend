import React, { useState } from "react";
import CostChart from "../../Pages/CostExplorer/CostChart/CostChart";
import GroupBy from "../../Pages/CostExplorer/GroupBy/GroupBy";
import DateSelector from "../../Pages/CostExplorer/DateComponent/DateSelector";
import { FaChartBar } from "react-icons/fa";
import { BiLineChart } from "react-icons/bi";
import { FaTable } from "react-icons/fa";
import Filter from "../../Pages/CostExplorer/Filter/Filter";
import CostTable from "../../Pages/CostExplorer/CostTable/CostTable";

export function CostExploror() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [chartType, setChartType] = useState("mscolumn2d");

  function toggleFilters() {
    setFiltersOpen(!filtersOpen);
  }

  const handleFilterChange = (filters) => {
    console.log("Selected:", filters);
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F7FB] flex">
      <div className="flex-1">
        <h1 className="text-3xl font-bold ml-6 mt-6">Cost Explorer</h1>
        <p className="text-[#555b6c] ml-6 text-sm">
          How to always be aware of cost changes and history.
        </p>

        <div className="h-px w-full bg-gray-200 mt-4"></div>

        <div className="p-6">
          <GroupBy toggleFilters={toggleFilters} />

          <div className="relative w-full overflow-x-hidden flex bg-white">
            {/* main div which shrink when the filter will open */}
            <div
              className={`transition-all duration-300 ${
                filtersOpen ? "max-w-[calc(100%-360px)] p-4" : "max-w-full p-4"
              } flex-1`}
            >
              <div className="flex justify-between items-center mb-4">
                <h6 className="text-sm font-medium text-gray-400 mb-2">
                  Costs ($)
                </h6>
                <div className="flex gap-3">
                  <DateSelector
                    value={dateRange}
                    onChange={(r) => setDateRange(r)}
                  />

                  <div className="flex">
                    <button
                      onClick={() => setChartType("mscolumn2d")}
                      className={`p-1 rounded-l-[3px] border h-7 border-gray-300 ${
                        chartType === "mscolumn2d"
                         ? "bg-blue-100 text-blue-400"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <FaChartBar size={16}/>
                    </button>

                    <button
                      onClick={() => setChartType("msline")}
                      className={`p-1 h-7 border border-gray-300 ${
                        chartType === "msline"
                          ? "bg-blue-100 text-blue-400 "
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <BiLineChart/>
                    </button>

                    <button
                      onClick={() => setChartType("stackedcolumn2d")}
                      className={`p-1 h-7 rounded-r-[3px] border border-gray-300 ${
                        chartType === "stackedcolumn2d"
                          ? "bg-blue-100 text-blue-400"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <FaTable/>
                    </button>
                  </div>
                </div>
              </div>
              <CostChart chartType={chartType} />
              <div>
                <CostTable/>

              </div>
            </div>

            <div
              className={`w-[360px] bg-white border border-gray-300  min-h-full transition-transform duration-300 absolute right-0 top-0 h-full 
               ${filtersOpen ? "translate-x-0" : "translate-x-full"}
                `}
            >
              <Filter onChange={handleFilterChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
