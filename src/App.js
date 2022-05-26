import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import Header from "./Pages/Home/Header"
import Blogs from './Pages/Blogs';
import Purchase from './Pages/Purchase';
import Register from './Pages/Register';
import Login from "./Pages/Login";
import { ToastContainer } from 'react-toastify';
import RequiredAuth from "./RequiredAuth";
import Dashboard from './Pages/Dashboard/Dashboard';
import MyOrders from './Pages/Dashboard/MyOrders';
import AddReview from './Pages/Dashboard/AddReview';
import PaymentPage from './Pages/PaymentPage';
import MyProfile from './Pages/MyProfile';
import ManageAllOrders from './Pages/Dashboard/ManageAllOrders';
import MakeAdmin from './Pages/Dashboard/MakeAdmin';
import RequiredAdmin from "./RequiredAdmin";
import AddProduct from './Pages/Dashboard/AddProduct';
import MyPortfolio from './Pages/MyPortfolio';
import NotFound from './Pages/NotFound';
import ManageProducts from './Pages/Dashboard/ManageProducts';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/purchase/:partsId" element={<RequiredAuth><Purchase></Purchase></RequiredAuth>}></Route>
        <Route path="/payment/:orderId" element={<RequiredAuth><PaymentPage></PaymentPage></RequiredAuth>}></Route>
        <Route path="/blogs" element={<Blogs></Blogs>}></Route>
        <Route path="/myPortfolio" element={<MyPortfolio></MyPortfolio>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}>
          <Route path="/dashboard/myOrders" element={<MyOrders></MyOrders>}></Route>
          <Route path='/dashboard/addReview' element={<AddReview></AddReview>}></Route>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path='/dashboard/allOrders' element={<RequiredAuth><RequiredAdmin><ManageAllOrders></ManageAllOrders></RequiredAdmin></RequiredAuth>}></Route>
          <Route path='/dashboard/makeAdmin' element={<RequiredAuth><RequiredAdmin><MakeAdmin></MakeAdmin></RequiredAdmin></RequiredAuth>}></Route>
          <Route path='/dashboard/addProduct' element={<RequiredAuth><RequiredAdmin><AddProduct></AddProduct></RequiredAdmin></RequiredAuth>}></Route>
          <Route path='/dashboard/manageProducts' element={<RequiredAuth><RequiredAdmin><ManageProducts></ManageProducts></RequiredAdmin></RequiredAuth>}></Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </div>
  );
}

export default App;
