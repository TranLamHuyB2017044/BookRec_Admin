import React, { useEffect, useState } from 'react'
import { DateTimePicker  } from '@mui/x-date-pickers/DateTimePicker';
import { Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PublicRequest } from '../../service/Request';
import dayjs from 'dayjs';
export default function CreateDiscount() {

  const [isTypeChecked, setIsTypeChecked] = useState();
  const [isSelectBooksPromotion, setIsSelectBooksPromotion] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [dateTimeStartValue, setDateTimeStartValue] = useState(null);
  const [dateTimeEndValue, setDateTimeEndValue] = useState(null);

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
        setIsSelectBooksPromotion(queryBook.data)

      } else {
        setIsSelectBooksPromotion([])
      }
    }
    getBookList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery])


  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  }


  const typePromotion = [
    { id: 0, title: 'Theo phần trăm', label: 'percent' },
    { id: 1, title: 'Theo giá tiền', label: 'price' },
  ];

  const [isApplyForChecked, setIsApplyForChecked] = useState();

  const ApplyForPromotion = [
    { id: 0, title: 'Tất cả sách', label: 'all_books' },
    { id: 1, title: 'Sách', label: 'books' },
    { id: 2, title: 'Theo danh mục sách', label: 'book_category' },
  ];

  const handleApplyForChecked = (id) => {
    setIsApplyForChecked(id)
    if (id === 1) {
      handleOpenModal()
    }
  }

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false)
    setQuery('')
    setDebouncedQuery('')
  };


  console.log((dayjs(dateTimeStartValue).format('YYYY-MM-DD HH:mm:ss')));




  return (
    <div className='px-[8rem]  items-start flex gap-24 mt-20'>
      <div className='basis-2/3 flex flex-col gap-8'>

        <section className='bg-white p-8  rounded-md flex flex-col gap-8'>
          <p className='font-bold'>Tên chương trình khuyến mãi</p>
          <input type="text" placeholder='vd: KWMQSaSS' className='px-2 py-3 focus:outline-[dodgerblue] border' />
        </section>

        <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
          <p className='font-bold'>Loại khuyến mãi</p>
          {typePromotion.map((promotion) =>
            <div key={promotion.id} className='flex gap-4'>
              <input checked={promotion.id === isTypeChecked} onChange={() => setIsTypeChecked(promotion.id)} type="radio" name="" id={promotion.label} />
              <label htmlFor={promotion.label}>{promotion.title}</label>
            </div>
          )}
          {/* <div className='flex gap-4'>
            <input type="radio" name="" id="shipping" />
            <label htmlFor="shipping">Đồng giá</label>
          </div> */}
        </section>

        <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
          <p className='font-bold'>Giá trị</p>
          <div className='flex gap-2 flex-col w-[30%]'>
            <label htmlFor="discount_value">Giá trị khuyến mãi</label>
            <input type="number" name="" id="discount_value" className='border focus:outline-[dodgerblue] p-2 placeholder-right' placeholder='%' />
          </div>


        </section>

        <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
          <p className='font-bold'>Áp dụng cho</p>
          {ApplyForPromotion.map((ApplyPromotion) =>
            <div key={ApplyPromotion.id} className='flex gap-4'>
              <input checked={ApplyPromotion.id === isApplyForChecked} onChange={() => handleApplyForChecked(ApplyPromotion.id)} type="radio" name="" id={ApplyPromotion.label} />
              <label htmlFor={ApplyPromotion.label}>{ApplyPromotion.title}</label>
            </div>)}

          <Modal
            open={openModal}
            onClose={handleCloseModal}
          >
            <div className='absolute top-[50%] left-[50%] w-[500px] h-[500px] bg-white px-4 rounded-md transform -translate-x-[50%] -translate-y-[50%] flex flex-col justify-between'>
              <div className='relative flex items-center gap-2  justify-center h-[50px] border-b py-16'>
                <div className='absolute left-36 ml-2 top-11 text-[dodgerblue]'>
                  <SearchIcon fontSize='large' />
                </div>
                <input onChange={handleChangeQuery} value={query || ''} className='rounded-md border-[1px] border-gray-400 py-1 h-[33px] pl-12 w-[300px] outline-[dodgerblue]' type="text" placeholder='Tìm kiếm theo tên sách' />
              </div>
              <div className=' mt-5  py-5 overflow-y-auto'>
                {isSelectBooksPromotion.map((book) =>
                  <div key={book.book_id} className='flex items-center gap-4 mt-4  cursor-pointer '>
                    <input type="checkbox" className='w-[30px] h-[15px]' />
                    <img className='w-[80px] h-[80px] mr-5' src={book.thumbnail_url} alt={`book_cover_${book.book_id}`} />
                    <p className='basis-2/4'>{book.title}</p>
                    <p className='basis-1/4'>{book.original_price} vnđ</p>
                  </div>
                )}

              </div>
              <section className='flex justify-end items-center gap-4 border-t py-10'>
                <button onClick={handleCloseModal} className='px-10 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded-md'>hủy</button>
                <button className='bg-[dodgerblue] hover:bg-[#80bdfa] py-2 px-10 text-white rounded-md'>Lưu</button>
              </section>
            </div>
          </Modal>
          {isApplyForChecked === 2 && <input type="text" className='w-[50%] h-[35px] px-2 border outline-[dodgerblue]' placeholder='Nhập tên danh mục' />}
        </section>
        <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
          <div className='flex flex-col '>
              <label htmlFor="start_date" className='mb-5 font-bold'>Thời điểm bắt đầu</label>
              <DateTimePicker  value={dateTimeStartValue} defaultValue={dateTimeStartValue} onChange={(newValue) => setDateTimeStartValue(newValue)} label="MM/DD/YYYY hh:mm:aa" name='start_date' className='h-[40px] w-[40%]' sx={{fontSize: '20px'}}/>

          </div>
          <div className='mt-5'></div>
          <div className='flex flex-col '>
              <label htmlFor="end_date" className='mb-5 font-bold'>Thời điểm kết thúc</label>
              <DateTimePicker  value={dateTimeEndValue} defaultValue={dateTimeEndValue} onChange={(newValue) => setDateTimeEndValue(newValue)} label="MM/DD/YYYY hh:mm:aa" name='end_date' className='h-[80px] w-[40%] ' />

          </div>
        </section>
        <section className='flex justify-end items-center gap-4 mb-12'>
          <button className='px-10 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded-md'>hủy</button>
          <button className='bg-[dodgerblue] hover:bg-[#80bdfa] py-2 px-10 text-white rounded-md'>Lưu</button>
        </section>
      </div>
      <div className='bg-white p-8 basis-1/3 rounded-md mr-20'>
        <h3>Tổng quan mã khuyến mãi</h3>
        <p>ABCDEXZ</p>
      </div>
    </div>
  )
}
