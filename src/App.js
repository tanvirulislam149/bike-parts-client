import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import Header from "./Pages/Home/Header/Header"
import Blogs from './Pages/Blogs';
import Purchase from './Pages/Purchase/Purchase';
import Register from './Pages/Register/Register';
import Login from "./Pages/Login/Login";
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
import Footer from './Pages/Home/Footer/Footer';
import { useState } from 'react';
import DeleteModal from './Pages/DeleteModal';

function App() {
  const [modal, setModal] = useState(false);


  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/purchase/:partsId" element={<RequiredAuth><Purchase></Purchase></RequiredAuth>}></Route>
        <Route path="/payment/:orderId" element={<RequiredAuth><PaymentPage></PaymentPage></RequiredAuth>}></Route>
        <Route path="/blogs" element={<Blogs></Blogs>}></Route>
        {/* <Route path="/myPortfolio" element={<MyPortfolio></MyPortfolio>}></Route> */}
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
        <Route path='/dashboard' element={<RequiredAuth><Dashboard></Dashboard></RequiredAuth>}>
          <Route path="/dashboard/myOrders" element={<MyOrders setModal={setModal} modal={modal}></MyOrders>}></Route>
          <Route path='/dashboard/addReview' element={<AddReview></AddReview>}></Route>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path='/dashboard/allOrders' element={<RequiredAuth><RequiredAdmin><ManageAllOrders setModal={setModal} modal={modal}></ManageAllOrders></RequiredAdmin></RequiredAuth>}></Route>
          <Route path='/dashboard/makeAdmin' element={<RequiredAuth><RequiredAdmin><MakeAdmin></MakeAdmin></RequiredAdmin></RequiredAuth>}></Route>
          <Route path='/dashboard/addProduct' element={<RequiredAuth><RequiredAdmin><AddProduct></AddProduct></RequiredAdmin></RequiredAuth>}></Route>
          <Route path='/dashboard/manageProducts' element={<RequiredAuth><RequiredAdmin><ManageProducts setModal={setModal} modal={modal}></ManageProducts></RequiredAdmin></RequiredAuth>}></Route>
        </Route>
      </Routes>
      <Footer></Footer>
      <DeleteModal setModal={setModal} />
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
