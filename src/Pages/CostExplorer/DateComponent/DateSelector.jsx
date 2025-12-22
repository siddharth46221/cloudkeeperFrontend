import { useState } from "react";
import { DateRange } from "react-date-range";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateSelector({ value, onChange }) {

  const [open, setOpen] = useState(false);

  const [range, setRange] = useState([
    {
      startDate: value?.startDate || new Date(),
      endDate: value?.endDate || new Date(),
      key: "selection",
    },
  ]);

  function applyQuick(days) {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    setRange([{ startDate: start, endDate: end, key: "selection" }]);
  }

  const displayText = `${range[0].startDate.toDateString()} - ${range[0].endDate.toDateString()}`;

  return (
    <div className="relative">

      <div
        className="flex items-center w-56 h-8 bg-white border border-gray-200 rounded-md px-2 py-2  text-sm cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <span className="flex-1 text-black font-semibold text-[11px] whitespace-nowrap overflow-hidden text-ellipsis">
          {displayText}
        </span>

        <CalendarMonthIcon style={{ fontSize: 20 }} className="text-gray-600 pointer-coarse mb-1 ml-2" />
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-4 w-[700px]">

            <div className="flex items-center justify-between px-2 mb-2">
              <p className="font-semibold text-gray-700">{displayText}</p>
              <button
                onClick={() =>
                  setRange([{ startDate: new Date(), endDate: new Date(), key: "selection" }])
                }
                className="text-blue-600 text-sm"
              >
                Clear Selection
              </button>
            </div>

            {/* Dual Calendar */}
            <div className="flex justify-center">
              <DateRange
                onChange={(item) => setRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={range}
                rangeColors={["#2684FF"]}
                months={2}
                direction="horizontal"
                showMonthAndYearPickers={true}
                showDateDisplay={false}
                maxDate={new Date()}
              />
            </div>

            {/* Quick selection buttons */}
            <div className="flex gap-3 justify-center mt-4">
              <button onClick={() => applyQuick(7)} className="px-4 py-1 border rounded-md text-sm">7D</button>
              <button onClick={() => applyQuick(30)} className="px-4 py-1 border rounded-md text-sm">30D</button>
              <button onClick={() => applyQuick(90)} className="px-4 py-1 border rounded-md text-sm">3M</button>
              <button onClick={() => applyQuick(180)} className="px-4 py-1 border rounded-md text-sm">6M</button>
              <button onClick={() => applyQuick(365)} className="px-4 py-1 border rounded-md text-sm">1Y</button>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-4 gap-3 px-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onChange(range[0]);
                  setOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Apply
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
