import React from "react"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { AccountTable } from "../../Pages/Onboarding/AccountTable/AccountTable"
import { getAllAccounts } from "../../Pages/Onboarding/AccountsService"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import  Loader  from "../../Utils/Loader"

export const InitialOnboarding = () => {
  const navigate = useNavigate()
  const [accounts, setAccounts] = useState([]);
  const {role} = useSelector((state) => state.UserData.value);
  const [loading, setLoading] = useState(false);

  function handleAddAccount(){
    navigate("/dashboard/onboarding")
  }

 useEffect(() => {
   setLoading(true);
   
    getAllAccounts()
      .then((res) => {
        setAccounts(res);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to fetch accounts");
      })
      .finally(() => {
        setLoading(false);
      });
}, []);


    if (loading) {
    return <div className="w-screen h-screen grid place-content-center"><Loader/></div>
  }

  return (
   <div className='w-full h-full bg-gray-200 p-5'>
         
         <h1 className='text-2xl font-bold'>Accounts</h1>
   
       
         <div className='bg-white h-[calc(100%-50px)] mt-3.5 flex flex-col p-3'>
   
           
          {role ==="ADMIN" &&(
             <div className='flex flex-row bg-black w-45 h-11 rounded-xs mb-3 cursor-pointer'>
             <FaPlus className='mt-3 ml-2 text-white cursor-pointer'/>
             <button onClick={handleAddAccount} className='text-white ml-1  font-bold cursor-pointer'>Add New Account</button>
           </div>
          )}
   
           
           <div className='bg-white flex-1 w-full rounded-md mt-5'>
               <AccountTable
                 AccountsData={accounts}
               />
           </div>
   
         </div>
   
       </div>
  )
}
