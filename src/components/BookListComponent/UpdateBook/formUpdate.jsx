import React, { useState } from 'react'
import UpdateBookForm from './UpdateBookForm'
import { Link } from 'react-router-dom'
import Sidebar from '../../SideBarComponent/Sidebar'
import Navbar from '../../NavbarComponent/Navbar'
import Footer from '../../FooterComponent/Footer'
import UpdateAuthorForm from './UpdateAuthorForm'
import UpdateImgForm from './UpdateImgForm'

export default function FormUpdate() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const [showForm, setShowForm] = useState(false)
    const [showBookInfo, setShowBookInfo] = useState(false)
    const [showAuthorInfo, setShowAuthorInfo] = useState(false)
    const [showImgInfo, setShowImgInfo] = useState(false)
    const handleShowFrom = (type) => {
        setShowForm(true)
        if (type === 'bookInfo') {
            setShowBookInfo(true)
            setShowAuthorInfo(false)
            setShowImgInfo(false)
        } else if (type === 'authorInfo') {
            setShowBookInfo(false)
            setShowAuthorInfo(true)
            setShowImgInfo(false)
        } else {
            setShowBookInfo(false)
            setShowAuthorInfo(false)
            setShowImgInfo(true)
        }
    }

    return (
        <div className=''>
            <Navbar onToggleSidebar={handleToggleSidebar} />
            <div className='grid grid-cols-5 h-fit'>
                <div className={`col-span-1 `}>
                    <Sidebar toggle={isSidebarOpen} />
                </div>
                <div className={`col-span-4 transition-all ease-in-out duration-300  flex flex-col justify-between ${isSidebarOpen ? ' ' : '-translate-x-[300px] mx-auto w-[98vw]'}`}>
                    <div className='h-fit'>
                        <h1 className='font-semibold text-5xl ml-16 my-5'>Kiểm kho</h1>
                        <div className='flex flex-col justify-center items-center'>
                            {showForm === false ? (<>
                                <h2 className='text-center text-5xl'>Chỉnh sửa sách</h2>
                                <p className='text-center my-5 '>Chọn một trong các thông tin mà bạn muốn chỉnh sửa</p>
                                <div className='flex flex-wrap justify-center gap-8 mt-12'>
                                    <button onClick={() => handleShowFrom('bookInfo')} className='flex flex-col justify-center border px-12 border-[dodgerblue] bg-white cursor-pointer min-w-[300px]'>
                                        <p className='text-3xl font-semibold'>Chỉnh sửa thông tin về sách</p>
                                        <p>vd như: tên sách, giá bán, số lượng, ...</p>
                                    </button>
                                    <div>
                                        <button onClick={() => handleShowFrom('authorInfo')} className='border p-12 border-[dodgerblue] bg-white font-semibold text-3xl  min-w-[300px]'>Chỉnh sửa thông tin tác giả</button>
                                    </div>
                                    <div>
                                        <button onClick={() => handleShowFrom('ImgInfo')} className='border p-12 border-[dodgerblue] bg-white font-semibold text-3xl  min-w-[300px]'>Chỉnh sửa hình ảnh</button>
                                    </div>
                                </div>
                            </>)
                                :
                                <section>
                                    {showBookInfo && <UpdateBookForm setShowForm={() => setShowForm(false)} />}
                                    {showAuthorInfo && <UpdateAuthorForm setShowForm={() => setShowForm(false)}/>}
                                    {showImgInfo && <UpdateImgForm setShowForm={() => setShowForm(false)}/>}
                                </section>}
                            <Link to='/' style={{ display: showForm ? 'none' : 'block' }} className='mt-16 max-w-[100px] bg-[dodgerblue] hover:bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-10 py-2 rounded-md ' >Trở về</Link>
                        </div>
                    </div>
                    <div className='h-[80px]'><Footer /></div>
                </div>
            </div>
        </div>

    )
}
