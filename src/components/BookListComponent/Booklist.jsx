import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import SearchIcon from '@mui/icons-material/Search';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { DataGrid } from '@mui/x-data-grid';

export default function Booklist() {
    const rows = [
        { id: 1, 'Mã sách': '12345', 'Tên sách': 'Dont make me thing', 'Giá bán': '120.000', 'Giá vốn': '100.000','Tồn kho': '1020',},
        { id: 2, 'Mã sách': '12345', 'Tên sách': 'Dont make me thing', 'Giá bán': '120.000', 'Giá vốn': '100.000','Tồn kho': '1020',},
        { id: 3, 'Mã sách': '12345', 'Tên sách': 'Dont make me thing', 'Giá bán': '120.000', 'Giá vốn': '100.000','Tồn kho': '1020',},
        { id: 4, 'Mã sách': '12345', 'Tên sách': 'Dont make me thing', 'Giá bán': '120.000', 'Giá vốn': '100.000','Tồn kho': '1020',},
        { id: 5, 'Mã sách': '12345', 'Tên sách': 'Dont make me thing', 'Giá bán': '120.000', 'Giá vốn': '100.000','Tồn kho': '1020',},
        { id: 6, 'Mã sách': '12345', 'Tên sách': 'Dont make me thing', 'Giá bán': '120.000', 'Giá vốn': '100.000','Tồn kho': '1020',},
        
      ];

      const columns = [
        { field: 'Mã sách', headerName: 'Mã sách', width: 200 },
        { field: 'Tên sách', headerName: 'Tên sách', width: 550 },
        { field: 'Giá bán', headerName: 'Giá bán', width: 100 },
        { field: 'Giá vốn', headerName: 'Giá vốn', width: 100 },
        { field: 'Tồn kho', headerName: 'Tồn kho', width: 100 },
        { field: 'Chỉnh sửa', headerName: '', width: 100 ,renderCell: (params) => {
            return (
              <div className='text-[dodgerblue] cursor-pointer'>
                <p><EditNoteOutlinedIcon fontSize='large'/></p>
              </div>
            );
          },},
      ];
    return (
        <div>
            <div className='flex items-center justify-between px-40 mt-10'>
                <div className='flex gap-4'>
                    <button className='active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md border border-white bg-[dodgerblue] text-white flex items-center w-[100px] gap-2 justify-center'><AddIcon/>  Thêm</button>
                    <button className='active:translate-y-1 px-4 py-2 rounded-md border border-white bg-[dodgerblue] hover:bg-gradient-to-r from-blue-500 to-cyan-400  text-white flex items-center w-[100px] gap-2 justify-center'><PrintIcon/> In</button>
                </div>
                <div className='flex items-center gap-2'>
                    <input className='rounded-md border-[1px] border-gray-400 py-1 h-[33px] px-2 w-[300px]' type="text" placeholder='Tìm kiếm theo tên sách' />
                    <button className='active:translate-y-1 px-4 py-2 rounded-md border border-white bg-[dodgerblue] hover:bg-gradient-to-r from-blue-500 to-cyan-400 text-white flex items-center w-[110px] gap-2 justify-center'><SearchIcon/>Tìm kiếm</button>
                </div>
            </div>
            <div style={{ height: 440, width: '100%' }} className=' mt-12 px-16 '>
                <DataGrid  style={{fontSize: '1.5rem'}} rows={rows} columns={columns} className='bg-white'/>
            </div>
        </div>
    )
}
