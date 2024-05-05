import React, { useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import { Chart as ChartJs } from 'chart.js/auto';
import {UserRequest} from '../../service/Request'

export default function Chart({isSidebarOpen}) {
    const [statisData, setStatisData] = useState([]);
    const [orderData, setOrderData] = useState({
        labels: [],
        datasets: [{
            label: 'Số đơn hàng',
            data: [],
            yAxisID: 'y',
        },
        {
            label: 'Tổng doanh thu (vnđ)',
            data: [],
            color: 'red',
            yAxisID: 'y1',
        }]
    });
    
    useEffect(() => {
        const getStatistic = async () => {
            const rs = await UserRequest.get('/order/statistics')
            setStatisData(rs.data)
        }
        getStatistic()
    },[])
    
    useEffect(() => {
        if (statisData.length > 0) {
            setOrderData({
                labels: statisData.map((data) => (data.ngay).split('T')[0]),
                datasets: [{
                    label: 'Số đơn hàng',
                    data: statisData.map(data => data.so_luong_don_hang),
                    yAxisID: 'y',
                },
                {
                    label: 'Tổng doanh thu (vnđ)',
                    data: statisData.map(data => parseInt(data.tong_so_tien)),
                    color: 'red',
                    yAxisID: 'y1',
                }]
            });
        }
    }, [statisData]);
    
    
    return (
        <div className={isSidebarOpen === false ? 'w-[950px] ml-16 mt-8 bg-white p-10 rounded-2xl': 'w-[800px] ml-8 mt-8 bg-white p-10 rounded-2xl'}>
            <Line data={orderData}/>
        </div>
    );
    
}
