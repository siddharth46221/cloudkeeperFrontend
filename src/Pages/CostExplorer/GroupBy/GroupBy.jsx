
import { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';

export default function GroupBy({ toggleFilters }) {
  const groupItems = ["Account Id", "Usage Type", "Instance Type", "Service", "Platform", "Region" , "Usage Type Group"];

  const [selectedGroup, setSelectedGroup] = useState(groupItems[0]);

  const handleGroupClick = (groupName) => {
    setSelectedGroup(groupName);
  };

  const availableGroupItems = groupItems.filter(item => item !== selectedGroup);

  return (
    <div className="bg-[#f8f8f8] p-4 shadow rounded-t-sm flex justify-between items-center border border-gray-200">

    

      <div className="flex gap-3 text-[12px] items-center">
        <span className='font-bold text-[13px]'>Group By:</span>
        
        {selectedGroup && (
          <>
            
            <button className="text-white font-semibold bg-blue-800 h-7 px-2 rounded-sm">{selectedGroup}</button>
            <div className="h-6 w-px bg-gray-400 mx-3"></div>
            
          </>
        )}
    
        {availableGroupItems.map((g, i) => (
          <button
            key={i}
            className="px-2 h-6 rounded-sm border border-gray-300 text-blue-700 cursor-pointer font-semibold"
            onClick={() => handleGroupClick(g)} 
          >
            {g}
          </button>
        ))}
        
        </div>


      <button
        onClick={toggleFilters}
        className="flex items-center gap-2 px-2 py-1 text-sm 
                   bg-[#F0F4FF] border border-blue-600 text-blue-600
                   shadow-sm rounded-md hover:bg-[#E4E9F7]"
      >
        <TuneIcon size={16}/>
        
      </button>
    </div>
  );
}
