import { signOut } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const toastId = React.useRef(null);

  const onSubmit = (data) => {

    toast(
      <div className='flex items-center'>
        <ColorRing
          visible={true}
          height="40"
          width="40"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["white", "white", "white", "white", "white"]}
        />
        <p>Loading...</p>
      </div>
      , { autoClose: false }
    )


    const image = data.picture[0];
    const pic = new FormData();
    pic.append("file", image);
    pic.append("upload_preset", "creative_agencies")
    pic.append("cloud_name", "tanvirulislam149")
    axios.post("https://api.cloudinary.com/v1_1/tanvirulislam149/image/upload", pic)
      .then(res => {
        if (res.data.url) {
          console.log(res.data.url);
          const payload = {
            name: data.name,
            description: data.description,
            picture: res.data.url,
            price: data.price,
            quantity: data.quantity
          }
          console.log(payload);
          fetch("https://autoparts-vsj8.onrender.com/parts", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: localStorage.getItem("accessToken")
            },
            body: JSON.stringify(payload)
          })
            .then(res => res.json())
            .then(data => {
              if (data.message) {
                signOut(auth);
                localStorage.removeItem("accessToken");
              }
              if (data.acknowledged) {
                toast.dismiss(toastId.current);
                toast.success("Product Added successfully.")
              }
            });
          reset();
        }
      })
      .catch(err => {
        // console.log(err.message);
        if (err.message === "Request failed with status code 401") {
          toast.dismiss(toastId.current);
          toast.error("Image upload failed. Please try again.");
        }
      })
  }

  return (
    <div className='md:w-4/6 mx-5'>
      <p className='text-5xl rajdhani-font orange-color my-5'>Add Product</p>
      <form onSubmit={handleSubmit(onSubmit)} id="form">
        <input type="text" {...register("name", { required: true })} placeholder="Enter Product Name" class="input my-2 w-full rounded-none border-red-500 input-bordered" />
        <input type="number" {...register("price", { required: true })} placeholder="Enter Product Price" class="input w-full rounded-none border-red-500 my-2 input-bordered" />
        <input type="file" {...register("picture", { required: true })} placeholder="Enter Product Image Url" class="input w-full rounded-none border-red-500 my-2 input-bordered" />
        <input type="description" {...register("description", { required: true })} placeholder="Enter Product Description" class="input w-full rounded-none border-red-500 my-2 input-bordered" />
        <input type="number" {...register("quantity", { required: true })} placeholder="Enter Product Quantity" class="input w-full rounded-none border-red-500 my-2 input-bordered" />
        <input className='btn bg-red-500 rounded-none font-semibold border-0 w-full my-2' type="submit" value={"Add Product"} />
      </form>
    </div>
  );
};

export default AddProduct;