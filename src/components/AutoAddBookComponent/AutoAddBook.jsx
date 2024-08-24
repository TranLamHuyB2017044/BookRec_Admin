import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import myAlert from '../AlertComponent/Alert'
import { PublicRequest } from '../../service/Request';
export default function AutoAddBookComponent() {
    const [previewImg, setPreviewImg] = useState(null);
    const [file, setFile] = useState(null);
    const [textResult, setTextResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result);
                setFile(selectedFile); // Lưu trữ file để gửi đi
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            myAlert.Alert('info', 'Vui lòng chọn ảnh trước khi gửi.');
            return;
        }

        const formData = new FormData();
        formData.append('coverImage', file);
        setLoading(true)
        try {
            const response = await PublicRequest.post('/collection/recognizeBook', formData)

            console.log(response.data)
            if (response.status === 200) {
                myAlert.Alert('success', 'Trích xuất thành công')
                setLoading(false)
                setTextResult(response.data)
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
            myAlert.Alert('error', 'Lỗi khi gửi yêu cầu')
            setLoading(false)
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-between px-20 mt-20'>
                    <input type="file" name='coverImage' onChange={handleImageChange} />
                    <Link to='/'
                        className='mr-20 active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md 
                        border border-white bg-[dodgerblue] text-white flex items-center w-[120px] gap-2 justify-center'
                    >Trở về</Link>
                </div>
                <div className='flex justify-between px-20 gap-8 mt-10 items-center'>
                    <div className='border border-gray-300 p-8 h-[500px] flex-1 flex justify-center items-center'>
                        {previewImg ? (
                            <img className='bg-cover max-h-full max-w-full' src={previewImg} alt="Preview" />
                        ) : (
                            <p>Chọn ảnh để xem trước</p>
                        )}
                    </div>
                    <ArrowForwardIcon fontSize='large' />
                    <div className='border border-gray-300 p-8 h-[500px] flex-1'>
                        <p>
                            {loading ? <div className='flex items-center justify-start mt-[22rem] ml-72 h-fit'>
                                <div className="flex space-x-2">
                                    <div className="h-10 w-10 bg-red-500 rounded-full animate-bounce"></div>
                                    <div className="h-10 w-10 bg-green-500 rounded-full animate-bounce"></div>
                                    <div className="h-10 w-10 bg-blue-500 rounded-full animate-bounce"></div>
                                </div>
                            </div> : textResult}
                        </p>
                    </div>
                </div >
                <button
                    type="submit"
                    className='mr-20 float-right mt-10 active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md 
                        border border-white bg-[dodgerblue] text-white flex items-center w-[120px] gap-2 justify-center'
                >Trích xuất</button>
            </form >
        </div >
    );
}
