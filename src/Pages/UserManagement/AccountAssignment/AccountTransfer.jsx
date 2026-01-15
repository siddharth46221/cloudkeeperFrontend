import React, { useState,useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowCircleLeft } from "react-icons/fa";


function AccountTransfer({
  accounts = [],
  initialAssignedAccounts = [],
  setAssignedAccounts,
}) {
  const [searchLeft, setSearchLeft] = useState("");
  const [searchRight, setSearchRight] = useState("");

  const [selectedLeft, setSelectedLeft] = useState(new Set());
  const [selectedRight, setSelectedRight] = useState(new Set());


 
const [assignedItems, setAssignedItems] = useState([]);

useEffect(() => {
  
  if (!accounts || accounts.length === 0) return;

  
  const assigned = accounts.filter(acc =>
  
    initialAssignedAccounts.some(id => String(id) === String(acc.id))
  );

  setAssignedItems(assigned);

  
}, [accounts, initialAssignedAccounts]);



  const availableItems = accounts.filter(
    acc => !assignedItems.some(a => a.id === acc.id)
  );

  const filteredAvailable = availableItems.filter(acc =>
    (acc.arnNumber ?? "").toLowerCase().includes(searchLeft.toLowerCase())
  );

  const filteredAssigned = assignedItems.filter(acc =>
    (acc.arnNumber ?? "").toLowerCase().includes(searchRight.toLowerCase())
  );

  const toggleLeft = (id) => {
    const s = new Set(selectedLeft);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelectedLeft(s);
  };

  const toggleRight = (id) => {
    const s = new Set(selectedRight);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelectedRight(s);
  };

  const moveToRight = () => {
   const toMove = availableItems.filter(acc => selectedLeft.has(acc.id));
  const updated = [...assignedItems, ...toMove];

  setAssignedItems(updated);
  setAssignedAccounts?.(updated.map(a => a.id)); 
  setSelectedLeft(new Set());
  };

  const moveToLeft = () => {
    const updated = assignedItems.filter(
    acc => !selectedRight.has(acc.id)
  );

  setAssignedItems(updated);
  setAssignedAccounts?.(updated.map(a => a.id)); 
  setSelectedRight(new Set());
  };

  return (
    <div className="w-[60%] border flex justify-between p-5 mt-8 bg-gray-200">
      
      <div className="w-[45%] border bg-white">
        <div className="bg-[#e8f1ff] h-10 flex justify-between items-center">
          <p className="ml-2 font-bold">Available Accounts</p>
          <p className="mr-2">{availableItems.length}</p>
        </div>

        <input
          className="w-full border-b h-12 px-3"
          placeholder="Search"
          value={searchLeft}
          onChange={(e) => setSearchLeft(e.target.value)}
        />

        <div className="h-[427px] overflow-y-auto">
          {filteredAvailable.map(acc => (
            <div
              key={acc.id}
              onClick={() => toggleLeft(acc.id)}
              className="flex items-center h-10 border-b border-gray-300 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedLeft.has(acc.id)}
                readOnly
                className="mx-3"
              />
              {acc.accountName}
            </div>
          ))}
        </div>
      </div>

      
      <div className="grid place-content-center gap-6">
        <FaArrowCircleLeft
          className="rotate-180 cursor-pointer scale-200"
          onClick={moveToRight}
        />
        <FaArrowCircleLeft
          className="cursor-pointer scale-200"
          onClick={moveToLeft}
        />
      </div>

    
      <div className="w-[45%] border bg-white">
        <div className="bg-[#e8f1ff] h-10 flex justify-between items-center">
          <p className="ml-2 font-bold">Assigned Accounts</p>
          <p className="mr-2">{assignedItems.length}</p>
        </div>

        <input
          className="w-full border-b h-12 px-3"
          placeholder="Search"
          value={searchRight}
          onChange={(e) => setSearchRight(e.target.value)}
        />

        <div className="h-[427px] overflow-y-auto">
          {filteredAssigned.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No Account IDs Added
            </div>
          ) : (
            filteredAssigned.map(acc => (
              <div
                key={acc.id}
                onClick={() => toggleRight(acc.id)}
                className="flex items-center h-10 border-b border-gray-300 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedRight.has(acc.id)}
                  readOnly
                  className="mx-3"
                />
                {acc.accountName}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


export default AccountTransfer;
