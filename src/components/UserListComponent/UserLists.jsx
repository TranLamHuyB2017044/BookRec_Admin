import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { UserRequest } from '../../service/Request';

export default function UserLists({isSidebarOpen}) {
    const [userList, setUserList] = useState([])

    useEffect(() => {
        const getAllUser = async () => {
            const rs = await UserRequest.get('/user/')
            const NewuserList = rs.data
            setUserList(NewuserList.reverse())
        }
        getAllUser()
    }, [])

    const sortedUserList = userList.sort((a, b) => b.total_amount - a.total_amount);


    const columns = [
        {
            field: 'fullname', headerName: 'Tên khách hàng', width: 200, renderCell: (params) => {
                return (
                    <div>
                    {params.row.fullname}
                    </div>
                );
            },
        },
        {
            field: 'email', headerName: 'Email', width: 220, renderCell: (params) => {
                return (
                    <div>
                    {params.row.email}
                    </div>
                );
            },
        },
        {
            field: 'phone', headerName: 'Điện thoại', width: 180, renderCell: (params) => {
                return (
                    <div>
                    {params.row.phone}
                    </div>
                );
            },
        },
        {
            field: 'day_join', headerName: 'Ngày tham gia', width: 150, renderCell: (params) => {
                return (
                    <div>
                    {params.row.created_at.substring(0, params.row.created_at.indexOf('T'))}
                    </div>
                );
            },
        },
        {
            field: 'num_join', headerName: 'Số đơn hàng đã đặt', width: 170, renderCell: (params) => {
                return (
                    <div>
                    {params.row.num_orders} đơn hàng
                    </div>
                );
            },
        },
        {
            field: 'total_amount', headerName: 'Số tiền đã mua (vnđ)', width: 170, renderCell: (params) => {
                return (
                    <div>
                    {params.row.total_amount > 0 ? parseInt(params.row.total_amount).toLocaleString() : 0} 
                    </div>
                );
            },
        },

    ];

    return (
        <div>
            <div className={isSidebarOpen ? 'mt-20 px-32 w-fit' : 'mt-20 mx-auto px-32 w-fit'}>
                <DataGrid initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                    pageSizeOptions={[5]} getRowId={(row) => row.user_id} style={{ fontSize: '1.5rem' }} rows={sortedUserList} columns={columns} className='bg-white' />
            </div>
        </div>
    )
}
