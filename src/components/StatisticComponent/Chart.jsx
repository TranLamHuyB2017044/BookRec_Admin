import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js/auto';
import { UserRequest } from '../../service/Request';

export default function Chart({ isSidebarOpen }) {
    const [statisData, setStatisData] = useState([]);
    const [orderData, setOrderData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Tổng chi (vnđ)',
                data: [],
                yAxisID: 'y',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Tổng doanh thu (vnđ)',
                data: [],
                yAxisID: 'y1',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            }
        ]
    });
    useEffect(() => {
        const getStatistic = async () => {
            const rs = await UserRequest.get('/purchase/getMonthlyStatistics');
            setStatisData(rs.data);
        };
        getStatistic();
    }, []);
    const [maxValue, setMaxValue] = useState(0)
    useEffect(() => {
        if (statisData.length > 0) {
            const maxExpense = Math.max(...statisData.map(data => parseInt(data.total_expense)));
            const maxRevenue = Math.max(...statisData.map(data => parseInt(data.total_revenue)));

            const maxValue = Math.max(maxExpense, maxRevenue);
            const roundedMaxValue = Math.ceil(maxValue);

            setMaxValue(roundedMaxValue);
            setOrderData({
                labels: statisData.map((data) => `${data.month}/${data.year}`),
                datasets: [
                    {
                        label: 'Tổng chi (vnđ)',
                        data: statisData.map(data => parseInt(data.total_expense)),
                        yAxisID: 'y',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Tổng doanh thu (vnđ)',
                        data: statisData.map(data => parseInt(data.total_revenue)),
                        yAxisID: 'y1',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    }
                ]
            });
        }
    }, [statisData]);

    return (
        <div className={isSidebarOpen === false ? 'w-[1200px] h-[500px] mx-auto mt-8 bg-white p-10 rounded-2xl' : 'w-[1100px] h-[500px] ml-8 mt-8 bg-white p-10 rounded-2xl'}>
            <Bar data={orderData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        position: 'left',
                    },
                    y1: {
                        beginAtZero: true,
                        position: 'right',
                    }
                }
            }} />
        </div>
    );
}
