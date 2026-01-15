import { useState } from "react";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { getFilterItems } from "../CostExplorerService";
import { toast } from "react-toastify";

export default function FilterItems({
  filterKey,
  label,
  getdataByFilter,
  value = [],
  
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [tempSelected, setTempSelected] = useState([]);

  const selectedValues = Array.isArray(value) ? value : [];

  
  const toggleOpen = async () => {
    setOpen(prev => {
      const next = !prev;

      if (next) {
        setTempSelected(selectedValues);
        setSearch("");

        
        if (options.length === 0) {
          setLoading(true);

          getFilterItems(filterKey)
            .then(data => {
              setOptions(data || []);
            ;console.log(data)})
            .catch(err => {
              toast.error(
                err?.response?.data?.message || "Failed to load filter items"
              );
            })
            .finally(() => setLoading(false));
        }
      }

      return next;
    });
  };

  const toggleValue = val => {
    setTempSelected(prev =>
      prev.includes(val)
        ? prev.filter(v => v !== val)
        : [...prev, val]
    );
  };

  const apply = () => {

    setOpen(false);
    getdataByFilter(filterKey,tempSelected)
  };

  const close = () => {
    setTempSelected(selectedValues);
    setOpen(false);
  };

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="border-b border-gray-300 py-3">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleOpen}
      >
        <div>
          <p className="text-[13px] font-bold text-gray-700">{label}</p>
          {selectedValues.length > 0 && (
            <p className="text-xs text-blue-600">
              {selectedValues.length} selected
            </p>
          )}
        </div>
        {open ? (
          <IoChevronDown className="text-gray-400" />
        ) : (
          <IoChevronForward className="text-gray-400" />
        )}
      </div>

      {open && (
        <div className="mt-3 space-y-3">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border px-2 py-1 text-sm rounded"
          />

          <div className="max-h-48 overflow-y-auto space-y-2">
            {loading && (
              <p className="text-xs text-gray-400">Loading...</p>
            )}

            {!loading &&
              filteredOptions.map(opt => (
                <label
                  key={opt}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={tempSelected.includes(opt)}
                    onChange={() => toggleValue(opt)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-600">{opt}</span>
                </label>
              ))}

            {!loading && filteredOptions.length === 0 && (
              <p className="text-xs text-gray-400">No results</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button onClick={close} className="text-sm text-gray-600">
              Close
            </button>
            <button
              onClick={apply}
              className="bg-blue-600 text-white text-sm px-3 py-1 rounded"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
