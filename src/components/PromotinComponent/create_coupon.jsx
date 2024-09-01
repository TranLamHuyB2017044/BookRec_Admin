import React, { useEffect, useState } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PublicRequest, UserRequest } from '../../service/Request';
import dayjs from 'dayjs';
import Alert from '../AlertComponent/Alert'
export default function CreateCoupon({ setTypeDiscount }) {

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [dateTimeStartValue, setDateTimeStartValue] = useState(null);
  const [dateTimeEndValue, setDateTimeEndValue] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([])
  const [userList, setUserList] = useState([])
  const [couponName, setCouponName] = useState('');
  const [couponValue, setCouponValue] = useState(0);
  const [typeChecked, setTypeChecked] = useState()
  const [applyingCondition, setApplyingCondition] = useState(0)

  const typeCoupon = [
    { id: 1, title: "Theo phần trăm", label: "percent" },
    { id: 2, title: "Miễn phí vẫn chuyển", label: "free_shipping" },
  ]

  const [applyingUser, setApplyingUser] = useState()
  const isApplyingUser = [
    { id: 1, title: "Tất cả", label: "all user" },
    { id: 2, title: "Khách hàng", label: "users" },
  ]

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  useEffect(() => {
    const getUserList = async () => {
      if (debouncedQuery !== '') {
        const queryUser = await PublicRequest.post(`/user?fullname=${query}`)
        setUserList(queryUser.data)

      } else {
        setUserList([])
      }
    }
    getUserList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery])


  const handleApplyForChecked = (id) => {
    setApplyingUser(id)
    if (id === 2) {
      handleOpenModal()
    }
  }


  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false)
    setQuery('')
    setDebouncedQuery('')
    setSelectedUsers([]);
  };
  const handleSaveAndCloseModal = () => {
    setOpenModal(false)
    setQuery('')
    setDebouncedQuery('')
  };

  const handleGetIdUserSelected = (userId) => {
    setSelectedUsers((prevSelectedusers) => {
      if (prevSelectedusers.includes(userId)) {
        return prevSelectedusers.filter(id => id !== userId);
      } else {
        return [...prevSelectedusers, userId];
      }
    });
  };

  console.log(userList);
  const handleCreateUserCoupon = async (e) => {
    e.preventDefault()
    if (!couponName ||  !timeStart || !timeEnd) {
      Alert.Alert('info', 'Hãy điền đủ các giá trị !');
      return;
    }
    const couponType = typeChecked === 1 ? 'Theo phần trăm' : 'Miễn phí vận chuyển'
    const data = {
      coupon_percent: couponValue,
      date_start: timeStart,
      date_end: timeEnd,
      coupon_name: couponName,
      applying_condition: applyingCondition,
      user_ids: selectedUsers,
      coupon_type: couponType
    }
    try {
      const response_createCoupon = await UserRequest.post('coupon/', data);
      if (response_createCoupon.status === 200) {
        Alert.Alert('success', response_createCoupon.data.message)
        setTypeDiscount()
      } else if (response_createCoupon.status === 201) {
        Alert.Alert('info', response_createCoupon.data.message)
      }
    } catch (error) {
      Alert.Alert('error', error.data.message)

      console.log(error)
    }
  }

  const timeStart = dayjs(dateTimeStartValue).format('YYYY-MM-DD HH:mm:ss')
  const timeEnd = dayjs(dateTimeEndValue).format('YYYY-MM-DD HH:mm:ss')

  return (
    <div className='px-[8rem]  items-start flex gap-24 mt-20'>
      <div className='basis-2/3 flex flex-col gap-8'>
        <form action="#" onSubmit={handleCreateUserCoupon}>
          <section className='bg-white p-8  rounded-md flex flex-col gap-8'>
            <div className='flex justify-between'>
              <p className='font-bold'>Mã khuyến mãi</p>
            </div>
            <input onChange={(e) => setCouponName(e.target.value)} type="text" placeholder='vd: KWMQSaSS' className='px-2 py-3 focus:outline-[dodgerblue] border' />
            <p className='-mt-5 text-gray-500'>Khách hàng sẽ nhập mã này ở màn hình thanh toán</p>
          </section>

          <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
            <p className='font-bold'>Loại khuyến mãi</p>
            {typeCoupon.map((type) =>
              <div key={type.id} className='flex gap-4'>
                <input type="radio" checked={type.id === typeChecked} onChange={() => setTypeChecked(type.id)} name="" id={type.label} />
                <label htmlFor={type.label}>{type.title}</label>
              </div>
            )}
          </section>

          <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
            <p className='font-bold'>Giá trị</p>
            <div className='flex gap-2 flex-col basis-1/2 w-[30%]'>
              <label htmlFor="discount_value">Giá trị khuyến mãi</label>
              {typeChecked === 2 ? <input type="number" value={0} disabled /> : <input onChange={(e) => setCouponValue(e.target.value)} type="number" name="" id="discount_value" className='border focus:outline-[dodgerblue] p-2 placeholder-right' placeholder='%' />}
            </div>
          </section>

          <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
            <p className='font-bold'>Điều kiện áp dụng</p>
            <div className='flex gap-2 flex-col'>
              <label htmlFor="applying_condition">Giá trị tối thiểu để áp dụng</label>
              <input onChange={(e) => setApplyingCondition(e.target.value)} type="number" name="" id="applying_condition" className=' w-[30%] border focus:outline-[dodgerblue] p-2 placeholder-right' placeholder='%' />
            </div>
          </section>
          <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
            <p className='font-bold'>Nhóm khách hàng</p>
            {isApplyingUser.map((user) =>
              <div key={user.id} className='flex gap-4'>
                <input type="radio" name="" id={user.label} checked={user.id === applyingUser} onChange={() => handleApplyForChecked(user.id)} />
                <label htmlFor={user.label}>{user.title}</label>
              </div>
            )}
            <Modal
              open={openModal}
              onClose={handleCloseModal}
            >
              <div className='absolute top-[50%] left-[50%] w-[550px] h-[500px] bg-white px-4 rounded-md transform -translate-x-[50%] -translate-y-[50%] flex flex-col justify-between'>
                <div className='relative flex items-center gap-2  justify-center h-[50px] border-b py-16'>
                  <div className='absolute left-48 ml-2 top-11 text-[dodgerblue]'>
                    <SearchIcon fontSize='large' />
                  </div>
                  <input onChange={(e) => setQuery(e.target.value)} value={query || ''} className='rounded-md border-[1px] border-gray-400 py-1 h-[33px] pl-12 w-[300px] outline-[dodgerblue]' type="text" placeholder='Tìm kiếm theo tên khách hàng' />
                </div>
                <div className=' mt-5  py-5 overflow-y-auto'>
                  {userList.map((user) =>
                    <div key={user.user_id} className='flex items-center gap-4 mt-8  cursor-pointer '>
                      <input onChange={() => handleGetIdUserSelected(user.user_id)}
                        checked={selectedUsers.includes(user.user_id)} type="checkbox" className='w-[30px] h-[15px]' />
                      <img className='w-[80px] h-[80px] mr-5' src={user.user_ava} alt={`user_ava_${user.user_id}`} />
                      <p className='mx-8'>{user.fullname}</p>
                      <p>{user.email}</p>
                    </div>
                  )}

                </div>
                <section className='flex justify-end items-center gap-4 border-t py-10'>
                  <button onClick={handleCloseModal} className='px-10 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded-md'>hủy</button>
                  <button onClick={handleSaveAndCloseModal} className='bg-[dodgerblue] hover:bg-[#80bdfa] py-2 px-10 text-white rounded-md'>Lưu</button>
                </section>
              </div>
            </Modal>
          </section>
          <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
            <div className='flex flex-col '>
              <label htmlFor="start_date" className='mb-5 font-bold'>Thời điểm bắt đầu</label>
              <DateTimePicker value={dateTimeStartValue} defaultValue={dateTimeStartValue} onChange={(newValue) => setDateTimeStartValue(newValue)} label="MM/DD/YYYY hh:mm:aa" name='start_date' className='h-[40px] w-[40%]' sx={{ fontSize: '20px' }} />

            </div>
            <div className='mt-5'></div>
            <div className='flex flex-col '>
              <label htmlFor="end_date" className='mb-5 font-bold'>Thời điểm kết thúc</label>
              <DateTimePicker value={dateTimeEndValue} defaultValue={dateTimeEndValue} onChange={(newValue) => setDateTimeEndValue(newValue)} label="MM/DD/YYYY hh:mm:aa" name='end_date' className='h-[80px] w-[40%] ' />

            </div>
          </section>
          <section className='flex justify-end items-center gap-4 mb-12'>
            <button type='button' className='px-10 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded-md'>hủy</button>
            <button type='submit' className='bg-[dodgerblue] hover:bg-[#80bdfa] py-2 px-10 text-white rounded-md'>Lưu</button>
          </section>
        </form>
      </div>
      <div className='bg-white p-8 basis-1/3 rounded-md mr-20'>
        <h3>Tổng quan mã khuyến mãi</h3>
        <p>ABCDEXZ</p>
      </div>
    </div>
  )
}
