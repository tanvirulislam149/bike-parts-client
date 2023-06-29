import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from "../Loading";
import useToken from '../useToken/useToken';
import { FcGoogle } from "react-icons/fc";
import { BiShow } from "react-icons/bi";
import "./Login.css";
import { useState } from 'react';

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  let navigate = useNavigate();
  let location = useLocation();
  const [token] = useToken(user || gUser);
  const [showPass, setShowPass] = useState(false);

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate])

  if (loading || gLoading) {
    return <Loading></Loading>
  }

  if (error || gError) {
    const err = error?.message || gError?.message;
    const customId = "custom-id-yes";
    toast.error(`${err.split("/")[1].split(")")[0].toUpperCase()}`, {
      toastId: customId,
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }



  if (gUser) {
    // navigate(from, { replace: true });
    const userData = {
      name: gUser.user.displayName,
      email: gUser.user.email,
    }
    fetch("https://autoparts-vsj8.onrender.com/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }


  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(email, password);
  }

  const handleGoogle = () => {
    signInWithGoogle();
  }



  return (
    <div class="hero h-screen bg-base-200">
      <div class="md:w-2/4 w-full mb-5 py-10 hero-content">
        <div class="card w-full max-w-sm shadow-2xl rounded-none pb-8 bg-base-100">
          <form onSubmit={handleSignIn}>
            <div class="card-body">
              <p className='text-4xl text-center font-bold orange-color rajdhani-font'>Login</p>
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input type="text" name='email' placeholder="Enter Your Email" class="input border-red-500 rounded-none input-bordered" />
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <div className='password-cont'>
                <input type={showPass ? "text" : "password"} name='password' placeholder="Enter Your Password" class="input border-red-500 rounded-none input-bordered w-full" />
                <BiShow onClick={() => setShowPass(!showPass)} className='show-btn' />
              </div>
              <label class="label">
                <Link to="/register" className='label-text-alt link link-hover'><u>Create An Account</u></Link>
              </label>
              <input style={{ backgroundColor: "#f73312" }} className="btn border-0 font-normal text-base rounded-none" type="submit" value="Login" />
            </div>
          </form>
          <div class="divider px-16 my-0">OR</div>
          <div className='text-center'>
            <button onClick={handleGoogle} className='btn bg-white font-normal text-base hover:text-white hover:bg-black text-black border-2 border-red-500 rounded-none  md:w-80 my-4'> <FcGoogle className='w-6 h-6 mr-2' />Continue With Google</button>
          </div>
        </div>

      </div>
    </div >
  );
};

export default Login;