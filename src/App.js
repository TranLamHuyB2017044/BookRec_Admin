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
