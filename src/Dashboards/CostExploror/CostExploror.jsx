import React, { useEffect, useState } from "react";
import CostChart from "../../Pages/CostExplorer/CostChart/CostChart";
import GroupBy from "../../Pages/CostExplorer/GroupBy/GroupBy";
import DateSelector from "../../Pages/CostExplorer/DateComponent/DateSelector";
import { FaChartBar } from "react-icons/fa";
import { BiLineChart } from "react-icons/bi";
import { FaTable } from "react-icons/fa";
import Filter from "../../Pages/CostExplorer/Filter/Filter";
import CostTable from "../../Pages/CostExplorer/CostTable/CostTable";
import { getAllAccountsData, getFilterReport } from "../../Pages/CostExplorer/CostExplorerService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "../../Utils/Loader";

export function CostExploror() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [chartType, setChartType] = useState("mscolumn2d");
  const [loading, setLoading] = useState(false);
  const accounts = useSelector(state => state.Accounts.value)
  

  
  const [selectedGroup, setSelectedGroup] = useState("Service");

  const [chartdata, setChartData] = useState([]);
  const [tabledata, setTableData] = useState([]);

  const GROUP_ITEMS = [
    "Service",
    "Instance Type",
    "Account Id",
    "Usage Type",
    "Platform",
    "Region",
    "Usage Type Group",
    "Purchase Option",
    "API Operation",
    "Resource",
    "Availability Zone",
    "Tenancy",
    "Legal Entity",
    "Billing Entity"
  ];

  const toggleFilters = () => setFiltersOpen(prev => !prev);

  

  
  useEffect(() => {
    const apiGroup = selectedGroup.toLowerCase().replace(/\s+/g, "_");
     setLoading(true);
    getAllAccountsData(apiGroup, accounts?accounts: [])
      .then((data) => {
        setChartData(data.groupWise || []);
        setTableData(data.monthWise || {});
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed to load data");
      }).finally(() =>{
        setLoading(false);
      });
  }, [selectedGroup,accounts]);

  function getdataByFilter(groupBy, filters){
     getFilterReport(groupBy, accounts?accounts: [], filters)
      .then((data) => {
        setChartData(data.groupWise || []);
        setTableData(data.monthWise || {});
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed to load data");
      })

  }

  return (
    <div className="w-full min-h-screen bg-[#F5F7FB] flex">
      <div className="flex-1">
        <h1 className="text-3xl font-bold ml-6 mt-6">Cost Explorer</h1>
        <p className="text-[#555b6c] ml-6 text-sm">
          How to always be aware of cost changes and history.
        </p>

        <div className="h-px w-full bg-gray-200 mt-4"></div>

        <div className="p-6">
        
          <GroupBy
            groupItems={GROUP_ITEMS}
            selectedGroup={selectedGroup}
            onGroupChange={setSelectedGroup}
            toggleFilters={toggleFilters}
          />

          <div className="relative w-full flex bg-white overflow-hidden">
            <div
              className={`transition-all duration-300 ${
                filtersOpen ? "max-w-[calc(100%-360px)] p-4" : "max-w-full p-4"
              } flex-1`}
            >
              <div className="flex justify-between items-center mb-4">
                <h6 className="text-sm font-medium text-gray-400">
                  Costs ($)
                </h6>

                <div className="flex gap-3">
                  <DateSelector value={dateRange} onChange={setDateRange} />

                  <div className="flex">
                    <button
                      onClick={() => setChartType("mscolumn2d")}
                      className={`p-1 border border-gray-300 h-7 rounded-l ${
                        chartType === "mscolumn2d"
                          ? "bg-blue-100 text-blue-500"
                          : "bg-gray-100"
                      }`}
                    >
                      <FaChartBar />
                    </button>

                    <button
                      onClick={() => setChartType("msline")}
                      className={`p-1 border border-gray-300 h-7 ${
                        chartType === "msline"
                          ? "bg-blue-100 text-blue-500"
                          : "bg-gray-100"
                      }`}
                    >
                      <BiLineChart />
                    </button>

                    <button
                      onClick={() => setChartType("stackedcolumn2d")}
                      className={`p-1 border border-gray-300 h-7 rounded-r ${
                        chartType === "stackedcolumn2d"
                          ? "bg-blue-100 text-blue-500"
                          : "bg-gray-100"
                      }`}
                    >
                      <FaTable />
                    </button>
                  </div>
                </div>
              </div>

             {loading ? <Loader/> :  <CostChart
                chartType={chartType}
                groupWise={chartdata}
              />
              }
               
              {loading ? <div className="mt-52"> 
                < Loader/> 
              </div>:<CostTable  monthWise={tabledata} />}
            </div>

            
            <div
              className={`w-[360px] bg-white border-l border-gray-300 absolute right-0 top-0 h-full transition-transform duration-300 ${
                filtersOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <Filter
               getdataByFilter={getdataByFilter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
