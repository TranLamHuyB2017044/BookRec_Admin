import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { PublicRequest } from '../../service/Request'
import MyAlert from '../../components/AlertComponent/Alert'
import Footer from '../../components/FooterComponent/Footer';
import FormCreate from '../../components/BookListComponent/CreateBook/FormCreate';
import Navbar from '../../components/NavbarComponent/Navbar';
import Sidebar from '../../components/SideBarComponent/Sidebar';
import { useNavigate } from 'react-router-dom';
export default function NewBook() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const active = 0
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleToggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const [bookInfo, setBookInfo] = useState({
        title: '',
        short_description: '',
        category: '',
        author_name: '',
        publisher_name: '',
        manufacturer_name: '',
        publication_date: '',
        original_price: 0,
        inStock: 0,
        quantity_sold: 0,
        avg_rating: 0,
        pages: 0,
        discount: 0,
    })

    const schema = yup
        .object({
            title: yup.string().required("Tên sách là bắt buộc"),
            short_description: yup.string().required("Mô tả chung là bắt buộc"),
            category: yup.string().required("Thể loại sách là bắt buộc"),
            author_name: yup.string().required("Tên tác giả là bắt buộc"),
            publisher_name: yup.string().required("Tên nhà cung cấp là bắt buộc"),
            manufacturer_name: yup.string().required("Tên nhà xuất bản là bắt buộc"),
            original_price: yup.string().required("giá bán là bắt buộc"),
            publication_date: yup.string().required("Ngày xuất bản là bắt buộc"),
            inStock: yup.string().required("Tồn kho là bắt buộc"),
            quantity_sold: yup.string().required("Số lượng đã bán là bắt buộc"),
            avg_rating: yup.string().required("Đánh giá là bắt buộc"),
            pages: yup.string().required("Số trang là bắt buộc"),
            discount: yup.string().required("Tỉ lệ giảm là bắt buộc"),
        })
        .required();
        
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
    })

    const onChange = (e) => {
        setBookInfo({ ...bookInfo, [e.target.name]: e.target.value });
    };

    const onSubmit = async (data) => {
        const { title, short_description, category, author_name, publisher_name, publication_date, manufacturer_name, original_price, inStock, quantity_sold, avg_rating, pages, discount, coverBooks } = data;
        window.scrollTo(0, 0);
        setLoading(true)
        try {
            const formData = new FormData()
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(publication_date)) {
                MyAlert.Alert('info', 'Ngày xuất bản không đúng định dạng yyyy-mm-dd');
                setLoading(false);
                return;
            }
            formData.append('title', title)
            formData.append('short_description', short_description)
            formData.append('category', category)
            formData.append('author_name', author_name)
            formData.append('publisher_name', publisher_name)
            formData.append('publication_date', publication_date)
            formData.append('manufacturer_name', manufacturer_name)
            formData.append('inStock', inStock)
            formData.append('quantity_sold', quantity_sold)
            formData.append('avg_rating', avg_rating)
            formData.append('original_price', original_price)
            formData.append('pages', pages)
            formData.append('discount', discount)
            if (coverBooks.length < 4) {
                MyAlert.Alert('info', 'Vui lòng chọn 4 ảnh')
                setLoading(false);
            } else {
                for (let i = 0; i < coverBooks.length; i++) {
                    formData.append('coverBooks', coverBooks[i]);
                }
                await PublicRequest.post('/collection/', formData)
                MyAlert.Alert('success', 'Nhập thông tin sách mới thành công')
                setLoading(false)
                navigate('/check')
            }
        } catch (error) {
            setLoading(false)
            MyAlert.Alert('error', error.response.data)
        }
    }

    return (
        <div className=''>
        <Navbar onToggleSidebar={handleToggleSidebar}/>
        <div className='grid grid-cols-5 '>
          <div className={`col-span-1 `}>
            <Sidebar toggle={isSidebarOpen} active={active} />
          </div>
          <div className={`col-span-4 transition-all ease-in-out duration-300  flex flex-col justify-between ${isSidebarOpen ? ' ' : '-translate-x-[300px] mx-auto w-[98vw]'}`}>
            <div className=' mt-[60px] mb-12'>
              <h1 className='font-semibold text-5xl ml-16 my-5 '>Nhập sách mới</h1>
                <FormCreate onChange={onChange} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} errors={errors} loading={loading}/>
            </div>
            <div className='h-[80px]'><Footer/></div>
          </div>
        </div>
      </div>
    )
}
