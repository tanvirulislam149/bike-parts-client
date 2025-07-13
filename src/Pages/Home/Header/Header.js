import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import "./Header.css";
import logo from "../../../assets/bike-logo.png";
import { TfiMenuAlt } from "react-icons/tfi";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);

  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  const menu = (
    <>
      <li>
        <Link
          className="md:py-0 font-bold text-xl text-white active:bg-red-500"
          to="/"
        >
          Home
        </Link>
      </li>
      <li>
        <a
          className="md:py-0 font-bold text-xl text-white active:bg-red-500"
          href="/#parts"
        >
          Parts
        </a>
      </li>
      <li>
        <Link
          className="md:py-0 font-bold text-xl text-white active:bg-red-500"
          to="/blogs"
        >
          Blogs
        </Link>
      </li>
      {!user ? (
        <div className="avatar">
          <div className="w-11 h-11 rounded-full m-auto">
            <img src="https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg" />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
  return (
    <div className="sticky top-0 z-50 rajdhani-font">
      <div class="px-5 navbar text-white bg-black border-b-4 border-red-500 py-0">
        <div class="navbar">
          <Link className="text-2xl md:pl-10 orange-color font-bold" to="/">
            <img className="w-24" src={logo} alt="" />
            BikeParts
          </Link>
        </div>
        <div class="navbar-end w-11/12">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
              <TfiMenuAlt className="w-8 h-8" />
            </label>
            <ul
              tabindex="0"
              class="menu rounded-none dropdown-content p-2 shadow bg-black w-52 mt-4"
            >
              {menu}
              {user ? (
                <>
                  <li>
                    <Link
                      className="md:py-0 text-xl active:bg-red-500"
                      to="/dashboard"
                    >
                      <button class="font-bold">Dashboard</button>
                    </Link>
                  </li>
                  <div className="avatar mx-auto">
                    <div className="w-11 h-11 rounded-full">
                      <img src={user.photoURL} />
                    </div>
                  </div>
                  <li>
                    <Link
                      onClick={() => signOut(auth)}
                      className="md:py-0"
                      to=""
                    >
                      <button class="md:py-0 text-xl w-full login-btn btn rounded-none active:bg-black">
                        LOG OUT
                      </button>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link className="md:py-0" to="/login">
                    <button class="text-xl w-full login-btn btn active:bg-black rounded-none">
                      LOGIN
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div class="navbar-end w-full hidden lg:flex">
            <ul class="menu menu-horizontal p-0">
              {menu}
              {user ? (
                <>
                  <li>
                    <Link className="md:py-0 active:bg-red-500" to="/dashboard">
                      <button class="font-bold text-xl">Dashboard</button>
                    </Link>
                  </li>
                  <div className="avatar my-auto">
                    <div className="w-11 h-11 rounded-full">
                      <img src={user.photoURL} />
                    </div>
                  </div>
                  <li>
                    <Link
                      onClick={() => handleSignOut()}
                      className="md:py-0 active:bg-black"
                      to=""
                    >
                      <button class="login-btn text-xl rounded-none btn">
                        LOG OUT
                      </button>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link className="md:py-0 active:bg-black" to="/login">
                    <button class="login-btn text-xl rounded-none btn">
                      LOGIN
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
