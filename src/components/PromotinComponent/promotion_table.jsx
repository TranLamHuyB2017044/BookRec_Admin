
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from 'react';
import { UserRequest } from '../../service/Request.js'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

export default function PromotionTable({ isSidebarOpen }) {
    const [promotionsRows, setPromotionRows] = useState([])


    useEffect(() => {
        const getPromotionList = async () => {
            try {
                const rs = await UserRequest.get('/promotion')
                setPromotionRows(rs.data)   
            } catch (error) {
                console.log(error)
            }
        }
        getPromotionList()
    }, [])


    const columns = [

        {
            field: 'Tên khuyến mãi', headerName: 'Tên khuyến mãi', width: isSidebarOpen ? 700 : 450, renderCell: (params) => {
                return (
                    <div>
                        <p className='text-[dodgerblue] text-[16px]'>{params.row.promotion_name}</p>
                        {/* <p >{params.row.detail.desc}</p> */}
                    </div>
                );
            },
        },
        {
            field: 'Trạng thái', headerName: 'Trạng thái', width: isSidebarOpen ? 200 : 130, renderCell: (params) => {
                return (
                    <div>
                        <p>{params.row.promotion_status}</p>
                    </div>
                );
            },
        },

        {
            field: 'Bắt đầu', headerName: 'Bắt đầu', width: isSidebarOpen ? 200 : 200, renderCell: (params) => {
                return (
                    <div>
                        <p>{dayjs(params.row.start_date).format('DD-MM-YYYY HH:mm:ss')}</p>
                    </div>
                );
            },
        },
        {
            field: 'Kết thúc', headerName: 'Kết thúc', width: isSidebarOpen ? 200 : 200, renderCell: (params) => {
                return (
                    <div>
                        <p>{dayjs(params.row.end_date).format('DD-MM-YYYY HH:mm:ss')}</p>
                    </div>
                );
            },
        },
        {
            field: 'Giá trị', headerName: 'Giá trị', width: isSidebarOpen ? 200 : 80, renderCell: (params) => {
                return (
                    <div>
                        <p>{params.row.promotion_percent}%</p>
                    </div>
                );
            },
        },
        {
            field: 'Chi tiết', headerName: 'Chi tiết', width: isSidebarOpen ? 200 : 80, renderCell: (params) => {
                return (
                    <Link to={(`/promotion/${params.row.promotion_id}`)}>
                        <InfoOutlinedIcon className='text-[dodgerblue] cursor-pointer' fontSize='large' />
                    </Link>
                );
            },
        },

    ];

   

    return (
        <div className='bg-[#e3e7f1] mb-[17rem]'>
            <div className='flex items-center gap-2 relative ml-16 mt-16' >
                <div className='absolute left-1 top-[3px] text-[dodgerblue]'>
                    <SearchIcon fontSize='large' />
                </div>
                <input className='rounded-md border-[1px] border-gray-400 py-1 h-[33px] pl-12 w-[300px]' type="text" placeholder='Tìm kiếm mã khuyến mãi' />
            </div>
            <div style={{ height: 440, width: '100%' }} className=' mt-12 px-16 '>
                <DataGrid initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 50,
                        },
                    },
                }}
                    loading={promotionsRows.length === 0}
                    pageSizeOptions={[50]}
                    getRowId={(row) => row.promotion_id}
                    style={{ fontSize: '1.5rem' }} rows={promotionsRows} columns={columns} className='bg-white' />
            </div>

        </div>
    );
}

