import React  from 'react'
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { Link } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Avatar from '../../assets/hinhthe_tranlamhuy.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../store/userReducer';
export default function Sidebar({ toggle, active }) {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)

  const SignOut = () => {
    dispatch(Logout())
    window.localStorage.removeItem('persist:root')
  }
  
  const sideBarArray = [
    { id: 0, icon: <InventoryOutlinedIcon fontSize='large' />, text: 'Quản lý kho sách', route: '/' },
    { id: 1, icon: <ManageAccountsOutlinedIcon fontSize='large' />, text: 'Quản lý khách hàng', route: '/manageUsers' },
    { id: 2, icon: <ReceiptLongOutlinedIcon fontSize='large' />, text: 'Quản lý đơn hàng', route: '/manageOrders' },
    // { id: 3, icon: <SupportAgentOutlinedIcon fontSize='large' />, text: 'Phản hồi từ khách hàng', route: '/support' },
    { id: 3, icon: <BarChartOutlinedIcon fontSize='large' />, text: 'Thống kê doanh thu', route: '/statistic' },
  ]


  return (
    <div>
      <div className={ `bg-white fixed w-[300px] mt-[60px]  h-screen  transition-all ease-in-out duration-300 ${toggle ? ' ' : '-translate-x-full'} flex flex-col gap-96`}>
        <ul className='pt-16 flex flex-col gap-6'>
          {sideBarArray.map((item, index) => (
            <Link to={item.route}   key={item.id} style={{ color: active === index ? 'dodgerblue' : '' }} className='flex items-center gap-4 ml-12 pt-5  cursor-pointer hover:text-[dodgerblue]'>
              {item.icon}
              <p className='text-3xl'>{item.text}</p>
            </Link>
          ))}
        </ul>
        <div className='flex flex-col gap-12 ml-4'>
          <div className='flex items-center text-3xl gap-4 ml-12 cursor-pointer hover:text-[dodgerblue]'>
            <img className='rounded-full w-[45px] h-[45px]' src={Avatar} alt="user-ava" />
            <p>{user.fullname}</p>
          </div>
          <div className='flex items-center text-3xl gap-4 ml-16 cursor-pointer hover:text-[dodgerblue]'>
            <LogoutOutlinedIcon fontSize='large'/>
            <button onClick={SignOut}>Thoát</button>
          </div>
        </div>
      </div>
    </div>
  )
}
