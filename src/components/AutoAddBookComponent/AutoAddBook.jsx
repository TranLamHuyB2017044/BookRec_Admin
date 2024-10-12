import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import myAlert from '../AlertComponent/Alert';
import { PublicRequest, UserRequest } from '../../service/Request';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import DateUtils from '../../util/date_util.js';


export default function AutoAddBookComponent() {
    const [previewImgs, setPreviewImgs] = useState([]);
    const [files, setFiles] = useState([]);
    const [textResult, setTextResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const [bookDetails, setBookDetails] = useState({
        title: '',
        author: '',
        manufacturer: '',
        original_price: '',
        description: '',
        page_count: '',
        publish_date: '',
        category: '',
        quantity: '',
        publisher: ''
    });

    const handleImageChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const previews = [];
            const fileList = [];
            Array.from(selectedFiles).forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    previews.push(reader.result);
                    fileList.push(file);
                    if (previews.length === selectedFiles.length) {
                        setPreviewImgs(previews);
                        setFiles(fileList);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const parseBookDetails = (text) => {
        const trimmedText = text.trim();

        const authorRegex = /\b(?:by|tác giả|written by|author)\s*:\s*([A-ZĐ][a-zA-Zđếáàảâấầậăắằặơớờợýỳỵỹưứừựùúûụ]+(?:\s+[A-ZĐa-záàạảâấầặăắằặẽèéêễễểệýùúỹỵüđ]+)*)/i;
        const publisherRegex = /\b(?:nhà\s*xuất\s*bản|nxb|publisher|xuất\s*bản|nhà\s*phát\s*hành|đơn\s*vị\s*phát\s*hành)\s*:\s*([^\n]+)/i;
        const priceRegex = /\b(?:giá|price|giá bán):?\s*([\d.,]+)\b/i;
        const pageCountRegex = /\b(?:số trang|page count|pages)\s*:\s*(\d+)(?:\.\s*tr)?\b/i;
        const publishDateRegex = /\b(?:ngày xuất bản|publish date|release date)\s*:\s*(\d{1,2}\/\d{1,2}\/\d{4})\b/i;

        let title = 'Unknown Title';
        let author = 'Unknown Author';
        let publisher = 'Unknown Publisher';
        let original_price = 'Unknown Price';
        let description = 'No Description';
        let page_count = 'Unknown Page Count';
        let publish_date = 'Unknown Publish Date';

        const lines = trimmedText.split('\n').map(line => line.trim());
        let combinedText = lines.join(' ');

        // Tìm tác giả
        const authorMatch = combinedText.match(authorRegex);
        if (authorMatch) {
            author = authorMatch[1].trim().replace(/\b\w/g, char => char.toUpperCase());
        }

        // Tìm nhà xuất bản
        const publisherMatch = combinedText.match(publisherRegex);
        if (publisherMatch) {
            publisher = publisherMatch[1].trim();
            const publisherText = publisherMatch[0];
            combinedText = combinedText.replace(publisherText, '').trim();
        }

        // Tìm giá
        const priceMatch = combinedText.match(priceRegex);
        if (priceMatch) {
            original_price = priceMatch[1].trim();
        }

        // Tìm số trang
        const pageCountMatch = combinedText.match(pageCountRegex);
        if (pageCountMatch) {
            page_count = pageCountMatch[1].trim();
        }

        // Tìm ngày xuất bản
        const publishDateMatch = combinedText.match(publishDateRegex);
        if (publishDateMatch) {
            publish_date = publishDateMatch[1].trim();
        }

        // Tìm mô tả
        const paragraphs = combinedText.split(/[.!?]\s+/);
        if (paragraphs.length > 0) {
            description = paragraphs.reduce((longest, current) => {
                return current.length > longest.length ? current : longest;
            }, '').trim();
        }

        // Tìm tiêu đề
        const titleMatches = combinedText.match(/([A-Za-z0-9ÀÁẢÃẠĐÊẾỀỆÍÌÓÒỎÕỌÔỐỒỘỚỜỢÚÙỦŨỤÝỲỴ\s.,;:!?()\-]+)/g);
        if (titleMatches) {
            title = titleMatches.reduce((longest, current) => {
                return current.length > longest.length ? current : longest;
            }, '').trim();
        }

        return {
            title,
            author,
            publisher,
            original_price,
            description,
            page_count,
            publish_date
        };
    };

    const handleSubmitDetectBook = async (event) => {
        event.preventDefault();
        if (files.length === 0) {
            myAlert.Alert('info', 'Vui lòng chọn ảnh trước khi gửi.');
            return;
        }

        const formData = new FormData();
        Array.from(files).forEach((file) => formData.append('coverImages', file));
        setLoading(true);
        try {
            const response = await PublicRequest.post('/collection/recognizeBook', formData);

            if (response.status === 200) {
                myAlert.Alert('success', 'Trích xuất thành công');
                setLoading(false);
                setTextResult(response.data);

                const combinedText = response.data.results.map(result => result.text).join(' ');

                const { title, author, manufacturer, original_price, description, page_count, publish_date } = parseBookDetails(combinedText);

                setBookDetails({
                    title,
                    author,
                    manufacturer,
                    original_price,
                    description,
                    page_count,
                    publish_date
                });

                setValue('title', title);
                setValue('author', author);
                setValue('manufacturer', manufacturer);
                setValue('original_price', original_price);
                setValue('description', description);
                setValue('page_count', page_count);
                setValue('publish_date', publish_date);


            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
            myAlert.Alert('error', 'Lỗi khi gửi yêu cầu');
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setBookDetails(prevDetails => ({
            ...prevDetails,
            [field]: value
        }));
    };


    const schema = yup.object().shape({
        title: yup.string().required("Tên sách là bắt buộc"),
        description: yup.string().required("Mô tả chung là bắt buộc"),
        category: yup.string().required("Thể loại sách là bắt buộc"),
        author: yup.string().required("Tên tác giả là bắt buộc"),
        publisher: yup.string().required("Tên nhà cung cấp là bắt buộc"),
        manufacturer: yup.string().required("Tên nhà xuất bản là bắt buộc"),
        original_price: yup.string().required("giá bán là bắt buộc"),
        publish_date: yup.string().required("Ngày xuất bản là bắt buộc"),
        inStock: yup.string().required("Tồn kho là bắt buộc"),
        quantity_sold: yup.string().required("Số lượng đã bán là bắt buộc"),
        page_count: yup.string().required("Số trang là bắt buộc"),
    });


    const user_id = useSelector(state => state.currentUser.user_id)


    const onSubmit = async () => {
        const form_data = bookDetails;

        console.log(form_data)
        // try {
        //     setLoading(true);
        //     const rs = await UserRequest.post(`/purchase/${user_id}`, data);
        //     if (rs.status === 200) {
        //         myAlert.Alert('success', 'Nhập hàng thành công');
        //         setTimeout(() => {
        //             setLoading(false);
        //         }, 2000)
        //     }
        // } catch (error) {
        //     setLoading(false);
        //     myAlert.Alert('error', 'Có lỗi xảy ra');
        //     console.log(error.message);
        // }
    };

    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: bookDetails
    })


    return (
        <div>
            <form onSubmit={handleSubmitDetectBook}>
                <div className='flex justify-between px-20 mt-20'>
                    <input type="file" name='coverImages' onChange={handleImageChange} multiple />
                    <Link
                        to='/'
                        className='mr-20 active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md 
                        border border-white bg-[dodgerblue] text-white flex items-center w-[120px] gap-2 justify-center'>
                        Trở về
                    </Link>
                </div>

                <div className='flex justify-between px-20 gap-8 mt-10 items-start'>
                    <div className='border border-gray-300 p-8 min-h-[80px] max-h-[500px] flex-1 flex justify-center items-center'>
                        {previewImgs.length > 0 ? (
                            <div className='grid grid-cols-3 gap-4'>
                                {previewImgs.map((img, index) => (
                                    <img key={index} className='bg-cover max-h-full max-w-full' src={img} alt={`Preview ${index}`} />
                                ))}
                            </div>
                        ) : (
                            <p>Chọn ảnh để xem trước</p>
                        )}
                    </div>

                    <ArrowForwardIcon fontSize='large' className='my-auto ' />

                    <div className='border border-gray-300 p-8 min-h-[80px] flex-1'>
                        <div className='place-content-center'>
                            {loading ? (
                                <div className='flex items-center justify-start mt-auto ml-72 h-fit'>
                                    <div className="flex space-x-2">
                                        <div className="h-10 w-10 bg-red-500 rounded-full animate-bounce"></div>
                                        <div className="h-10 w-10 bg-green-500 rounded-full animate-bounce"></div>
                                        <div className="h-10 w-10 bg-blue-500 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            ) : (
                                textResult && (
                                    <div>
                                        {textResult.results.map((result, index) => (
                                            <div key={index}>
                                                <p className='font-bold'>Image {index + 1}:</p>
                                                <p dangerouslySetInnerHTML={{ __html: result.text.replaceAll('\n', '<br/>') }} />
                                            </div>
                                        ))}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className='mr-20 float-right mt-10 active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 
                    rounded-md border border-white bg-[dodgerblue] text-white flex items-center gap-2 justify-center'>
                    Trích xuất thông tin
                </button>
            </form>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-48 px-20">
                <div className="border-b border-gray-300 mb-4 pb-4">
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor='title' className='block font-semibold'>Tên sách:</label>
                            <input
                                id='title'
                                type="text"
                                value={bookDetails.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...register('title', { onChange: (e) => handleInputChange('title', e.target.value) })}
                            />
                            {errors.title && <span className="text-red-500 mt-4 text-[13px]">{errors.title.message}</span>}
                        </div>
                        <div>
                            <label htmlFor='author' className='block font-semibold'>Tác giả:</label>
                            <input
                                type="text"
                                id='author'
                                value={bookDetails.author}
                                onChange={(e) => handleInputChange('author', e.target.value)}
                                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...register('author', { onChange: (e) => handleInputChange('author', e.target.value) })}

                            />
                            {errors.author && <span className="text-red-500 mt-4 text-[13px]">{errors.author.message}</span>}

                        </div>
                        <div>
                            <label htmlFor='manufacturer' className='block font-semibold'>Nhà xuất bản:</label>
                            <input
                                type="text"
                                id='manufacturer'
                                value={bookDetails.manufacturer}
                                onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...register('manufacturer', { onChange: (e) => handleInputChange('manufacturer', e.target.value) })}

                            />
                            {errors.manufacturer && <span className="text-red-500 mt-4 text-[13px]">{errors.manufacturer.message}</span>}
                        </div>
                        <div>
                            <label htmlFor='original_price' className='block font-semibold'>Giá gốc:</label>
                            <input
                                type="number"
                                id='original_price'
                                value={bookDetails.original_price}
                                onChange={(e) => handleInputChange('original_price', e.target.value)}
                                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...register('original_price', { onChange: (e) => handleInputChange('original_price', e.target.value) })}

                            />
                            {errors.original_price && <span className="text-red-500 mt-4 text-[13px]">{errors.original_price.message}</span>}

                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor='description' className='block font-semibold'>Mô tả:</label>
                            <textarea
                                value={bookDetails.description}
                                id='description'
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                rows="4"
                                {...register('description', { onChange: (e) => handleInputChange('description', e.target.value) })}

                            />
                            {errors.description && <span className="text-red-500 mt-4 text-[13px]">{errors.description.message}</span>}

                        </div>
                        <div>
                            <label htmlFor='page_count' className='block font-semibold'>Số trang:</label>
                            <input
                                type="number"
                                id='page_count'
                                value={bookDetails.page_count}
                                onChange={(e) => handleInputChange('page_count', e.target.value)}
                                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...register('page_count', { onChange: (e) => handleInputChange('page_count', e.target.value) })}

                            />
                            {errors.page_count && <span className="text-red-500 mt-4 text-[13px]">{errors.page_count.message}</span>}

                        </div>
                        <div>
                            <label htmlFor='publish_date' className='block font-semibold'>Ngày xuất bản:</label>
                            <input
                                type="date"
                                id='publish_date'
                                value={bookDetails.publish_date || ''}
                                onChange={(e) => handleInputChange('publish_date', e.target.value)}
                                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...register('publish_date', { onChange: (e) => handleInputChange('publish_date', e.target.value) })}

                            />
                            {errors.publish_date && <span className="text-red-500 mt-4 text-[13px]">{errors.publish_date.message}</span>}

                        </div>
                        <div>
                            <label htmlFor='category' className='block font-semibold'>Thể loại:</label>
                            <input
                                type="text"
                                value={bookDetails.category || ''}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...register('category', { onChange: (e) => handleInputChange('category', e.target.value) })}

                            />
                            {errors.category && <span className="text-red-500 mt-4 text-[13px]">{errors.category.message}</span>}

                        </div>
                        <div>
                            <label htmlFor='quantity' className='block font-semibold'>Số lượng:</label>
                            <input
                                type="number"
                                value={bookDetails.quantity || ''}
                                onChange={(e) => handleInputChange('quantity', e.target.value)}
                                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...register('quantity', { onChange: (e) => handleInputChange('quantity', e.target.value) })}

                            />
                            {errors.quantity && <span className="text-red-500 mt-4 text-[13px]">{errors.quantity.message}</span>}

                        </div>
                        <div>
                            <label htmlFor='publisher' className='block font-semibold'>Nhà cung cấp:</label>
                            <input
                                type="text"
                                id='publisher'
                                value={bookDetails.publisher || ''}
                                onChange={(e) => handleInputChange('publisher', e.target.value)}
                                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...register('publisher', { onChange: (e) => handleInputChange('publisher', e.target.value) })}

                            />
                            {errors.publisher && <span className="text-red-500 mt-4 text-[13px]">{errors.publisher.message}</span>}

                        </div>
                    </div>

                    <div className="mt-5">
                        <button type='submit' onClick={onSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                            Nhập hàng
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
}
