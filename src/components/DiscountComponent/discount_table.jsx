
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';

export default function DiscountTable({ isSidebarOpen }) {

    const columns = [

        {
            field: 'Chi tiết', headerName: 'Chi tiết', width: isSidebarOpen ? 350 : 700, renderCell: (params) => {
                return (
                    <div>
                        <p className='text-[dodgerblue] text-[16px]'>{params.row.detail.title}</p>
                        <p >{params.row.detail.desc}</p>
                    </div>
                );
            },
        },
        {
            field: 'Trạng thái', headerName: 'Trạng thái', width: 130, renderCell: (params) => {
                return (
                    <div>
                        <p>{params.row.status}</p>
                    </div>
                );
            },
        },
        {
            field: 'Đã dùng', headerName: 'Đã dùng', width: 100, renderCell: (params) => {
                return (
                    <div>
                        <p>{params.row.used}</p>
                    </div>
                );
            },
        },
        {
            field: 'Bắt đầu', headerName: 'Bắt đầu', width: 130, renderCell: (params) => {
                return (
                    <div>
                        <p>{params.row.start}</p>
                    </div>
                );
            },
        },
        {
            field: 'Kết thúc', headerName: 'Kết thúc', width: 130, renderCell: (params) => {
                return (
                    <div>
                        <p>{params.row.end}</p>
                    </div>
                );
            },
        },

    ];

    const rows = [
        {
            discount_id: 1,
            detail: {
                title: 'SAPO-MFKRT',
                desc: 'Giảm 20.000 cho toàn bộ sản phẩm + áp dụng cùng với CTKM'
            },
            status: 'Ngừng áp dụng',
            used: '1/1',
            start: '1/1/2024',
            end: '1/1/2024',
        },
        {
            discount_id: 2,
            detail: {
                title: 'SAPO-MFKRT',
                desc: 'Giảm 20.000 cho toàn bộ sản phẩm + áp dụng cùng với CTKM'
            },
            status: 'Ngừng áp dụng',
            used: '1/1',
            start: '1/1/2024',
            end: '1/1/2024',
        },
        {
            discount_id: 3,
            detail: {
                title: 'SAPO-MFKRT',
                desc: 'Giảm 20.000 cho toàn bộ sản phẩm + áp dụng cùng với CTKM'
            },
            status: 'Ngừng áp dụng',
            used: '1/1',
            start: '1/1/2024',
            end: '1/1/2024',
        },
        {
            discount_id: 4,
            detail: {
                title: 'SAPO-MFKRT',
                desc: 'Giảm 20.000 cho toàn bộ sản phẩm + áp dụng cùng với CTKM'
            },
            status: 'Ngừng áp dụng',
            used: '1/1',
            start: '1/1/2024',
            end: '1/1/2024',
        },
        {
            discount_id: 5,
            detail: {
                title: 'SAPO-MFKRT',
                desc: 'Giảm 20.000 cho toàn bộ sản phẩm + áp dụng cùng với CTKM'
            },
            status: 'Ngừng áp dụng',
            used: '1/1',
            start: '1/1/2024',
            end: '1/1/2024',
        },
        {
            discount_id: 6,
            detail: {
                title: 'SAPO-MFKRT',
                desc: 'Giảm 20.000 cho toàn bộ sản phẩm + áp dụng cùng với CTKM'
            },
            status: 'Ngừng áp dụng',
            used: '1/1',
            start: '1/1/2024',
            end: '1/1/2024',
        },
        {
            discount_id: 7,
            detail: {
                title: 'SAPO-MFKRT',
                desc: 'Giảm 20.000 cho toàn bộ sản phẩm + áp dụng cùng với CTKM'
            },
            status: 'Ngừng áp dụng',
            used: '1/1',
            start: '1/1/2024',
            end: '1/1/2024',
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
                checkboxSelection
                loading={rows.length === 0}
                pageSizeOptions={[50]} 
                getRowId={(row) => row.discount_id} 
                style={{ fontSize: '1.5rem' }} rows={rows} columns={columns} className='bg-white' />
            </div>

        </div>
    );
}

