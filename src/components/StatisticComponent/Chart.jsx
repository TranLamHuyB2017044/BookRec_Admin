import React from 'react'
import { Line } from 'react-chartjs-2';
import { OrderData, RevenueData } from '../../data';
import { useState } from 'react';
import { Chart as ChartJs } from 'chart.js/auto';


export default function Chart({isSidebarOpen}) {
    console.log(OrderData)
    const [orderData, setOrderData] = useState({
        labels: OrderData.map((data) => data.date),
        datasets:[{
            label: 'Số đơn hàng',
            data: OrderData.map(data => data.value),
            yAxisID: 'y',
        },
        {
            label: 'Tổng doanh thu (vnđ)',
            data: RevenueData.map(data => data.value),
            color: 'red',
            yAxisID: 'y1',
        }
    ],
        
    })
  return (
    <div className={isSidebarOpen === false ? 'w-[950px] ml-16 mt-8 bg-white p-10 rounded-2xl': 'w-[800px] ml-8 mt-8 bg-white p-10 rounded-2xl'}>
        <Line data={orderData}/>
    </div>
  )
}
