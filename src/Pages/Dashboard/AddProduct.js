import { signOut } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        fetch("https://pacific-inlet-53322.herokuapp.com/parts", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: localStorage.getItem("accessToken")
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                }
                if (data.acknowledged) {
                    toast.success("Product Added")
                }
            });
        reset();
    }
    return (
        <div className='md:w-96 mx-5 md:mx-auto'>
            <p className='text-4xl text-center text-accent-focus font-bold my-5'>Add Product</p>
            <form onSubmit={handleSubmit(onSubmit)} id="form">
                <input type="text" {...register("name", { required: true })} placeholder="Enter Product Name" class="input my-2 w-full input-accent input-bordered" />
                <input type="number" {...register("price", { required: true })} placeholder="Enter Product Price" class="input w-full input-accent my-2 input-bordered" />
                <input type="text" {...register("picture", { required: true })} placeholder="Enter Product Image Url" class="input w-full input-accent my-2 input-bordered" />
                <input type="description" {...register("description", { required: true })} placeholder="Enter Product Description" class="input w-full input-accent my-2 input-bordered" />
                <input type="number" {...register("quantity", { required: true })} placeholder="Enter Product Quantity" class="input w-full input-accent my-2 input-bordered" />
                <input className='btn bg-accent-focus border-0 w-full my-2' type="submit" value={"Add Product"} />
            </form>
        </div>
    );
};

export default AddProduct;