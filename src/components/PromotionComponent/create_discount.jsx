import React, { useEffect, useState } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PublicRequest, UserRequest } from '../../service/Request';
import dayjs from 'dayjs';
import Alert from '../AlertComponent/Alert'
export default function CreateDiscount({ setTypeDiscount }) {

  const [isSelectBooksPromotion, setIsSelectBooksPromotion] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [dateTimeStartValue, setDateTimeStartValue] = useState(null);
  const [dateTimeEndValue, setDateTimeEndValue] = useState(null);
  const [promotionName, setPromotionName] = useState('');
  const [promotionValue, setPromotionValue] = useState(0);
  const [category, setCategory] = useState('');
  const [isApplyForChecked, setIsApplyForChecked] = useState();
  const [selectedBooks, setSelectedBooks] = useState([])

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
    setSelectedBooks([]);
  };
  const handleSaveAndCloseModal = () => {
    setOpenModal(false)
    setQuery('')
    setDebouncedQuery('')
  };


  const timeStart = dayjs(dateTimeStartValue).format('YYYY-MM-DD HH:mm:ss')
  const timeEnd = dayjs(dateTimeEndValue).format('YYYY-MM-DD HH:mm:ss')


  const handleGetIdBookSelected = (bookId) => {
    setSelectedBooks((prevSelectedBooks) => {
      if (prevSelectedBooks.includes(bookId)) {
        return prevSelectedBooks.filter(id => id !== bookId);
      } else {
        return [...prevSelectedBooks, bookId];
      }
    });
  };


  const handleCreateDiscountPromotion = async (e) => {
    e.preventDefault();
    if (!promotionName || !promotionValue || !timeStart || !timeEnd || (isApplyForChecked === 1 && !selectedBooks.length) || (isApplyForChecked === 2 && !category)) {
      Alert.Alert('info', 'Hãy điền đủ các giá trị !');
      return;
    }
    try {
      const type_promotion = isApplyForChecked === 0 ? 'all' : isApplyForChecked === 1 ? 'book' : 'category'
      const data = {
        type_promotion,
        promotion_name: promotionName,
        value: promotionValue,
        date_start: timeStart,
        date_end: timeEnd,
        book_ids: selectedBooks,
        category_name: category
      }
      
      const response_createPromotion = await UserRequest.post('promotion/', data);
      if(response_createPromotion.status === 200){
        Alert.Alert('success',  response_createPromotion.data.message)
        setTypeDiscount()
      }else if (response_createPromotion.status === 201){
        Alert.Alert('info',  response_createPromotion.data.message)
      }
    } catch (error) {
      Alert.Alert('error',  error.data.message)

      console.log(error)
    }
  }

  return (
    <div className='px-[8rem]  items-start flex gap-24 mt-20'>
      <div className='basis-2/3 flex flex-col gap-8'>

        <form action="#" onSubmit={handleCreateDiscountPromotion}>
          <section className='bg-white p-8  rounded-md flex flex-col gap-8'>
            <p className='font-bold'>Tên chương trình khuyến mãi</p>
            <input type="text" onChange={(e) => setPromotionName(e.target.value)} placeholder='vd: KWMQSaSS' className='px-2 py-3 focus:outline-[dodgerblue] border' />
          </section>
          <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
            <p className='font-bold'>Giá trị</p>
            <div className='flex gap-2 flex-col w-[30%]'>
              <label htmlFor="discount_value">Giá trị khuyến mãi</label>
              <input type="number" name="" id="discount_value" onChange={(e) => setPromotionValue(e.target.value)} className='border focus:outline-[dodgerblue] p-2 placeholder-right' placeholder='%' />
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
                      <input onChange={() => handleGetIdBookSelected(book.book_id)}
                        checked={selectedBooks.includes(book.book_id)} type="checkbox" className='w-[30px] h-[15px]' />
                      <img className='w-[80px] h-[80px] mr-5' src={book.thumbnail_url} alt={`book_cover_${book.book_id}`} />
                      <p className='basis-2/4'>{book.title}</p>
                      <p className='basis-1/4'>{book.original_price} vnđ</p>
                    </div>
                  )}

                </div>
                <section className='flex justify-end items-center gap-4 border-t py-10'>
                  <button onClick={handleCloseModal} className='px-10 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded-md'>hủy</button>
                  <button onClick={handleSaveAndCloseModal} className='bg-[dodgerblue] hover:bg-[#80bdfa] py-2 px-10 text-white rounded-md'>Lưu</button>
                </section>
              </div>
            </Modal>
            {isApplyForChecked === 2 && <input type="text" onChange={(e) => setCategory(e.target.value)} className='w-[50%] h-[35px] px-2 border outline-[dodgerblue]' placeholder='Nhập tên danh mục' />}
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
          <section className='flex justify-end items-center gap-4 my-12'>
            <button type='button' onClick={setTypeDiscount} className='px-10 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded-md'>Hủy</button>
            <button type='submit' className='bg-[dodgerblue] hover:bg-[#80bdfa] py-2 px-10 text-white rounded-md'>Lưu</button>
          </section>
        </form>
      </div>


      <div className='bg-white p-8 basis-1/3 rounded-md mr-20'>
        <h3 className='font-bold'>Tổng quan mã khuyến mãi</h3>
        {promotionName !== '' && <div className=' flex gap-2'>
          <p className='font-bold'>Tên:</p>
          <p>{promotionName}</p>
        </div>}
        {promotionValue !== 0 && <div className=' flex gap-2'>
          <p className='font-bold '>Giá trị:</p>
          <p>{promotionValue}%</p>
        </div>}
        {isApplyForChecked !== undefined && (isApplyForChecked === 0 ? <div className='flex gap-2'><p className='font-bold'>Áp dụng cho: </p> <p>tất cả sách</p></div> : isApplyForChecked === 1 ? <div className='flex gap-2'><p className='font-bold'>Áp dụng cho: </p> <p>nhà giả kim, ...</p></div> : <div className='flex gap-2'><p className='font-bold'>Áp dụng cho danh mục : </p> <p>{category}</p></div>)}
        {dateTimeStartValue !== null && <div className='flex gap-2'>
          <p className='font-bold'>Bắt đầu: </p>
          <p>{timeStart}</p>
        </div>}
        {dateTimeEndValue !== null && <div className='flex gap-2'>
          <p className='font-bold'>Kết thúc: </p>
          <p>{timeEnd}</p>
        </div>}
      </div>
    </div>
  )
}
