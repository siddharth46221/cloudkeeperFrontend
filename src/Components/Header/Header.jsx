
import logo from "../../assets/logoCK.svg";
import { IoMdMenu } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  useEffect,useState } from "react";
import { accountChange } from "../../Redux/AccountSelectSlice";
import { getAllAccounts } from "../../Pages/Onboarding/AccountsService";

export const Header = ({ setCollapsed }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserData.value);
  const [showAccounts, setShowAccounts] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  
  const [accounts, setAccounts] = useState(user.accounts);
    

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    if(user.role == "ADMIN" || user.role == "READONLY"){
     
      getAllAccounts().then((res) => {
        setAccounts(res);
      }).catch((err) => {
        console.log(err);
      })
    }
  
  }, []);

  const toggleAccount = (id) => {
    setSelectedAccounts((prev) =>
      prev.includes(id)
        ? prev.filter((a) => a !== id)
        : [...prev, id]
    );
  };

  const applyAccounts = () => {
    dispatch(accountChange(selectedAccounts));
    setShowAccounts(false);
  };

  return (
    <header className="w-full shadow-[0_4px_10px_rgba(0,0,0,0.15)] bg-white z-40">
      <div className="flex items-center justify-between px-6 h-16">

        
        <div className="flex items-center gap-5">
          <img src={logo} alt="logo" className="h-10" />

          <button onClick={() => setCollapsed((prev) => !prev)}>
            <IoMdMenu className="text-blue-400 cursor-pointer" size={22} />
          </button>

        
          <div className="relative">
            <button
              onClick={() => setShowAccounts(!showAccounts)}
              className="font-semibold text-sm px-3 py-1 rounded hover:bg-blue-50"
            >
              Accounts
            </button>

            {showAccounts && (
              <div className="absolute top-10 left-0 w-64 bg-white border rounded-md shadow-lg z-50">

                
                <div className="px-4 py-2 border-b font-semibold text-sm">
                  Select Accounts
                </div>

              
                <div className="max-h-48 overflow-y-auto">
                  {accounts?.map((acc) => (
                    <label
                      key={acc.id}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAccounts.includes(acc.awsId)}
                        onChange={() => toggleAccount(acc.awsId)}
                        className="accent-blue-500"
                      />
                      {acc.accountName}
                    </label>
                  ))}
                </div>

                
                <div className="flex justify-between items-center px-4 py-2 border-t bg-gray-50">
                  <p className="text-xs text-gray-500">
                    {selectedAccounts.length} selected
                  </p>
                  <button
                    onClick={applyAccounts}
                    className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded hover:bg-blue-600"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="rounded-full border border-blue-400 w-9 h-9 flex items-center justify-center bg-blue-50">
              <GoPeople size={20} className="text-blue-400" />
            </div>

            <div>
              <p className="text-[13px] leading-none">Welcome,</p>
              <div className="flex items-center gap-1">
                <p className="text-blue-400 font-bold">
                  {user.firstName + " " + user.lastName}
                </p>
                <AiOutlineExclamationCircle className="text-blue-400" size={16} />
              </div>
            </div>
          </div>

          <div className="border-l h-8" />

          <div
            onClick={logout}
            className="flex items-center gap-2 border-2 px-3 py-1 rounded text-blue-400 cursor-pointer"
          >
            <GrLogout />
            <p className="font-bold text-sm">Logout</p>
          </div>
        </div>
      </div>
    </header>
  );
};
