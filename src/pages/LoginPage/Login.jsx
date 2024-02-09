import React, { useState } from 'react'
import loginIMG from '../../assets/dont-make-me-think-krug.jpg'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { PublicRequest } from '../../service/Request'
import { useDispatch } from 'react-redux'
import MyAlert from '../../components/AlertComponent/Alert'
import { SignIn } from '../../store/userReducer'
import Loading from '../../components/LoadingComponent/Loading';

export default function Login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const schema = yup
    .object({
      email: yup
        .string()
        .required("Email is required")
        .email("email must be mail@example.com"),
      password: yup.string().required("Password is require").min(3),
    })
    .required();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const onLogin = async (data) => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const user = await PublicRequest.post('/api/user/login/admin', data)
        dispatch(SignIn(user.data))
        setLoading(false)
        MyAlert.Toast('success', 'Login successfully')
      } catch (error) {
        MyAlert.Alert('error', error.response.data)
        setLoading(false)
      }
    }, 2000)
  }

  const enterLogin = (e) => {
    if (e.key === 'Enter') {
      onLogin()
    }
  }
  return (
    <div className='flex bg-[#959aa0]'>
      <div className='basis-1/2'>
        <img className='h-screen' src={loginIMG} alt="login-img" />
      </div>
      <div className='basis-1/2 my-auto'>
        <h1 className='flex items-center justify-center text-6xl font-bold text-[#981d20]'>Admin Book Store</h1>
        {loading === false ? <form onSubmit={handleSubmit(onLogin)} className='p-8 flex flex-col items-center '>
          <div className='flex flex-col my-6'>
            <label htmlFor="email " className='text-white font-bold'>Email</label>
            <input className={` pl-2 w-[350px] h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.email ? 'border-[#ff0000]' : 'border-[#ccc]'}`} type='email' id="email" {...register("email", { required: true })} />
            <p className='text-red-600'>{errors.email?.message}</p>
          </div>
          <div className='flex flex-col my-6'>
            <label htmlFor="Password " className='text-white font-bold'>Mật Khẩu</label>
            <input className={` pl-2 w-[350px] h-[42px] border border-[#ccc] my-3 rounded-lg focus:outline-none ${errors.password ? 'border-[#ff0000]' : 'border-[#ccc]'}`} id="Password" {...register("password", { required: true })} type="password" />
            <p className='text-red-600'>{errors.password?.message}</p>
          </div>
          <button className='flex flex-col mt-6 h-[42px] bg-[#981d20] hover:bg-[#b44a4c] w-[350px] rounded-lg justify-center items-center cursor-pointer font-bold text-white' type='submit' onKeyDown={enterLogin}>ĐĂNG NHẬP</button>
        </form>
          : <Loading />}
      </div>
    </div>
  )
}
