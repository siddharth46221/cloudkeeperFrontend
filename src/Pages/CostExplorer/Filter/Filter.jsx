import React, { useState } from "react";
import FilterItems from "./FilterItems";


export default function Filter({ onChange,getdataByFilter }) {
  const filterOptions = [
    { key: "service", label: "Service" },
    { key: "instance_type", label: "Instance Type" },
    { key: "account_id", label: "Account ID" },
    { key: "usage_type", label: "Usage Type" },
    { key: "platform", label: "Platform" },
    { key: "region", label: "Region" },
    { key: "usage_type_group", label: "Usage Type Group" },
    { key: "purchase_option", label: "Purchase Option" },
    { key: "api_operation", label: "API Operation" },
    { key: "resource", label: "Resource" },
    { key: "availability_zone", label: "Availability Zone" },
    { key: "tenancy", label: "Tenancy" },
    { key: "legal_entity", label: "Legal Entity" },
    { key: "billing_entity", label: "Billing Entity" },
  ];

  const [selectedValues, setSelectedValues] = useState([]);


  const applyFilter = (key, values) => {
    const updated = [ ...selectedValues, values ];
    setSelectedValues(updated);
    onChange(updated);
  };

  const resetFilters = () => {
    const cleared = {};
    filterOptions.forEach(f => (cleared[f.key] = []));
    setSelectedValues(cleared);
    onChange(cleared);
  };

  return (
    <div className="w-88  bg-white p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-700 text-lg">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-blue-600 text-sm hover:underline"
        >
          Reset All
        </button>
      </div>

      {filterOptions.map(filter => (
        <FilterItems
          key={filter.key}
          filterKey={filter.key}
          label={filter.label}
          value={selectedValues[filter.key] || []}
          onChange={applyFilter}
          getdataByFilter={getdataByFilter}
        />
      ))}
    </div>
  );
}
