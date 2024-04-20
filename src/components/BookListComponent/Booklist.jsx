import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
// import PrintIcon from '@mui/icons-material/Print';
import SearchIcon from '@mui/icons-material/Search';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { PublicRequest, UserRequest } from '../../service/Request'
import FormBook from './CreateBook/FormBook';
import MyAlert from '../../components/AlertComponent/Alert'
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { Link} from 'react-router-dom';


export default function Booklist({isSidebarOpen}) {
    const user = useSelector(state => state.currentUser)
    const [bookList, setBookList] = useState([])
    const [showToggle, setShowToggle] = useState(false)
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
            if (debouncedQuery !== '') {
                const queryBook = await PublicRequest.get(`/collection/books/all?title=${query}`)
                setBookList(queryBook.data)

            } else {
                const response = await PublicRequest.get(`/collection/books/all`)
                setBookList(response.data)
            }
        }
        getBookList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQuery])

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
            field: 'Tên sách', headerName: 'Tên sách', width: isSidebarOpen ? 550 : 800, renderCell: (params) => {
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
            field: 'Chỉnh sửa', headerName: 'Chỉnh sửa', width: 100, renderCell: (params) => {
                return (
                    <div className=' cursor-pointer flex gap-8'>
                        <Link to={(`/update/${params.row.book_id}`)} className='text-[dodgerblue]'><EditNoteOutlinedIcon fontSize='large' /></Link>
                        <button onClick={() => handleDeleteBook(params.row.book_id)} className='text-red-500'><DeleteOutlineOutlinedIcon fontSize='large' /></button>
                    </div>
                );
            },
        },
    ];

    const handleOutToogle = () => {
        setShowToggle(false)
        window.scrollTo(0, 0);
    }

    const handleDeleteBook = (id) => {
        MyAlert.Confirm('Xóa sách', 'question', 'Bạn có chắc là muốn xóa sách này không', 'Có', 'Thoát')
            .then(async (result) => {
                if (result.value) {
                    const { value: password } = await Swal.fire({
                        title: "Vui lòng nhập password của bạn để xóa",
                        input: "password",
                        inputLabel: "Password",
                        inputPlaceholder: "Enter your password",
                        inputAttributes: {
                            maxlength: "10",
                            autocapitalize: "off",
                            autocorrect: "off"
                        }
                    });
                    if (password) {
                        const response = await UserRequest.post('/user/login/admin', { email: user.email, password: password });
                        if (response.status === 200) {
                            const deleteBook = await UserRequest.delete(`/collection/${id}`)
                            if (deleteBook.status === 200) {
                                MyAlert.Alert('success', `${deleteBook.data.message}`);
                                setQuery('')
                            } else {
                                MyAlert.Alert('error', `${deleteBook.data.response}`);
                            }
                        } else {
                            Swal.fire(`Sai mật khẩu`);
                        }
                    }

                }
            })
            .catch(error => {
                const errorMessage = error.response?.data || "An error occurred.";
                MyAlert.Alert("error", errorMessage);
            });

    }

    const handleChangeQuery = (e) => {
        setQuery(e.target.value);
    }

    return (
        <div className='bg-[#e3e7f1] '>
            <div className='flex items-center justify-between px-40 mt-10'>
                <div className='flex gap-4'>
                    <button  onClick={() => setShowToggle(true)} 
                        className='active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md 
                        border border-white bg-[dodgerblue] text-white flex items-center w-[120px] gap-2 justify-center'
                    ><AddIcon />Nhập sách</button>
                </div>

                <div style={showToggle ? {display: 'none'} : {display: 'flex'}} className='flex items-center gap-2 relative' >
                    <div className='absolute left-1 top-[3px] text-[dodgerblue]'>
                        <SearchIcon fontSize='large' />
                    </div>
                    <input onChange={handleChangeQuery} value={query || ''} className='rounded-md border-[1px] border-gray-400 py-1 h-[33px] pl-12 w-[300px]' type="text" placeholder='Tìm kiếm theo tên sách' />
                </div>
            </div>
            {showToggle === true  ? (
                <FormBook  handleOutToogle={handleOutToogle} />
            ) :
                <div style={{ height: 440, width: '100%'}} className=' mt-12 px-16 '>
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

