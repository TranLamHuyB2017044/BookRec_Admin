import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PublicRequest } from '../../../service/Request'

export default function UpdateImgForm({ setShowForm }) {
  const [ImageData, setImageData] = useState({})
  const [image, setImage] = useState(ImageData.thumbnail_url)
  const params = useParams()
  const book_id = params.slug

  const moreImg = [
    { id: 1, url: ImageData.thumbnail_url },
    { id: 2, url: ImageData.cover_url_1 },
    { id: 3, url: ImageData.cover_url_2 },
    { id: 4, url: ImageData.cover_url_3 },
  ]
  useEffect(() => {
    const getImageData = async () => {
      const response = await PublicRequest.get(`/collection/images/${book_id}`)
      setImageData(response.data)
    }
    getImageData()
  }, [book_id])

  const handleChangeImage = (url) => {
    setImage(url)
  }
  return (
    <div>
      <div>
        <h1 className='text-center text-5xl font-semibold'>Thay đổi hình ảnh về sách</h1>
        <p className='my-12'>Hình ảnh hiện tại</p>
        <div className='flex flex-col gap-8'>
          <img className='w-[200px] h-[200px]' src={image || ImageData.thumbnail_url} alt="thumbnail_book" />
          <div className='flex justify-between my-4 mx-auto gap-4'>
            {moreImg.map((img) => (
              <div key={img.id} className='border-[1px] border-[dodgerblue] rounded-sm p-1 gap-2 cursor-pointer'>
                <button type='button' onClick={() => handleChangeImage(img.url)} >
                  <img loading='lazy' className=' p-2 w-[100px] h-[100px]' src={img.url} alt={`more-img-${img.id}`} />
                </button>
              </div>))
            }
          </div>
        </div>
        <div className='mt-8'>
          <form action="#">
            <input
              type="file"
              multiple={true}
              id='images'
              onChange={(e) => e.target.files}
            />
          </form>
        </div>
      </div>
      <div className='flex justify-center gap-8 mt-8'>
        <button className='hover:bg-gradient-to-r from-red-500 to-red-400 px-4 py-2 rounded-md border text-white  w-[120px] bg-[#d84949] ' type='submit'>Chỉnh sửa</button>
        <button type='button' className='hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md border  w-[120px] bg-[dodgerblue] text-white' onClick={setShowForm}>Trở về</button>
      </div>
    </div>
  )
}
