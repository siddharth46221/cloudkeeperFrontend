import logo from "../../assets/logoCK.svg"
import { IoMdMenu } from "react-icons/io";
import { FaSortDown } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const Header = ({setCollapsed}) => {
  const navigate = useNavigate();
  const user=useSelector((state)=>state.UserData.value);
  console.log("user from header",user);

  function logout(){
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header className="w-full shadow-[0_4px_10px_rgba(0,0,0,0.15)] bg-white z-40">
      <div className="flex items-center justify-between px-6 h-16 ">

        
        <div className="flex items-center gap-5">
          <img src={logo} alt="logo" className="h-10" />
          <button onClick={() => setCollapsed((prev) => !prev)}>
            <IoMdMenu className="text-blue-400 cursor-pointer" size={22} />
          </button>

          <div>
            <p className="font-bold text-sm">Module</p>
            <div className="flex items-center gap-1">
              <p>Lens</p>
              <FaSortDown />
            </div>
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
                <p className="text-blue-400 font-bold">{user.firstName+" "+user.lastName}</p>
                <AiOutlineExclamationCircle className="text-blue-400" size={16} />
              </div>
            </div>
          </div>

      
          <div className="border-l h-8" />

          
          <div
           onClick={logout}
          className="flex items-center gap-2 border-2 px-3 py-1 rounded text-blue-400 cursor-pointer">
            <GrLogout />
            <p className="font-bold text-sm">Logout</p>
          </div>
        </div>

      </div>
    </header>
  );
};
