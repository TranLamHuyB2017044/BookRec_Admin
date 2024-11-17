import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import myAlert from '../AlertComponent/Alert';
import { PublicRequest, UserRequest } from '../../service/Request';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';


export default function AutoAddBookComponent() {
    const [previewImgs, setPreviewImgs] = useState([]);
    const [files, setFiles] = useState([]);
    const [textResult, setTextResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const [bookDetails, setBookDetails] = useState({
        title: '',
        author_name: '',
        manufacturer_name: '',
        original_price: '',
        short_description: '',
        pages: '',
        publication_date: '',
        category: '',
        inStock: '',
        publisher_name: ''
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
        const trimmedText = text.trim().toLowerCase();

        const titleRegex = /[a-zàáảãạđêếềệíìóòỏõọôốồộớờợúùủũụýỳỵ\s]+/g;
        const authorRegex = /\b(?:by|tác giả|tac gia|written by|author)\s*(của\s*)?([a-zàáảãạđêếềệíìóòỏõọôốồộớờợúùủũụýỳỵỹưứừự]+(?:\s+[a-zàáảãạđêếềệíìóòỏõọôốồộớờợúùủũụýỳỵỹưứừự]+)*)/i;
        const publisherRegex = /\b(?:nhà xuất bản|nxb|publication|publisher)\b/i;
        const priceRegex = /\b(?:giá|price|giá bán):?\s*([\d.,]+)\b/i;
        const pageCountRegex = /\b(?:số trang|page count|pages)\s*:\s*(\d+)(?:\.\s*tr)?\b/i;
        const publishDateRegex = /\b(?:ngày xuất bản|publish date|release date|publication date)\s*:\s*(\d{1,2}\/\d{1,2}\/\d{4})\b/i;
        const descriptionRegex = /([a-zàáảãạđêếềệíìóòỏõọôốồộớờợúùủũụýỳỵ\s,.!?-]{30,})/g;
        const categoryRegex = /\b(?:thể loại|category|loại|genre)\s*:\s*([a-zàáảãạđêếềệíìóòỏõọôốồộớờợúùủũụýỳỵ\s]+(?:\s*,\s*[a-zàáảãạđêếềệíìóòỏõọôốồộớờợúùủũụýỳỵ\s]+)*)/i;
        let title = 'Unknown Title';
        let author = 'Unknown Author';
        let publisher = 'Unknown Publisher';
        let original_price = 'Unknown Price';
        let description = 'No Description';
        let page_count = 'Unknown Page Count';
        let publish_date = 'Unknown Publish Date';
        let category = 'Unknown Category';

        const combinedText = trimmedText.replace(/[^a-zàáảãạđêếềệíìóòỏõọôốồộớờợúùủũụýỳỵ\s\d,.!?-]/g, '');

        const authorMatch = combinedText.match(authorRegex);
        if (authorMatch) {
            author = authorMatch[2].trim().replace(/\b\w/g, char => char.toUpperCase());
        }

        const publisherMatch = combinedText.match(publisherRegex);
        if (publisherMatch) {
            publisher = publisherMatch[0].trim();
        }

        const priceMatch = combinedText.match(priceRegex);
        if (priceMatch) {
            original_price = priceMatch[1].trim();
        }

        const pageCountMatch = combinedText.match(pageCountRegex);
        if (pageCountMatch) {
            page_count = pageCountMatch[1].trim();
        }

        const publishDateMatch = combinedText.match(publishDateRegex);
        if (publishDateMatch) {
            publish_date = publishDateMatch[1].trim();
        }

        const titleMatch = combinedText.match(titleRegex);
        if (titleMatch) {
            title = titleMatch[0].trim();
        }

        const genreMatch = combinedText.match(categoryRegex);
        if (genreMatch) {
            category = genreMatch[1].trim().replace(/\b\w/g, char => char.toUpperCase());
        }

        const descriptionMatches = combinedText.match(descriptionRegex);
        if (descriptionMatches) {
            description = descriptionMatches.reduce((longest, current) =>
                current.length > longest.length ? current : longest, ""
            ).trim();
        }

        return {
            title,
            author,
            publisher,
            original_price,
            description,
            page_count,
            publish_date,
            category,
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

                const { title, author, publisher, original_price, description, page_count, publish_date, category } = parseBookDetails(combinedText);

                setBookDetails({
                    title,
                    author,
                    publisher,
                    original_price,
                    description,
                    page_count,
                    publish_date,
                    category
                });

                setValue('title', title);
                setValue('author_name', author);
                setValue('manufacturer_name', publisher);
                setValue('original_price', original_price);
                setValue('short_description', description);
                setValue('pages', page_count);
                setValue('publication_date', publish_date);
                setValue('category', category);


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
        short_description: yup.string().required("Mô tả chung là bắt buộc"),
        category: yup.string().required("Thể loại sách là bắt buộc"),
        author_name: yup.string().required("Tên tác giả là bắt buộc"),
        publisher_name: yup.string().required("Tên nhà cung cấp là bắt buộc"),
        manufacturer_name: yup.string().required("Tên nhà xuất bản là bắt buộc"),
        original_price: yup.string().required("giá bán là bắt buộc"),
        publication_date: yup.date().required('Ngày xuất bản là bắt buộc').max(new Date(), 'Ngày xuất bản không thể là tương lai'),
        inStock: yup.string().required("Tồn kho là bắt buộc"),
        pages: yup.string().required("Số trang là bắt buộc"),
    });


    const user_id = useSelector(state => state.currentUser.user_id)


    const onSubmit = async () => {
        const form_data = { ...bookDetails, };

        try {
            setLoading(true);
            const rs = await UserRequest.post(`/purchase/${user_id}`, form_data);
            if (rs.status === 200) {
                myAlert.Alert('success', 'Nhập hàng thành công');
                setTimeout(() => {
                    setLoading(false);
                }, 2000)
            }
        } catch (error) {
            setLoading(false);
            myAlert.Alert('error', 'Có lỗi xảy ra');
            console.log(error.message);
        }
    };

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
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
                        className='active:translate-y-1 hover:bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 rounded-md 
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
            <div className='bg-white rounded-2xl mx-16 my-12 py-8 mt-48 '>
                <form onSubmit={handleSubmit(onSubmit)} className="px-20">
                    <div className=" mb-4 pb-4">
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
                                <label htmlFor='author_name' className='block font-semibold'>Tác giả:</label>
                                <input
                                    type="text"
                                    id='author_name'
                                    value={bookDetails.author_name}
                                    onChange={(e) => handleInputChange('author_name', e.target.value)}
                                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    {...register('author_name', { onChange: (e) => handleInputChange('author_name', e.target.value) })}

                                />
                                {errors.author_name && <span className="text-red-500 mt-4 text-[13px]">{errors.author_name.message}</span>}

                            </div>
                            <div>
                                <label htmlFor='manufacturer_name' className='block font-semibold'>Nhà xuất bản:</label>
                                <input
                                    type="text"
                                    id='manufacturer_name'
                                    value={bookDetails.manufacturer_name}
                                    onChange={(e) => handleInputChange('manufacturer_name', e.target.value)}
                                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    {...register('manufacturer_name', { onChange: (e) => handleInputChange('manufacturer_name', e.target.value) })}

                                />
                                {errors.manufacturer_name && <span className="text-red-500 mt-4 text-[13px]">{errors.manufacturer_name.message}</span>}
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
                                <label htmlFor='short_description' className='block font-semibold'>Mô tả:</label>
                                <textarea
                                    value={bookDetails.short_description}
                                    id='short_description'
                                    onChange={(e) => handleInputChange('short_description', e.target.value)}
                                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    rows="4"
                                    {...register('short_description', { onChange: (e) => handleInputChange('short_description', e.target.value) })}

                                />
                                {errors.short_description && <span className="text-red-500 mt-4 text-[13px]">{errors.short_description.message}</span>}

                            </div>
                            <div>
                                <label htmlFor='pages' className='block font-semibold'>Số trang:</label>
                                <input
                                    type="number"
                                    id='pages'
                                    value={bookDetails.pages}
                                    onChange={(e) => handleInputChange('pages', e.target.value)}
                                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    {...register('pages', { onChange: (e) => handleInputChange('pages', e.target.value) })}

                                />
                                {errors.pages && <span className="text-red-500 mt-4 text-[13px]">{errors.pages.message}</span>}

                            </div>
                            <div>
                                <label htmlFor='publication_date' className='block font-semibold'>Ngày xuất bản:</label>
                                <input
                                    type="date"
                                    id='publication_date'
                                    value={bookDetails.publication_date || ''}
                                    onChange={(e) => handleInputChange('publication_date', e.target.value)}
                                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    {...register('publication_date', { onChange: (e) => handleInputChange('publication_date', e.target.value) })}

                                />
                                {errors.publication_date && <span className="text-red-500 mt-4 text-[13px]">{errors.publication_date.message}</span>}

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
                                <label htmlFor='inStock' className='block font-semibold'>Số lượng:</label>
                                <input
                                    type="number"
                                    value={bookDetails.inStock || ''}
                                    onChange={(e) => handleInputChange('inStock', e.target.value)}
                                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    {...register('inStock', { onChange: (e) => handleInputChange('inStock', e.target.value) })}

                                />
                                {errors.inStock && <span className="text-red-500 mt-4 text-[13px]">{errors.inStock.message}</span>}

                            </div>
                            <div>
                                <label htmlFor='publisher_name' className='block font-semibold'>Nhà cung cấp:</label>
                                <input
                                    type="text"
                                    id='publisher_name'
                                    value={bookDetails.publisher_name || ''}
                                    onChange={(e) => handleInputChange('publisher_name', e.target.value)}
                                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    {...register('publisher_name', { onChange: (e) => handleInputChange('publisher_name', e.target.value) })}

                                />
                                {errors.publisher_name && <span className="text-red-500 mt-4 text-[13px]">{errors.publisher_name.message}</span>}

                            </div>
                        </div>

                        <div className="mt-5">
                            <button type='submit' className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                                Nhập hàng
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
