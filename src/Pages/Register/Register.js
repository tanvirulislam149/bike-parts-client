import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from "../../firebase.init";
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from '../Loading';
import useToken from '../useToken/useToken';
import "./Register.css";
import { BiShow } from 'react-icons/bi';
import axios from 'axios';

const Register = ({ setName }) => {
  const [createUserWithEmailAndPassword, cUser, cLoading, cError,] = useCreateUserWithEmailAndPassword(auth);
  const { register, handleSubmit, reset } = useForm();
  const [updateProfile, updating, uError] = useUpdateProfile(auth);
  const [user, loading, error] = useAuthState(auth);
  let navigate = useNavigate();
  const [token] = useToken(cUser);
  const [showPass, setShowPass] = useState(false);
  const [showConfimPass, setShowConfimPass] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const toastId = React.useRef(null);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate])

  if (cLoading || loading || updating || registerLoading) {
    return <Loading></Loading>
  }

  if (cError || error || uError) {
    const err = error?.message || uError?.message || cError?.message;
    const customId = "custom-id-yes";
    toast.error(`${err?.split("/")[1]?.split(")")[0]?.toUpperCase()}`, {
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



  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("PASSWORD DIDN'T MATCH", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return
    }
    setRegisterLoading(true);


    const image = data.picture[0];
    const pic = new FormData();
    pic.append("file", image);
    pic.append("upload_preset", "creative_agencies")
    pic.append("cloud_name", "tanvirulislam149")
    axios.post("https://api.cloudinary.com/v1_1/tanvirulislam149/image/upload", pic)
      .then(async res => {
        if (res.data.url) {
          console.log(res.data.url);
          const displayName = data.name;
          const email = data.email;
          const password = data.password;
          await createUserWithEmailAndPassword(email, password);
          await updateProfile({ displayName, photoURL: res.data.url });
          setRegisterLoading(false);
          reset();
        }
      })
      .catch(err => {
        // console.log(err.message);
        if (err.message === "Request failed with status code 401") {
          setRegisterLoading(false);
          toast.dismiss(toastId.current);
          toast.error("Image upload failed. Please try again.");
        }
      })
  };


  if (user) {
    const customId = "custom-id-yes";
    toast.success(`Registration Successful. Welcome ${user.displayName}`, {
      toastId: customId,
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const userData = {
      name: user.displayName,
      email: user.email,
    }
    setName(user.displayName);
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





  return (
    <div class="hero h-full bg-base-200">
      <div class="md:w-2/4 w-full py-16 hero-content ">
        <div class="card w-full my-2 max-w-sm shadow-2xl rounded-none bg-base-100">
          <div className='card-body w-full'>
            <p className='text-4xl rajdhani-font orange-color text-center font-bold'>Register</p>
            <form onSubmit={handleSubmit(onSubmit)} id="form">
              <input type="text" {...register("name", { required: true })} placeholder="Enter Your Name" class="input my-2 w-full border-red-500 rounded-none input-bordered" />
              <input type="email" {...register("email", { required: true })} placeholder="Enter Your Email" class="input w-full border-red-500 rounded-none my-2 input-bordered" />
              <input type="file" {...register("picture", { required: true })} placeholder="Enter Product Image Url" class="input picture w-full rounded-none border-red-500 my-2 p-0 input-bordered" />
              <div className='password-cont'>
                <input type={showPass ? "text" : "password"} {...register("password", { required: true })} placeholder="Enter Password" class="input w-full border-red-500 rounded-none my-2 input-bordered" />
                <BiShow onClick={() => setShowPass(!showPass)} className='passShow-btn' />
              </div>
              <div className='password-cont'>
                <input type={showConfimPass ? "text" : "password"} {...register("confirmPassword", { required: true })} placeholder="Confirm Password" class="input w-full border-red-500 rounded-none my-2 input-bordered" />
                <BiShow onClick={() => setShowConfimPass(!showConfimPass)} className='passShow-btn' />
              </div>
              <Link to="/login" className='label-text-alt link link-hover'><u>Have An Account? Go To Login</u></Link>
              <input className='btn bg-red-500 rounded-none border-0 w-full font-normal text-base my-2' type="submit" value={"Sign Up"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;