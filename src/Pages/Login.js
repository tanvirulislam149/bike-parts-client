import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Loading from "./Loading";
import useToken from './useToken/useToken';

const Login = () => {
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    let navigate = useNavigate();
    let location = useLocation();
    const [token] = useToken(user || gUser);

    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [user, gUser, token, from, navigate])

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
        fetch("https://pacific-inlet-53322.herokuapp.com/users", {
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
        <div class="hero h-full bg-base-200">
            <div class="md:w-2/4 w-full mb-5 py-10 hero-content ">
                <div class="card w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSignIn}>
                        <div class="card-body">
                            <p className='text-2xl text-accent-focus text-center font-bold'>Login</p>
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="Enter Your Email" class="input input-accent input-bordered" />
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="Enter Your Password" class="input input-accent input-bordered" />
                            <label class="label">
                                <Link to="/register" className='label-text-alt link link-hover'>Create An Account</Link>
                            </label>
                            <input className="btn bg-accent-focus border-0" type="submit" value="Login" />
                        </div>
                    </form>
                    <div class="divider px-16 my-0">OR</div>
                    <div className='text-center'>
                        <button onClick={handleGoogle} className='btn bg-accent-focus border-0 md:w-80 my-4'>Continue With Google</button>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default Login;