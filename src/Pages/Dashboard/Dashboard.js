import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import { TfiMenuAlt } from 'react-icons/tfi';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState();
  useEffect(() => {
    fetch(`https://autoparts-vsj8.onrender.com/checkAdmin/${user?.email}`)
      .then(res => res.json())
      .then(data => setAdmin(data));
  }, [user])
  return (
    <div class="drawer drawer-mobile">
      <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        {/* <!-- Page content here --> */}
        <div className='flex justify-between m-3 items-center'>
          <p className='text-3xl font-bold'>Dashboard</p>
          <label for="dashboard-drawer" class="btn border-0 bg-black lg:hidden">
            {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg> */}
            <TfiMenuAlt className='w-7 h-7' />
          </label>
        </div>
        <hr />
        <div className='my-14 md:mx-7 mx-2'>
          <Outlet></Outlet>
        </div>

      </div>
      <div class="drawer-side">
        <label for="dashboard-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-48 bg-base-200 text-base-content">
          {/* <!-- Sidebar content here --> */}
          {
            admin?.role !== "admin" && <>
              <li><Link className='focus:bg-zinc-300' to="/dashboard/myOrders"> My Orders </Link></li>
              <li><Link className='focus:bg-zinc-300' to="/dashboard/addReview"> Add Review </Link></li>
            </>
          }
          <li><Link className='focus:bg-zinc-300' to="/dashboard"> My Profile </Link></li>
          {
            admin?.role === "admin" && <>
              <li><Link className='focus:bg-zinc-300' to="/dashboard/allOrders"> Manage All Orders </Link></li>
              <li><Link className='focus:bg-zinc-300' to="/dashboard/makeAdmin"> Make Admin </Link></li>
              <li><Link className='focus:bg-zinc-300' to="/dashboard/addProduct"> Add Product </Link></li>
              <li><Link className='focus:bg-zinc-300' to="/dashboard/manageProducts"> Manage Product </Link></li>
            </>
          }
        </ul>

      </div>
    </div>
  );
};

export default Dashboard;