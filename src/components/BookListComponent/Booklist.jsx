import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import SearchIcon from '@mui/icons-material/Search';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { PublicRequest } from '../../service/Request'
export default function Booklist() {
    const [bookList, setBookList] = useState([])
    const [showToggle, setShowToggle] = useState(false)
    const [showMassages, setShowMassages] = useState(false)
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [query]);

    useEffect(() => {
        const getBookList = async () => {
            if(debouncedQuery !== ''){
                console.log(query)
                const queryBook = await PublicRequest.get(`/collection/books/all?title=${query}`)
                setBookList(queryBook.data)
                
            }else{
                const response = await PublicRequest.get(`/collection/books/all`)
                setBookList(response.data)
            }
        }
        getBookList()
    }, [debouncedQuery])

    console.log(bookList)
    const columns = [
        {
            field: 'Mã sách', headerName: 'Mã sách', width: 100, renderCell: (params) => {
                return (
                    <div >
                        <p>{params.row.book_id}</p>
                    </div>
                );
            },
        },
        {
            field: 'Tên sách', headerName: 'Tên sách', width: 550, renderCell: (params) => {
                return (
                    <div>
                        <p>{params.row.title}</p>
                    </div>
                );
            },
        },
        {
            field: 'Giá bán', headerName: 'Giá bán (vnd)', width: 130, renderCell: (params) => {
                return (
                    <div>
                        <p>{(params.row.discount === 0 ? params.row.original_price : params.row.original_price - (params.row.original_price * params.row.discount) / 100).toLocaleString()}</p>
                    </div>
                );
            },
        },
        {
            field: 'Giá vốn', headerName: 'Giá vốn (vnd)', width: 130, renderCell: (params) => {
                return (
                    <div>
                        <p>{(params.row.original_price * 0.5).toLocaleString()}</p>
                    </div>
                );
            },
        },
        {
            field: 'Tồn kho', headerName: 'Tồn kho', width: 100, renderCell: (params) => {
                return (
                    <div>
                        <p>{params.row.inStock}</p>
                    </div>
                );
            },
        },
        {
            field: 'Chỉnh sửa', headerName: '', width: 100, renderCell: (params) => {
                return (
                    <div className='text-[dodgerblue] cursor-pointer'>
                        <p><EditNoteOutlinedIcon fontSize='large' /></p>
                    </div>
                );
            },
        },
    ];

    const handleCheckExists = (e) => {
        e.preventDefault();
        setShowMassages(!showMassages)
    }


    const handleChangeQuery = (e) => {
        setQuery(e.target.value);
    }
    return (
        <div className='bg-[#e3e7f1]  '>

            <div className='flex items-center justify-between px-40 mt-10'>
                <div className='flex gap-4'>
                    <button onClick={() => setShowToggle(true)} className='active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md border border-white bg-[dodgerblue] text-white flex items-center w-[120px] gap-2 justify-center'><AddIcon />Nhập sách</button>
                    <button className='active:translate-y-1 px-4 py-2 rounded-md border border-white bg-[dodgerblue] hover:bg-gradient-to-r from-blue-500 to-cyan-400  text-white flex items-center w-[120px] gap-2 justify-center'><PrintIcon /> In</button>
                </div>
                
                <div className='flex items-center gap-2 relative'>
                    <div className='absolute left-1 text-[dodgerblue]'>
                        <SearchIcon fontSize='large'/>
                    </div>
                    <input onChange={handleChangeQuery} value={query} className='rounded-md border-[1px] border-gray-400 py-1 h-[33px] px-2 w-[300px]' type="text" placeholder='      Tìm kiếm theo tên sách' />
                    {/* <button className='active:translate-y-1 px-4 py-2 rounded-md border border-white bg-[dodgerblue] hover:bg-gradient-to-r from-blue-500 to-cyan-400 text-white flex items-center w-[110px] gap-2 justify-center'><SearchIcon />Tìm kiếm</button> */}
                </div>
            </div>
            {showToggle === true ?  (
                <div className='flex items-center justify-between px-40 mt-24'>
                    <div className="border border-black bg-white  flex flex-col gap-4  mx-auto w-[350px] h-fit p-6  rounded-lg shadow-md">
                        <label className="block mb-2 mx-auto text-3xl text-justify">
                            Nhập book_id để kiểm tra sách đã tồn tại trong kho hay chưa.
                        </label>
                        <form className="mt-8">
                            <input
                                type="number"
                                className="form-input my-1 block w-[250px] mx-auto pl-2 border rounded-md h-[30px] border-gray-800"
                            />
                            {showMassages ?  <p className='text-xl mt-2 '>Thông báo: sách đã tồn tại trong kho, tên sách là "Nhà giả kim", số lượng còn lại: 1000 </p> :  <p className='text-xl mt-2 '>Thông báo: Không tìm thấy sách vui lòng nhập sách mới</p>}
                            {showMassages ?  <p className='cursor-pointer text-[dodgerblue]'>Nhập thêm hàng</p> :<p className='cursor-pointer text-[dodgerblue]'>thêm sách mới</p>}
                            <div className='flex gap-8 justify-center mt-8'>
                                <button
                                    onClick={handleCheckExists}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                                >
                                    Kiểm tra
                                </button>
                                <button
                                    onClick={() => setShowToggle(false)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                                >
                                    Thoát
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ):
            <div style={{ height: 440, width: '100%' }} className=' mt-12 px-16 '>
                <DataGrid initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 50,
                        },
                    },
                }}
                    pageSizeOptions={[50]} getRowId={(row) => row.book_id} style={{ fontSize: '1.5rem' }} rows={bookList} columns={columns} className='bg-white' />
            </div>
            }
            
        </div>
    );
}

