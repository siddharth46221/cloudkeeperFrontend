import React from "react";

const CustomTable = ({
  columns = [],
  data = [],
  maxHeight = "",
  fulltableClass = "",
  tableClass = "",
  headerClass = "",
  rowClass = "",
  cellClass = "",
}) => {
  return (
    <div
      className={`overflow-y-auto custom-scrollbar ${fulltableClass}`}
      style={{ maxHeight }}
    >
      <table className={`w-full border-collapse ${tableClass}`}>
        
        <thead
          className={`${headerClass} sticky top-0 z-10 bg-gray-200 border-b border-gray-500`}
        >
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-3 py-2 text-left font-semibold 
                           border-b border-gray-200
                           bg-gray-100"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                className={`${rowClass} hover:bg-gray-50`}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-3 py-2 
                                border-b border-gray-200
                                ${cellClass}`}
                  >
                    {col.render? col.render(row) : row[col.key] ?? ""}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
};

export default CustomTable;
