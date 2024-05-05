import React from 'react'
import BookFormLeft from './BookFormLeft'
import BookFormRight from './BookFormRight'
import RestInfo from './RestInfo'
import Loading from '../../LoadingComponent/Loading'
import { Link } from 'react-router-dom'
export default function FormCreate({onChange, handleSubmit, onSubmit, errors, register, loading}) {

  return (
    <div>
      <div className={loading ? `flex items-center justify-center px-40 mt-12 mb-5` : `flex items-center justify-between px-40 mt-12 mb-5`}>
            {loading ? <Loading /> : <div className="border border-black bg-white  flex flex-col gap-4  mx-auto w-[100%] h-fit p-6  rounded-lg shadow-md">
                <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                    <div className='book-form'>
                        <h1 className="mb-2 py-2 mx-auto text-3xl text-justify border-b border-blue-500 font-bold">
                            Nhập thông tin sách mới
                        </h1>
                        <div className='flex justify-between'>
                            <BookFormLeft onChange={onChange} errors={errors} register={register}/>
                            <BookFormRight onChange={onChange} errors={errors} register={register}/>
                        </div>
                    </div>
                    <RestInfo onChange={onChange} errors={errors} register={register}/>
                    <div className='flex gap-8 justify-center mt-8'>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Nhập hàng
                        </button>
                        <Link to='/check'
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            Thoát
                        </Link>
                    </div>
                </form>
            </div>}
        </div>
    </div>
  )
}
