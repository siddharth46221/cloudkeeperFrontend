import React, { useState } from "react";

export default function Filter({ onChange }) {
  
  const filterOptions = [
    { key: "service", label: "Service" },
    { key: "instanceType", label: "Instance Type" },
    { key: "accountId", label: "Account ID" },
    { key: "usageType", label: "Usage Type" },
    { key: "platform", label: "Platform" },
    { key: "region", label: "Region" },
    { key: "usageGroup", label: "Usage Type Group" },
    { key: "purchaseOption", label: "Purchase Option" },
    { key: "apiOperation", label: "API Operation" },
    { key: "resource", label: "Resource" },
    { key: "chargeType", label: "Charge Type" },
    { key: "availabilityZone", label: "Availability Zone" },
    { key: "tenancy", label: "Tenancy" },
    { key: "legalEntity", label: "Legal Entity" },
    { key: "billingEntity", label: "Billing Entity" },
  ];

  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleFilter = (filterKey) => {
    const updated = {
      ...selectedFilters,
      [filterKey]: !selectedFilters[filterKey],
    };

    setSelectedFilters(updated);
    onChange && onChange(updated);
  };

  const resetFilters = () => {
    const cleared = {};
    filterOptions.forEach((f) => (cleared[f.key] = false));
    setSelectedFilters(cleared);
    onChange && onChange(cleared);
  };

  return (
    <div className="w-88 border-l bg-white p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-700 text-lg">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-blue-600 text-sm hover:underline"
        >
          Reset All
        </button>
      </div>


      <div className="space-y-3">
        {filterOptions.map((filter) => (
          <div
            key={filter.key}
            className="flex items-center justify-between border-b border-gray-300 pb-3"
          >
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters[filter.key] || false}
                onChange={() => toggleFilter(filter.key)}
                className="w-4 h-4 border-2 border-gray-300 rounded-xs appearance-none checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <span className="text-gray-600 text-[13px] font-bold">{filter.label}</span>
            </label>

            <span className="text-gray-400 text-xs">Include Only</span>
          </div>
        ))}
      </div>
    </div>
  );
}
