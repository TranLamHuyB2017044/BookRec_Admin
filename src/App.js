import {
  BrowserRouter,
  Routes,
  Route,
  Navigate, Outlet
} from "react-router-dom";
import NotFound from "./pages/NotFoundPage/NotFound";
import AdminHome from "./pages/HomePage/AdminHome.jsx";
import Login from "./pages/LoginPage/Login.jsx";
import { useSelector } from "react-redux";
import FormUpdate from "./components/BookListComponent/UpdateBook/formUpdate.jsx";
import ManageOrders from "./pages/OrderUsersPage/manageOrders.jsx";
import DetailOrder from "./pages/DetailOrderPage/DetailOrder.jsx";
import UserList from "./pages/ManageUsersPage/UserList.jsx";
import Statistic from "./pages/StatisticsPage/Statistic.jsx";
import OrderBooks from "./pages/OrderBooksPage/OrderBooks.jsx";
import PromotionDetail from "./pages/DiscountDetailPage/PromotionDetail.jsx";
import Promotion from "./pages/DiscountPage/promotion.jsx";

function App() {
  const user = useSelector(state => state.currentUser)
  const ProtectedRoute = () => {
    if (user) {
      return <Navigate to='/' replace />
    }
    return <Outlet />
  }
  const ProtectedUser = () => {
    if (user == null) {
      return <Navigate to='/login' replace />
    }
    return <Outlet />
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedUser />}>
          <Route path="/" element={<AdminHome />} />
          <Route path="/update/:slug" element={<FormUpdate />} />
          <Route path="/manageOrders" element={<ManageOrders/>} />
          <Route path="/manageOrders/:orderId" element={<DetailOrder/>} />
          <Route path="/manageUsers" element={<UserList/>} />
          <Route path="/manageBookOrders" element={<OrderBooks/>} />
          <Route path="/statistic" element={<Statistic/>} />
          <Route path="/promotion" element={<Promotion/>} />
          <Route path="/promotion/:promotionId" element={<PromotionDetail/>} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
