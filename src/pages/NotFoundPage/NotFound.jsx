import React from 'react'
import { Link } from 'react-router-dom'
import myIMG from '../../assets/NotFoundTom.png'
export default function NotFound() {
    return (
        <div className="h-screen w-screen bg-gray-100 flex items-center">
            <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                <div className="max-w-md">
                    <div className="text-7xl font-dark font-bold">404</div>
                    <p
                        className="text-2xl md:text-3xl  leading-normal mt-4"
                    >Sorry we couldn't find this page. </p>
                    <p className="mb-8 mt-5">But dont worry, you can find plenty of other things on our homepage.</p>

                    <button className="px-4 inline py-4 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"><Link to='/' className='text-2xl'>back to home page</Link></button>
                </div>
                <div className="max-w-lg">
                </div>
                <img src={myIMG} alt='tom not found' />
            </div>
        </div>
    )
}
