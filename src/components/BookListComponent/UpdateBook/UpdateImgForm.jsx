import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PublicRequest } from '../../../service/Request'
import { useForm } from "react-hook-form";
import myAlert from '../../AlertComponent/Alert'
import Loading from '../../LoadingComponent/Loading';
export default function UpdateImgForm({ setShowForm }) {
  const [ImageData, setImageData] = useState()
  const params = useParams()
  const book_id = params.slug
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm({})

  useEffect(() => {
    const getImageData = async () => {
      const response = await PublicRequest.get(`/collection/images/${book_id}`)
      setImageData(response.data)
    }
    getImageData()
  }, [book_id])


  const moreImg = [
    { id: 1, url: ImageData?.thumbnail_url },
    { id: 2, url: ImageData?.cover_url_1 },
    { id: 3, url: ImageData?.cover_url_2 },
    { id: 4, url: ImageData?.cover_url_3 },
  ]


  const [thumbnail, setThumbnail] = useState(() =>{

    const fileType = ImageData?.thumbnail_url.split('.').pop().toLowerCase();
    const type = fileType === 'mp4' || fileType === 'mov' ? 0 : 1;
    return {
          url: ImageData?.thumbnail_url,
          type: type
    }
  })
  const handleChangeImage = (url, type) => {
    setThumbnail({ url: url, type: type })
  }

  const onSubmit = async (data) => {
    setLoading(true)
    const { coverBooks } = data
    try {
      if (coverBooks.length === 0) {
        myAlert.Alert('info', `Bạn chưa chọn hình ảnh`)
        setLoading(false)
      } else if (coverBooks.length < 4) {
        myAlert.Alert('info', `Vui lòng chọn 4 ảnh`)
        setLoading(false)
      } else {
        const formData = new FormData()
        for (let i = 0; i < coverBooks.length; i++) {
          formData.append('coverBooks', coverBooks[i]);
        }
        const response = await PublicRequest.put(`/collection/images/${book_id}`, formData)
        if (response.status === 200) {
          myAlert.Alert('success', 'Cập nhật bìa sách thành công')
          setLoading(false)
          console.log(response.data)
          await setShowForm()
        }
      }
    } catch (error) {
      myAlert.Alert('error', 'Có lỗi xảy ra hãy thử lại')
      setLoading(false)
      console.log(error.response.message)
    }
  }


  const [media, setMedia] = useState()

  useEffect(() => {
    const result = moreImg?.map(item => {
      const fileType = item.url?.split('.').pop().toLowerCase();
      const type = fileType === 'mp4' || fileType === 'mov' ? 0 : 1;
      return { id: item.id, url: item?.url, type };
    });

    setMedia(result)
  }, [ImageData])



  return (
    <div>
      <h1 className='text-center text-5xl font-semibold'>Thay đổi hình ảnh về sách</h1>
      {loading ? <Loading /> : <div>
        <p className='my-12'>Hình ảnh hiện tại</p>
        <div className='flex flex-col gap-8'>
          {thumbnail.type === 1 ?
            (<img className='w-[200px] h-[200px]' src={thumbnail.url ?? ImageData?.thumbnail_url } alt="thumbnail_book" />)
            :
            (<video className={`cursor-pointer p-2 w-[350px] h-[250px]`} controls>
              <source src={thumbnail.url} type="video/mp4" />
            </video>)
          }
          <div className='flex justify-between my-4 mx-auto gap-4'>
            {media?.map((item, id) => (
              <div key={id} className='border-[1px] border-[dodgerblue] rounded-sm p-1 gap-2 cursor-pointer'>
                {item.type === 1 ? (
                  <img onClick={() => handleChangeImage(item?.url, 1)} className='cursor-pointer p-2 w-[100px] h-[100px] ' src={item?.url} alt={`img_rating_${id + 1}`} />
                ) : <video onClick={() => handleChangeImage(item?.url, 0)} className={`cursor-pointer p-2 w-[100px] h-[100px]`}>
                  <source src={item?.url} type="video/mp4" />
                </video>}
              </div>
            ))}
          </div>
        </div>
        <div className='mt-8'>
          <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="file"
              multiple={true}
              id='coverBooks'
              name='coverBooks'
              onChange={(e) => e.target.files}
              {...register(`coverBooks`)}
            />
            <div className='flex justify-center gap-8 mt-8'>
              <button className='hover:bg-gradient-to-r from-red-500 to-red-400 px-4 py-2 rounded-md border text-white  w-[120px] bg-[#d84949] ' type='submit'>Chỉnh sửa</button>
              <button type='button' className='hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md border  w-[120px] bg-[dodgerblue] text-white' onClick={setShowForm}>Trở về</button>
            </div>
          </form>
        </div>
      </div>}
    </div>
  )
}
