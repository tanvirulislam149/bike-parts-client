import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from "../../firebase.init";

const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userName, setUserName] = useState();
    useEffect(() => {
        fetch(`https://pacific-inlet-53322.herokuapp.com/headerName/${user?.email}`)
            .then(res => res.json())
            .then(data => setUserName(data.name))
    }, [user])

    const handleSignOut = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    }

    const menu =
        <>
            <li><Link className='md:py-0 font-bold' to="/blogs">Blogs</Link></li>
            <li><Link className='md:py-0 font-bold' to="/myPortfolio">Portfolio</Link></li>

        </>
    return (
        <div className='sticky top-0 z-50'>
            <div class="px-2 md:px-10 navbar bg-white py-0">
                <div class="navbar">
                    <Link className='text-3xl text-gray-700 font-bold' to="/"><img className='w-10 inline' src="https://png.pngitem.com/pimgs/s/210-2102350_collection-of-free-engine-vector-auto-repair-car.png" alt="" />AutoParts</Link>
                </div>
                <div class="navbar-end">
                    <div class="dropdown dropdown-end ">
                        <label tabindex="0" class="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-white rounded-box w-52 mt-4">
                            {menu}
                            {
                                user ? <>
                                    <li><Link className='md:py-0' to="/dashboard"><button class="font-bold">Dashboard</button></Link></li>
                                    <p className='btn bg-white text-gray-900 font-bold'>{userName?.split(" ")[0]}</p>
                                    <li><button onClick={() => signOut(auth)} class="btn md:py-0 bg-accent-focus border-0">Log Out</button></li>
                                </> :
                                    <li><Link className='md:py-0' to="/login"><button class="btn bg-accent-focus border-0">Login</button></Link></li>
                            }
                        </ul>
                    </div>
                    <div class="navbar-end hidden lg:flex">
                        <ul class="menu menu-horizontal p-0">
                            {menu}
                            {
                                user ? <>
                                    <li><Link className='md:py-0' to="/dashboard"><button class=" font-bold">Dashboard</button></Link></li>
                                    <p className='btn bg-white text-gray-900 font-bold'>{userName?.split(" ")[0]}</p>
                                    <li><button onClick={() => handleSignOut()} class="btn mx-3 text-white font-bold md:py-0 bg-accent-focus border-0">Log Out</button></li>
                                </> :
                                    <li><Link className='md:py-0' to="/login"><button class="btn bg-accent-focus border-0">Login</button></Link></li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;