import React, { useState } from 'react'
import Navbar from '../../components/NavbarComponent/Navbar'
import Sidebar from '../../components/SideBarComponent/Sidebar'
import Footer from '../../components/FooterComponent/Footer'
import UserLists from '../../components/UserListComponent/UserLists'

export default function UserList() {
    const active = 1
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const handleToggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <div>
      <Navbar onToggleSidebar={handleToggleSidebar}/>
      <div className='grid grid-cols-5 '>
        <div className={`col-span-1 `}>
          <Sidebar toggle={isSidebarOpen} active={active}/>
        </div>
        <div className={`col-span-4 transition-all ease-in-out duration-300  flex flex-col justify-between ${isSidebarOpen ? ' ' : '-translate-x-[300px] mx-auto w-[98vw]'}`}>
          <div className=' mt-[60px] mb-24'>
            <h1 className='font-semibold text-5xl ml-16 mt-12'>Quản lý tài khoản</h1>
            <UserLists/>
          </div>
          <div className='h-[80px]'><Footer/></div>
        </div>
      </div>
    </div>
  )
}
