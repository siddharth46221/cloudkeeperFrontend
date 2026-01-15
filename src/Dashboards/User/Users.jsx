import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { UsersTable } from "../../Pages/UserManagement/UserTable/UsersTable";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../Pages/UserManagement/UserManagementService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import  Loader  from "../../Utils/Loader"
export const Users = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState();
  const { role } = useSelector((state) => state.UserData.value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await getAllUsers();
      if (response.status == 200) {
        setTableData(response.data);
        
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);
    
  function handleCreateUser() {
    navigate("addUser");
  }
  if (loading) {
    return <div className="w-screen h-screen grid place-content-center-safe"><Loader/></div>
  }
  return (
    <div className="w-full h-full bg-gray-200 p-5">
      <h1 className="text-2xl font-bold">Users</h1>

      <div className="bg-white h-[calc(100%-50px)] mt-3.5 flex flex-col p-3">
        {role == "ADMIN" && (
          <div className="flex flex-row bg-black w-40 h-11 rounded-xs mb-3">
            <FaPlus className="mt-3 ml-2 text-white" />
            <button
              onClick={handleCreateUser}
              className="text-white ml-2 mt-0.5 font-bold"
            >
              Add New User
            </button>
          </div>
        )}

        <div className="bg-white flex-1 w-full rounded-md mt-5">
          <UsersTable tableData={tableData} />
        </div>
      </div>
    </div>
  );
};
