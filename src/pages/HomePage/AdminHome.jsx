import React, { useState } from 'react'
import Navbar from '../../components/NavbarComponent/Navbar'
import Sidebar from '../../components/SideBarComponent/Sidebar'
import Footer from '../../components/FooterComponent/Footer'
import Booklist from '../../components/BookListComponent/Booklist'

export default function AdminHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className=''>
      <Navbar onToggleSidebar={handleToggleSidebar}/>
      <div className='grid grid-cols-5 h-fit'>
        <div className={`col-span-1 `}>
          <Sidebar toggle={isSidebarOpen}/>
        </div>
        <div className={`col-span-4 transition-all ease-in-out duration-300  flex flex-col justify-between ${isSidebarOpen ? ' ' : '-translate-x-[300px] mx-auto w-[98vw]'}`}>
          <div className='h-fit'>
            <h1 className='font-semibold text-5xl ml-16 my-5'>Kiểm kho</h1>
            <Booklist isSidebarOpen={isSidebarOpen}/>
          </div>
          <div className='h-[80px]'><Footer/></div>
        </div>
      </div>
    </div>
  )
}
