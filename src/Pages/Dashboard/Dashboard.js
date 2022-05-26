import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin, setAdmin] = useState();
    useEffect(() => {
        fetch(`http://localhost:5000/checkAdmin/${user?.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data));
    }, [user])
    return (
        <div class="drawer drawer-mobile">
            <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                {/* <!-- Page content here --> */}
                <label for="dashboard-drawer" class="btn border-0 bg-accent-focus lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <div className=''>
                    <Outlet></Outlet>
                </div>

            </div>
            <div class="drawer-side">
                <label for="dashboard-drawer" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-48 bg-base-200 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    {
                        admin?.role !== "admin" && <>
                            <li><Link to="/dashboard/myOrders"> My Orders </Link></li>
                            <li><Link to="/dashboard/addReview"> Add Review </Link></li>
                        </>
                    }
                    <li><Link to="/dashboard"> My Profile </Link></li>
                    {
                        admin?.role === "admin" && <>
                            <li><Link to="/dashboard/allOrders"> Manage All Orders </Link></li>
                            <li><Link to="/dashboard/makeAdmin"> Make Admin </Link></li>
                            <li><Link to="/dashboard/addProduct"> Add Product </Link></li>
                            <li><Link to="/dashboard/manageProducts"> Manage Product </Link></li>
                        </>
                    }
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;