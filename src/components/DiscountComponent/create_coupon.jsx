import React, { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
export default function CreateCoupon() {

  return (
    <div className='px-[8rem]  items-start flex gap-24 mt-20'>
      <div className='basis-2/3 flex flex-col gap-8'>

        <section className='bg-white p-8  rounded-md flex flex-col gap-8'>
          <div className='flex justify-between'>
            <p className='font-bold'>Mã khuyến mãi</p>
            <p className='text-[dodgerblue] cursor-pointer'>Sinh mã ngẫu nhiên</p>
          </div>
          <input type="text" placeholder='vd: KWMQSaSS' className='px-2 py-3 focus:outline-[dodgerblue] border' />
          <p className='-mt-5 text-gray-500'>Khách hàng sẽ nhập mã này ở màn hình thanh toán</p>
        </section>

        <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
          <p className='font-bold'>Loại khuyến mãi</p>
          <div className='flex gap-4'>
            <input type="radio" name="" id="percent" />
            <label htmlFor="percent">Theo phần trăm</label>
          </div>
          <div className='flex gap-4'>
            <input type="radio" name="" id="price" />
            <label htmlFor="price">Theo số tiền</label>
          </div>
          <div className='flex gap-4'>
            <input type="radio" name="" id="shipping" />
            <label htmlFor="shipping">Miễn phí vận chuyển</label>
          </div>
        </section>

        <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
          <p className='font-bold'>Giá trị</p>
          <div className='flex justify-center gap-8'>
            <div className='flex gap-2 flex-col basis-1/2'>
              <label htmlFor="discount_value">Giá trị khuyến mãi</label>
              <input type="number" name="" id="discount_value" className='border focus:outline-[dodgerblue] p-2 placeholder-right' placeholder='%' />
            </div>
            <div className='flex gap-2 flex-col basis-1/2'>
              <label htmlFor="max_discount_value">Giá trị giảm tối đa (tùy chọn)</label>
              <input type="number" name="" id="max_discount_value" className='border focus:outline-[dodgerblue] p-2 placeholder-right' placeholder='$' />
            </div>
          </div>

        </section>

        <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
          <p className='font-bold'>Điều kiện áp dụng</p>
          <div className='flex gap-4'>
            <input type="radio" name="" id="nothing" />
            <label htmlFor="nothing">Không có</label>
          </div>
          <div className='flex gap-4'>
            <input type="radio" name="" id="min_total_order" />
            <label htmlFor="min_total_order">Tổng giá trị đơn hàng tối thiểu</label>
          </div>
        </section>
        <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
          <p className='font-bold'>Nhóm khách hàng</p>
          <div className='flex gap-4'>
            <input type="radio" name="" id="all_user" />
            <label htmlFor="all_user">Tất cả</label>
          </div>
          <div className='flex gap-4'>
            <input type="radio" name="" id="spectial_user" />
            <label htmlFor="spectial_user">Khách hàng</label>
          </div>
          <div className='flex gap-4 flex-col'>
            <label htmlFor="spectial_user">Giới hạn sử dụng</label>
            <input type="number" name="" id="limited_number" className='border outline-[dodgerblue] w-[30%] p-2' />
          </div>


        </section>
        <section className='bg-white p-8  rounded-md flex flex-col gap-4'>
          <p className='font-bold'>Thời gian</p>
          <div className='flex justify-center gap-8'>
            <div className='flex gap-2 flex-col basis-1/2'>
              <label htmlFor="start_date" className='mb-5'>Ngày bắt đầu</label>
              <DatePicker label="MM/DD/YYYY" name='start_date' className='h-[40px]' />
            </div>
            <div className='flex gap-2 flex-col basis-1/2'>
              <label htmlFor="start_time" className='mb-5'>Thời điểm</label>
              <TimePicker label="HH:MM" />
            </div>
          </div>
          <p className='font-bold'>Thời gian kết thúc</p>
          <div className='flex justify-center gap-8'>
            <div className='flex gap-2 flex-col basis-1/2'>
              <label htmlFor="end_date" className='mb-5'>Ngày kết thúc</label>
              <DatePicker label="MM/DD/YYYY" name='start_date' className='h-[40px]' />

            </div>
            <div className='flex gap-2 flex-col basis-1/2'>
              <label htmlFor="end_time" className='mb-5'>Thời điểm</label>
              <TimePicker label="HH:MM" />
            </div>
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
