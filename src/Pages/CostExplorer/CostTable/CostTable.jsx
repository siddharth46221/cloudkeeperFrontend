import React from "react";

// --- Generate 50 dummy items ---
const generateDummyData = () => {
  const names = [
    "No Instance Type",
    "db.m6g.2xlarge",
    "cache.m6g.large",
    "db.m6g.xlarge",
    "i3.2xlarge",
    "db.m6g.large",
    "c5a.xlarge",
    "db.m4.medium",
    "c6a.xlarge",
    "r6a.2xlarge",
    "c5a.4xlarge",
    "t3a.xlarge",
    "db.m6g.small",
    "m6a.2xlarge",
  ];

  let rows = [];
  for (let i = 0; i < 50; i++) {
    rows.push({
      instanceType: names[i % names.length],
      jun: (5000 + Math.random() * 95000).toFixed(2),
      jul: (5000 + Math.random() * 95000).toFixed(2),
      aug: (5000 + Math.random() * 95000).toFixed(2),
      sep: (5000 + Math.random() * 95000).toFixed(2),
      oct: (5000 + Math.random() * 95000).toFixed(2),
      nov: (5000 + Math.random() * 95000).toFixed(2),
    });
  }
  return rows;
};

const dummyData = generateDummyData();

export default function CostTable() {
  return (
    <div className="bg-white border rounded-md mt-6 w-full">

    

      {/* TABLE WRAPPER WITH SCROLLING (max 13 rows) */}
      <div className="max-h-[520px] overflow-y-scroll custom-scrollbar">

        <table className="min-w-full text-sm text-left border-collapse">
          {/* Table Head */}
          <thead className="bg-[#F0F4F9] text-gray-600 text-xs border-b">
            <tr>
              <th className="px-4 py-3 border-r">Instance Type</th>
              <th className="px-4 py-3 border-r">Jun 2025</th>
              <th className="px-4 py-3 border-r">Jul 2025</th>
              <th className="px-4 py-3 border-r">Aug 2025</th>
              <th className="px-4 py-3 border-r">Sep 2025</th>
              <th className="px-4 py-3 border-r">Oct 2025</th>
              <th className="px-4 py-3 border-r">Nov 2025</th>
              <th className="px-4 py-3">Total</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {dummyData.map((row, idx) => {
              const total =
                Number(row.jun) +
                Number(row.jul) +
                Number(row.aug) +
                Number(row.sep) +
                Number(row.oct) +
                Number(row.nov);

              return (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 border-r w-[180px] font-medium">
                    {row.instanceType}
                  </td>

                  <td className="px-4 py-2 border-r">${row.jun}</td>
                  <td className="px-4 py-2 border-r">${row.jul}</td>
                  <td className="px-4 py-2 border-r">${row.aug}</td>
                  <td className="px-4 py-2 border-r">${row.sep}</td>
                  <td className="px-4 py-2 border-r">${row.oct}</td>
                  <td className="px-4 py-2 border-r">${row.nov}</td>
                  <td className="px-4 py-2 font-semibold text-blue-600">
                    ${total.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
