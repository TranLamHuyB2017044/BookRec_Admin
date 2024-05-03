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


    const columns = [
        {
            field: 'UserId', headerName: 'Mã Khách hàng', width: 150, renderCell: (params) => {
                return (
                    <div >
                    {params.row.user_id}
                    </div>
                );
            },
        },
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
                    pageSizeOptions={[5]} getRowId={(row) => row.user_id} style={{ fontSize: '1.5rem' }} rows={userList} columns={columns} className='bg-white' />
            </div>
        </div>
    )
}
