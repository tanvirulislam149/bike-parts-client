import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from "../../../firebase.init";
import "./Header.css";
import logo from "../../../assets/bike-logo.png"

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userName, setUserName] = useState();
  console.log(user?.displayName);
  useEffect(() => {
    fetch(`https://autoparts-vsj8.onrender.com/headerName/${user?.email}`)
      .then(res => res.json())
      .then(data => setUserName(data.name))
  }, [user])

  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem('accessToken');
  }

  const menu =
    <>
      <li><Link className='md:py-0 font-bold text-xl text-white' to="/">Home</Link></li>
      <li><Link className='md:py-0 font-bold text-xl text-white' to="/blogs">Blogs</Link></li>
      {/* <li><Link className='md:py-0 font-bold' to="/myPortfolio">Portfolio</Link></li> */}

    </>
  return (
    <div className='sticky top-0 z-50 rajdhani-font'>
      <div class="px-2 md:px-10 navbar text-white bg-black border-b-4 border-red-500 py-0">
        <div class="navbar">
          <Link className='text-2xl md:pl-10 orange-color font-bold' to="/">
            <img className='w-24' src={logo} alt="" />BikeParts
          </Link>
        </div>
        <div class="navbar-end">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabindex="0" class="menu rounded-none dropdown-content p-2 shadow bg-black w-52 mt-4">
              {menu}
              {
                user ? <>
                  <li><Link className='md:py-0 text-xl' to="/dashboard"><button class="font-bold">Dashboard</button></Link></li>
                  {/* <p className='btn bg-white text-gray-900 font-bold'>{userName?.split(" ")[0]}</p> */}
                  <p className='text-white border-2 border-red-500 p-3 text-center w-10/12 mx-auto font-bold text-xl'>{user?.displayName?.split(" ")[0].toUpperCase()}</p>
                  {/* <li><button onClick={() => signOut(auth)} class="md:py-0 text-xl login-btn btn rounded-none">LOG OUT</button></li> */}
                  <li><Link onClick={() => signOut(auth)} className='md:py-0' to=""><button class="md:py-0 text-xl w-full login-btn btn rounded-none">LOG OUT</button></Link></li>
                </> :
                  <li><Link className='md:py-0' to="/login"><button class="text-xl w-full login-btn btn rounded-none">LOGIN</button></Link></li>
              }
            </ul>
          </div>
          <div class="navbar-end hidden lg:flex">
            <ul class="menu menu-horizontal p-0">
              {menu}
              {
                user ? <>
                  <li><Link className='md:py-0' to="/dashboard"><button class="font-bold text-xl">Dashboard</button></Link></li>
                  {/* <p className='bg-white text-gray-900 font-bold'>{userName?.split(" ")[0]}</p> */}
                  <p className='text-white border-2 border-red-500 p-2 m-0 my-auto font-bold text-xl'>{user?.displayName?.split(" ")[0].toUpperCase()}</p>
                  {/* <li><button onClick={() => handleSignOut()} class="login-btn text-xl p-3 m-3 my-auto rounded-none btn">LOG OUT</button></li> */}
                  <li><Link onClick={() => handleSignOut()} className='md:py-0' to=""><button class="login-btn text-xl mr-5 rounded-none btn">LOG OUT</button></Link></li>
                </> :
                  <li><Link className='md:py-0' to="/login"><button class="login-btn text-xl rounded-none btn">LOGIN</button></Link></li>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;