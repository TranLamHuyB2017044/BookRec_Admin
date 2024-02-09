import React, { useState } from 'react'
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Avatar from '../../assets/hinhthe_tranlamhuy.jpg'
import { Badge, IconButton } from '@mui/material';
import { Logout } from '../../store/userReducer'
import { useDispatch } from 'react-redux';

export default function Navbar({onToggleSidebar}) {
    const [showSubNav, setShowSubNav] = useState(false)
    const dispatch = useDispatch()

    const SignOut = () => {
        dispatch(Logout())
        window.localStorage.removeItem('persist:root')
    }

    return ( 
        <div className='flex justify-between px-8 bg-white  h-[60px] shadow-custom bg-opacity-58'>
            <div className='flex items-center gap-16'>
                <div className='flex items-center gap-4'>
                    <img className='w-[35px]' src="https://bootstrapmade.com/demo/templates/NiceAdmin/assets/img/logo.png" alt="logo-img" />
                    <h1 className='text-5xl '>BookRec Admin</h1>
                </div>
                <button onClick={onToggleSidebar}>
                    <DensityMediumOutlinedIcon  fontSize='large' className='cursor-pointer'/>
                </button>
            </div>
            <div className='flex items-center gap-8'>
                <IconButton aria-label="cart" >
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsOutlinedIcon  fontSize='large'/>
                    </Badge>
                </IconButton>
                <img className='rounded-full w-[45px] h-[45px]' src={Avatar} alt="user-ava" />
                <button onClick={() => setShowSubNav(!showSubNav)} className='cursor-pointer relative'>Tran lam huy <ArrowDropDownIcon fontSize='large'/>
                    {showSubNav && <ul className='absolute top-[42px] border right-[0px] z-50 shadow-custom bg-opacity-58 bg-white  w-[250px]'>
                        <div className='flex items-center gap-4 py-3 pl-4    hover:bg-slate-200'><PersonOutlineOutlinedIcon fontSize='large'/> <p>My Profile</p></div>
                        <div onClick={SignOut} className='flex items-center gap-4 py-3 pl-4   border-t   hover:bg-slate-200'><LogoutOutlinedIcon fontSize='large'/> <p>Log out</p></div>
                    </ul>}
                </button>
            </div>
        </div>
  )
}
