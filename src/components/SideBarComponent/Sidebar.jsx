import React, { useState } from 'react'
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
export default function Sidebar({ toggle }) {
  const [active, setActive] = useState(0)
  const sideBarArray = [
    { id: 0, icon: <InventoryOutlinedIcon fontSize='large' />, text: 'Quản lý kho sách' },
    { id: 1, icon: <ManageAccountsOutlinedIcon fontSize='large' />, text: 'Quản lý khách hàng' },
    { id: 2, icon: <ReceiptLongOutlinedIcon fontSize='large' />, text: 'Quản lý đơn hàng' },
    { id: 3, icon: <SupportAgentOutlinedIcon fontSize='large' />, text: 'Phản hồi từ khách hàng' },
    { id: 4, icon: <BarChartOutlinedIcon fontSize='large' />, text: 'Thống kê doanh thu' },
  ]


  return (
    <div>
      <div className={`bg-white h-[170vh] transition-all ease-in-out duration-300 ${toggle ? ' ' : '-translate-x-full'}`}>
        <ul className='pt-16 flex flex-col gap-6'>
          {sideBarArray.map((item, index) => (
            <div key={item.id} onClick={() => setActive(index)} style={{ color: active === index ? 'dodgerblue' : '' }} className='flex items-center gap-4 ml-12 pt-5  cursor-pointer hover:text-[dodgerblue]'>
              {item.icon}
              <p className='text-3xl'>{item.text}</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
