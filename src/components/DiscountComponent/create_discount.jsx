import React from 'react'

export default function CreateDiscount() {
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

        <section className='bg-white p-8  rounded-md flex flex-col gap-8'>
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
      </div>
      <div className='bg-white p-8 basis-1/3 rounded-md mr-20'>
        <h3>Tổng quan mã khuyến mãi</h3>
        <p>ABCDEXZ</p>
      </div>
    </div>
  )
}
