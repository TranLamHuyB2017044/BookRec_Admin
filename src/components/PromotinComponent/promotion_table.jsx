
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { UserRequest } from '../../service/Request.js'
import dayjs from 'dayjs';
import myAlert from '../AlertComponent/Alert.js'
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
export default function PromotionTable({ isSidebarOpen }) {
    const [promotionsRows, setPromotionRows] = useState([])
    const user = useSelector(state => state.currentUser)


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
            field: 'Tên khuyến mãi', headerName: 'Tên khuyến mãi', width: isSidebarOpen ? 500 : 450, renderCell: (params) => {
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
            field: 'Chỉnh sửa', headerName: 'Chỉnh sửa', width: isSidebarOpen ? 300 : 170, renderCell: (params) => {
                return (
                    <select id="edit" onChange={(e) => handleUpdateStatusById(e, params.row.promotion_id)} className='px-2 py-3 rounded-md'>
                        <option defaultChecked >Chỉnh sửa</option>
                        <option value="isApplying">Đang áp dụng</option>
                        <option value="stopApplying">Ngừng áp dụng</option>
                    </select>
                );
            },
        },

    ];


    const handleUpdateStatusById = (e, promotion_id) => {
        promotionsRows.map((promotion_item) => {
            const update_status = e.target.value;
            if (update_status === 'Chỉnh sửa') {
                return false
            }
            const convert_status = update_status === 'isApplying' ? 'đang áp dụng' : 'ngừng áp dụng'
            const convert_status_to_uppercase = update_status === 'isApplying' ? 'Đang áp dụng' : 'Ngừng áp dụng'
            const convert_status_to_update = update_status === 'isApplying' ? 'Đang áp dụng' : 'Ngừng áp dụng'
            if (promotion_id === promotion_item.promotion_id) {
                myAlert.Confirm(convert_status_to_uppercase, 'question', 'Xác nhận ' + convert_status + ' cho khuyến mãi này ?', 'Có', 'Thoát')
                    .then(async (result) => {
                        if (result.value) {
                            const { value: password } = await Swal.fire({
                                title: "Vui lòng nhập password của bạn để xác nhận " + convert_status,
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
                                    await UserRequest.put(`/promotion/${promotion_id}`, { promotion_id, promotion_status: convert_status_to_update })
                                    myAlert.Alert('success', 'Cập nhật trạng thái promotion thành công')
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 2000)
                                } else {
                                    Swal.fire(`Sai mật khẩu`);
                                }
                            }

                        }
                    })
                    .catch(error => {
                        const errorMessage = error.response?.data || "An error occurred.";
                        myAlert.Alert("error", errorMessage);
                    });


            }
        })
    }


    return (
        <div className='bg-[#e3e7f1] mb-[25rem]'>
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

