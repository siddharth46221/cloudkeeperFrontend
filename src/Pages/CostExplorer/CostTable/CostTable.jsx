import React from "react";
import { useMemo } from "react";  




export default function CostTable({monthWise}) {

   const { months, rows } = useMemo(() => {
    if (!monthWise) return { months: [], rows: [] };

    const months = Object.keys(monthWise).sort();

    const groups = Array.from(
      new Set(
        Object.values(monthWise).flatMap(m =>
          Object.keys(m.groupData)
        )
      )
    );

    const rows = groups.map(group => {
      let row = { groupName: group };

      months.forEach(month => {
        row[month] = monthWise[month].groupData[group] ?? 0;
      });

      row.total = months.reduce(
        (sum, m) => sum + row[m],
        0
      );

      return row;
    });

    return { months, rows };
  }, [monthWise]);

  const formatMonth = (m) => {
    const [year, month] = m.split("/");
    const names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${names[month - 1]} ${year}`;
  };

  if (!rows.length) {
    return <p className="text-black text ml-96 mt-36">No data available</p>;
  }



  return (
    <div className="bg-white border rounded-md mt-6 w-full">
      <div className="max-h-[520px] overflow-y-scroll custom-scrollbar">
        <table className="min-w-full text-sm border-collapse">

          <thead className="bg-blue-100 text-gray-600 text-xs border-b sticky top-0">
            <tr>
              <th className="px-4 py-3  text-black border-r">Instance Type</th>

              {months.map(m => (
                <th key={m} className="px-4 py-3 border-r  text-black">
                  {formatMonth(m)}
                </th>
              ))}

              <th className="px-4 py-3">Total</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 border-r font-medium w-[200px]">
                  {row.groupName}
                </td>

                {months.map(m => (
                  <td key={m} className="px-4 py-2 border-r">
                    ${row[m].toFixed(2)}
                  </td>
                ))}

                <td className="px-4 py-2 font-semibold text-blue-600">
                  ${row.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
