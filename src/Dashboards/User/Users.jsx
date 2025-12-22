import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import {UsersTable} from '../../Pages/UserManagement/UserTable/UsersTable'
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../Pages/UserManagement/UserManagementService';


export const Users = () => {

  const navigate = useNavigate();
  const [tableData, setTableData] =useState();

  useEffect( () =>{
      const fetchUsers = async () => {
      const response = await getAllUsers();
      setTableData(response);
      console.log("the table data is",response)
  };
  fetchUsers();
      
  },[])

  function handleCreateUser(){
    navigate('addUser')

  }
  return (
   <div className='w-full h-full bg-gray-200 p-5'>
      
      <h1 className='text-2xl font-bold'>Users</h1>

    
      <div className='bg-white h-[calc(100%-50px)] mt-3.5 flex flex-col p-3'>

        
        <div className='flex flex-row bg-black w-40 h-11 rounded-xs mb-3'>
          <FaPlus className='mt-3 ml-2 text-white'/>
          <button onClick={handleCreateUser} className='text-white ml-2 mt-0.5 font-bold'>Add New User</button>
        </div>

        
        <div className='bg-white flex-1 w-full rounded-md mt-5'>
            <UsersTable tableData={tableData}/>
        </div>

      </div>

    </div>
  )
}
