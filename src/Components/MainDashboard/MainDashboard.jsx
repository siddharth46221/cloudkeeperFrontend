import React from 'react'
import { Header } from '../Header/Header'
import { Sidebar } from '../SideBar/Sidebar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'


export const Dashboard = () => {
     
  const [collapsed, setCollapsed] = useState(false);
    
  return (
    <div className="flex flex-col h-full w-full">
      <Header setCollapsed={setCollapsed}/>

      
      <div className="flex   w-full">
        <Sidebar collapsed={collapsed} />      
        <div className="flex-1  h-[calc(100vh-64px)] bg-gray-100 overflow-y-auto">
          <Outlet />    
        </div>
      </div>
    </div>
  )
}
