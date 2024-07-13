import React, { useEffect, useState } from 'react'
// import { BestSellerData } from '../../data'
import { UserRequest } from '../../service/Request'
export default function BestSeller({ isSidebarOpen }) {
    const [bestSellerBook, setBestSellerBook] = useState([])

    useEffect(() => {
        const getTopBestSellerBook = async () => {
            try {
                const rs = await UserRequest.get('/order/bestseller')
                setBestSellerBook(rs.data)
            } catch (error) {
                console.log(error.response.message)
            }
        }
        getTopBestSellerBook()
    }, [])

    const handleTotalPrice = (book) => {
        let totalPrice = 0
        totalPrice = book.original_price  * book.so_luong_ban
        return totalPrice
    }

    return (
        <div className={isSidebarOpen === false ? 'my-16 ml-16 p-16 bg-white w-max rounded-2xl px-[83px]' : 'my-12 ml-8 p-8 bg-white w-max rounded-2xl'}>
            <div className='flex items-center gap-2'>
                <h3 className='text-3xl text-blue-500'>Sách bán chạy |</h3>
                <p className='text-gray-500 text-2xl mt-1 opacity-80'>Trong tháng</p>
            </div>
            <div className='my-12'>
                <div className={isSidebarOpen === false ? 'grid grid-cols-9 my-16' : 'grid grid-cols-8 my-16'}>
                    <div className={isSidebarOpen === false ? 'col-span-2 mr-6' : 'col-span-1 mr-6'}>Hình ảnh</div>
                    <div className='col-span-4'>Tên Sách</div>
                    <div className='col-span-1'>Giá (vnđ)</div>
                    <div className='col-span-1'>Đã bán</div>
                    <div className='col-span-1'>Tổng (vnđ)</div>
                </div>
                {bestSellerBook.map((element) => (
                    <div className={isSidebarOpen === false ? 'grid grid-cols-9 mb-12' : 'grid grid-cols-8 mb-12'} key={element.book_id}>
                        <div className={isSidebarOpen === false ? 'col-span-2 mr-6 w-[80px] h-[80px] border-[2px] border-[dodgerblue]' : 'col-span-1 mr-6 w-[80px] h-[80px] border-[2px] border-[dodgerblue]'}>
                            <img src={element.thumbnail_url} className='h-full w-full' alt='cover-book' />
                        </div>
                        <div className='col-span-4  max-w-[300px]'>{element.title}</div>
                        <div className='col-span-1 '>{(element.original_price).toLocaleString()}</div>
                        <div className='col-span-1 '>{element.so_luong_ban}</div>
                        <div className='col-span-1 '>{(handleTotalPrice(element)).toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
