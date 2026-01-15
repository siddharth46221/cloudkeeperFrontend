import { useState, useRef, useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";

export default function GroupBy({
  groupItems,
  selectedGroup,
  onGroupChange,
  toggleFilters
}) {
  const PRIMARY_GROUPS = [
    "Service",
    "Instance Type",
    "Account Id",
    "Usage Type",
    "Platform",
    "Region",
    "Usage Type Group"
  ];

  const MORE_GROUPS = groupItems.filter(
    g => !PRIMARY_GROUPS.includes(g)
  );

  const availablePrimary = PRIMARY_GROUPS.filter(
    g => g !== selectedGroup
  );

  const [showMore, setShowMore] = useState(false);
  const dropdownRef = useRef(null);

  const handleGroupClick = (group) => {
    onGroupChange(group);  
    setShowMore(false);
  };

  
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMore(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="bg-[#f8f8f8] p-4 shadow rounded-t-sm flex justify-between items-center border border-gray-200">
      <div className="flex gap-3 text-[12px] items-center">
        <span className="font-bold text-[13px]">Group By:</span>

    
        <button className="text-white font-semibold bg-blue-800 h-7 px-2 rounded-sm">
          {selectedGroup}
        </button>

        <div className="h-6 w-px bg-gray-400 mx-2"></div>

        
        {availablePrimary.map((g) => (
          <button
            key={g}
            className="px-2 h-6 rounded-sm border border-gray-300 text-blue-700 font-semibold"
            onClick={() => handleGroupClick(g)}
          >
            {g}
          </button>
        ))}

        
        {MORE_GROUPS.length > 0 && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-2 h-6 text-blue-700 font-semibold flex items-center gap-1"
            >
              More <span className="text-xs">▾</span>
            </button>

            {showMore && (
              <div className="absolute top-8 left-0 w-48 bg-white shadow-md rounded-sm z-50">
                {MORE_GROUPS.map(item => (
                  <div
                    key={item}
                    className="px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                    onClick={() => handleGroupClick(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    
      <button
        onClick={toggleFilters}
        className="flex items-center gap-2 px-2 py-1 text-sm 
                   bg-[#F0F4FF] border border-blue-600 text-blue-600
                   shadow-sm rounded-md hover:bg-[#E4E9F7]"
      >
        <TuneIcon fontSize="small" />
      </button>
    </div>
  );
}
