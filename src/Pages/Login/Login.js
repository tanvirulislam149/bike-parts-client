import React, { useEffect } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Loading";
import useToken from "../useToken/useToken";
import { FcGoogle } from "react-icons/fc";
import { BiShow } from "react-icons/bi";
import "./Login.css";
import { useState } from "react";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, ResetError] =
    useSendPasswordResetEmail(auth);
  const [loadingState, setLoadingState] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();
  const [token] = useToken(user || gUser);
  const [showPass, setShowPass] = useState(false);

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      setLoadingState(false);
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  if (loading || gLoading || loadingState) {
    return <Loading></Loading>;
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

  if (user) {
    setLoadingState(true);
  }

  if (gUser) {
    setLoadingState(true);
    // navigate(from, { replace: true });
    const userData = {
      name: gUser.user.displayName,
      email: gUser.user.email,
    };
    fetch("https://autoparts-vsj8.onrender.com/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(email, password);
  };

  const handleGoogle = () => {
    signInWithGoogle();
  };

  const handleForgotPass = async () => {
    const success = await sendPasswordResetEmail(email);
    setEmail("");
  };

  return (
    <div class="hero h-screen bg-base-200">
      <div class="md:w-2/4 w-full mb-5 py-10 hero-content p-0">
        <div class="card w-full max-w-sm shadow-2xl rounded-none pb-8 bg-base-100">
          <form onSubmit={handleSignIn}>
            <div class="card-body p-4 py-8 md:p-8 md:pb-2">
              <p className="text-4xl text-center font-bold orange-color rajdhani-font">
                Login
              </p>
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                class="input border-red-500 rounded-none input-bordered"
              />
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <div className="password-cont">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter Your Password"
                  class="input border-red-500 rounded-none input-bordered w-full"
                />
                <BiShow
                  onClick={() => setShowPass(!showPass)}
                  className="show-btn"
                />
              </div>
              <label class="flex justify-between items-center">
                <div>
                  <Link
                    to="/register"
                    className="label-text-alt link link-hover"
                  >
                    <u>Create An Account</u>
                  </Link>
                </div>
                <div>
                  <label
                    htmlFor="forgotPass"
                    className="label-text-alt text-black cursor-pointer"
                  >
                    <u>Forgot Password</u>
                  </label>
                </div>
              </label>
              <input
                style={{ backgroundColor: "#f73312" }}
                className="btn border-0 font-normal text-base rounded-none"
                type="submit"
                value="Login"
              />
            </div>
          </form>
          <div className="flex justify-between mx-8 mb-4 font-bold">
            <button
              onClick={() =>
                signInWithEmailAndPassword("shuvo@gmail.com", "asdfasdf")
              }
              className="bg-red-500 text-white px-2 py-1"
            >
              Login as user
            </button>
            <button
              onClick={() =>
                signInWithEmailAndPassword("admin@gmail.com", "asdfasdf")
              }
              className="bg-red-500 text-white px-2 py-1"
            >
              Login as admin
            </button>
          </div>
          <div class="divider px-0 divide-line mx-auto my-0">OR</div>
          <div className="text-center">
            <button
              onClick={handleGoogle}
              className="btn bg-white font-normal text-base hover:text-white hover:bg-black text-black border-2 border-red-500 rounded-none w-3/4 h-full my-4"
            >
              {" "}
              <FcGoogle className="w-6 h-6 mr-2" />
              Continue With Google
            </button>
          </div>
        </div>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="forgotPass" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg"></h3>
            <p className="mb-3 text-black">Enter Email For Reset Password</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="forgotPass"
              placeholder="Enter Your Email"
              class="input text-black w-full border-red-500 rounded-none input-bordered"
            />
            <div className="modal-action">
              <label
                htmlFor="forgotPass"
                onClick={handleForgotPass}
                style={{ backgroundColor: "#f73312" }}
                className="btn border-0 rounded-none"
              >
                Send Email
              </label>
              <label
                htmlFor="forgotPass"
                style={{ backgroundColor: "#f73312" }}
                className="btn border-0 rounded-none"
              >
                Close
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
