import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/NavbarComponent/Navbar'
import Sidebar from '../../components/SideBarComponent/Sidebar'
import Footer from '../../components/FooterComponent/Footer'

export default function CheckForm() {
    const [bookTitle, setBookTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)
    const existBook = true
    const navigate = useNavigate()

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const active = 0
    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleCheckBookExists = (e) => {
        e.preventDefault();
        try {
            if (bookTitle === '') {
                setErrorMessage(true)
            } else {
                console.log(bookTitle)
                setErrorMessage(false)
                if (existBook === true) {
                    navigate('/create/exist/3304875')
                } else {
                    navigate('/create')
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className=''>
            <Navbar onToggleSidebar={handleToggleSidebar} />
            <div className='grid grid-cols-5 '>
                <div className={`col-span-1 `}>
                    <Sidebar toggle={isSidebarOpen} active={active} />
                </div>
                <div className={`col-span-4 transition-all ease-in-out duration-300  flex flex-col justify-between ${isSidebarOpen ? ' ' : '-translate-x-[300px] mx-auto w-[98vw]'}`}>
                    <div className=' mt-[60px] mb-[22rem]'>
                        <h1 className='font-semibold text-5xl ml-16 my-5 '>Nhập sách tồn kho</h1>
                        <div className='border border-black bg-white  flex flex-col gap-4  mx-auto w-fit h-fit mt-36 p-6  rounded-lg shadow-md'>
                            <h2 className='font-semibold text-3xl mb-5 text-center'>Nhập tên sách để kiểm tra</h2>
                            <form>
                                <div className='form-group  flex gap-5  my-6'>
                                    <label className='mt-2' htmlFor="title">Nhập tên sách</label>
                                    <div className=''>
                                        <input
                                            className='w-[250px] rounded-md h-[35px] pl-2 border border-black'
                                            type="text"
                                            id='title'
                                            onChange={(e) => setBookTitle(e.target.value)}
                                        />
                                        {errorMessage && <p className='text-red-500 mt-2 text-xl'>Vui lòng nhập tên sách</p>}
                                    </div>
                                </div>
                                <div className='flex gap-8 justify-center mt-8'>
                                    <button
                                        type='submit'
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                                        onClick={handleCheckBookExists}
                                    >
                                        Kiểm tra
                                    </button>
                                    <Link to='/'
                                        
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                                    >
                                        Thoát
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='h-[80px]'><Footer /></div>
                </div>
            </div>
        </div>
    )
}
