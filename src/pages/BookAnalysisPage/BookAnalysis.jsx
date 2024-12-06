import Navbar from '../../components/NavbarComponent/Navbar'
import { useEffect, useState } from 'react';
import Footer from '../../components/FooterComponent/Footer';
import Sidebar from '../../components/SideBarComponent/Sidebar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Bar } from 'react-chartjs-2';
import KeywordAnalysis from './KeywordAnalysis';
import { Button, TextField, } from '@mui/material';
import { UserRequest } from '../../service/Request';
import MyAlert from '../../components/AlertComponent/Alert'
export default function BookAnalysis() {

  const active = 5
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [classificationResult, setClassificationResult] = useState('');
  const [numberRatingByStar, setNumberRatingByStar] = useState([]);

  useEffect(() => {
    const getNumberRatingByStar = async () => {
      const rs = await UserRequest.get('/rating')
      setNumberRatingByStar(rs.data)
    }

    getNumberRatingByStar()
  }, [])

  const chartData = {
    labels: numberRatingByStar.map((label) => label.n_star).sort().reverse(),
    datasets: [
      {
        label: 'Số lượng đánh giá',

        data: numberRatingByStar.map((label) => label.rating_count).sort().reverse(),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  };



  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 200
        }
      }
    }
  };

  function createData(image, title, instock, sold, nRatings, summary) {
    return { image, title, instock, sold, nRatings, summary };
  }

  const rows = [
    createData('https://www.ynharari.com/wp-content/uploads/2017/01/sapiens.png', 'Sapien Lược sử loài người', 159, 6.0, 24, 'Cực kì hài lòng'),

  ];


  const keywordData = [
    { keyword: 'Tuyệt vời', verySatisfied: 200, satisfied: 80, neutral: 10, veryDissatisfied: 5, totalCount: 295, percentage: 29.5 },
    { keyword: 'Thất vọng', verySatisfied: 5, satisfied: 10, neutral: 20, veryDissatisfied: 120, totalCount: 155, percentage: 15.5 },
  ];

  const handlePredictKeyword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!inputText.trim()) {
      MyAlert.Alert('info', 'Vui lòng nhập từ khóa!');
      setIsLoading(false);
      return;
    }

    try {
      const response = await UserRequest.post('http://127.0.0.1:8000/predict', { inputText: inputText });

      if (response.status === 200) {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const data = response.data;
        setClassificationResult(data.prediction);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      setClassificationResult('Không thể phân lớp từ khóa!');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div>
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <div className='grid grid-cols-5 h-fit'>
        <div className={`col-span-1 `}>
          <Sidebar toggle={isSidebarOpen} active={active} />
        </div>
        <div className={`col-span-4 transition-all ease-in-out duration-300  flex flex-col justify-between ${isSidebarOpen ? ' ' : '-translate-x-[300px] mx-auto w-[98vw]'}`}>
          <div className=' mt-[60px] mb-12'>
            <h1 className='font-semibold text-5xl ml-16 mt-12'>Hệ thống đánh giá sách dựa trên bình luận khách hàng</h1>

            <div className='my-8'>
              <div className='bg-white rounded-2xl mx-16 p-8'>
                <h2 className='font-semibold text-2xl border-b pb-4'>Biểu đồ thống kê bình luận theo số sao</h2>
                <div className='mt-8'>
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
            {/* <div className='bg-white rounded-2xl mx-16'>
              <h2 className='font-semibold text-2xl p-8 border-b'>Phân tích chi tiết sách</h2>

              <TableContainer >
                <Table >
                  <TableHead>
                    <TableRow >
                      <TableCell sx={{ fontSize: '1.5rem' }}>Hình ảnh</TableCell>
                      <TableCell sx={{ fontSize: '1.5rem' }}>Tên sách</TableCell>
                      <TableCell sx={{ fontSize: '1.5rem' }}>Số lượng đã bán</TableCell>
                      <TableCell sx={{ fontSize: '1.5rem' }}>Tồn kho</TableCell>
                      <TableCell sx={{ fontSize: '1.5rem' }}>Số lượt đánh giá</TableCell>
                      <TableCell sx={{ fontSize: '1.5rem' }}>Tổng hợp</TableCell>
                      <TableCell sx={{ fontSize: '1.5rem' }}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontSize: '1.2rem' }}
                      >
                        <TableCell align="left">
                          <img src={row.image} width='100' height='100' alt="cover" />
                        </TableCell>
                        <TableCell align="left" sx={{ fontSize: '1.5rem' }}>{row.title}</TableCell>
                        <TableCell align="left" sx={{ fontSize: '1.5rem' }}>{row.sold}</TableCell>
                        <TableCell align="left" sx={{ fontSize: '1.5rem' }}>{row.instock}</TableCell>
                        <TableCell align="left" sx={{ fontSize: '1.5rem' }}>{row.nRatings}</TableCell>
                        <TableCell align="left" sx={{ fontSize: '1.5rem', color: 'rgba(75, 192, 192, 1)' }}>{row.summary}</TableCell>
                        <TableCell align="left" sx={{ fontSize: '1.5rem', color: 'dodgerblue', cursor: 'pointer' }}>Xem chi tiết</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div> */}
            {/* <div className='bg-white rounded-2xl mx-16 my-12'>
              <h2 className='font-semibold text-2xl p-8 border-b'>Phân tích từ khóa đánh giá</h2>
              <KeywordAnalysis keywordData={keywordData} />
            </div> */}
            <div className='bg-white rounded-2xl mx-16 my-12'>
              <h2 className='font-semibold text-2xl p-8 border-b'>Phân lớp mức độ hài lòng dựa trên bình luận</h2>
              <form onSubmit={handlePredictKeyword} className='flex gap-4 items-baseline'>
                <TextField
                  label="Nhập từ khóa"
                  variant="outlined"
                  multiline
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  InputProps={{
                    style: { fontSize: '1.2rem' },
                  }}
                  InputLabelProps={{
                    style: { fontSize: '1.2rem' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: 'gray' },
                      '&:hover fieldset': { borderColor: 'dodgerblue' },
                      '&.Mui-focused fieldset': { borderColor: 'dodgerblue' },
                    },
                  }}
                  style={{ marginTop: '20px', marginBottom: '20px', width: '35%', marginLeft: '20px' }}
                />
                <Button
                  size="large"
                  type='submit'
                  sx={{ height: '50px' }}
                  variant="outlined"
                >
                  Dự đoán
                </Button>
              </form>

              {classificationResult && (
                <div className="p-4 mt-4 bg-gray-100 rounded-md">
                  {!isLoading && <h3 className="font-semibold text-lg">Kết quả phân lớp:</h3>}
                  {isLoading ? <pre>
                    Loading...
                  </pre> : <pre>{classificationResult}</pre>}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='h-[80px]'><Footer /></div>
      </div>
    </div>
  )
}
