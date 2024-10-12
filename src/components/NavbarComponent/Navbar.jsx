import React, { useState } from 'react'
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Logout } from '../../store/userReducer'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Navbar({ onToggleSidebar }) {
    const [showSubNav, setShowSubNav] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.currentUser)
    const SignOut = () => {
        dispatch(Logout())
        window.localStorage.removeItem('persist:root')
    }

    return (
        <div className='fixed z-50  w-screen flex justify-between px-8 bg-white  h-[60px] shadow-custom bg-opacity-58'>
            <div className='flex items-center gap-16'>
                <Link to='/' className='flex items-center gap-4'>
                    <img className='w-[35px]' src="https://bootstrapmade.com/demo/templates/NiceAdmin/assets/img/logo.png" alt="logo-img" />
                    <h1 className='text-5xl '>BookRec Admin</h1>
                </Link>
                <button onClick={onToggleSidebar}>
                    <DensityMediumOutlinedIcon fontSize='large' className='cursor-pointer' />
                </button>
            </div>
            <div className='flex items-center gap-8'>

                <img className='rounded-full w-[45px] h-[45px]' src={user.user_ava} alt="user-ava" />
                <button onClick={() => setShowSubNav(!showSubNav)} className='cursor-pointer relative'>{user.fullname} <ArrowDropDownIcon fontSize='large' />
                    {showSubNav && <ul className='absolute top-[42px] border right-[0px] z-50 shadow-custom bg-opacity-58 bg-white  w-[250px]'>
                        {/* <div className='flex items-center gap-4 py-3 pl-4    hover:bg-slate-200'><PersonOutlineOutlinedIcon fontSize='large'/> <p>Thông tin tài khoản</p></div> */}
                        <div onClick={SignOut} className='flex items-center gap-4 py-3 pl-4   border-t   hover:bg-slate-200'><LogoutOutlinedIcon fontSize='large' /> <p>Thoát</p></div>
                    </ul>}
                </button>
            </div>
        </div>
    )
}
