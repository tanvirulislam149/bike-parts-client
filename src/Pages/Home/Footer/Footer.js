import React from 'react';
import "./Footer.css";
import logo from "../../../assets/bike-logo.png"
import { AiOutlineFacebook, AiOutlineLinkedin } from "react-icons/ai";
import { LiaTwitterSquare } from "react-icons/lia";


const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer>
      <div class="footer p-20 bg-stone-900 text-white text-white-content">
        <div>
          <div className='text-2xl flex orange-color font-bold rajdhani-font'>
            <img className='w-24' src={logo} alt="" />
            <p className='pt-3'>BikeParts</p>
          </div>
          <div className='flex items-center my-3'>
            <AiOutlineFacebook style={{ width: "40px", height: "40px" }} />
            <AiOutlineLinkedin style={{ width: "41px", height: "41px", marginLeft: "10px", marginRight: "9px" }} />
            <LiaTwitterSquare style={{ width: "45px", height: "45px" }} />
          </div>
          <p className='text-base'>Providing reliable Car Parts since 1992</p>
          <p className='font-bold text-base'>For Support</p>
          <p className='text-base'>0123-456-7890</p>

        </div>
        <div>
          <span class="footer-title">Services</span>
          <a class="link link-hover">Branding</a>
          <a class="link link-hover">Design</a>
          <a class="link link-hover">Marketing</a>
          <a class="link link-hover">Advertisement</a>
        </div>
        <div>
          <span class="footer-title">Company</span>
          <a class="link link-hover">About us</a>
          <a class="link link-hover">Contact</a>
          <a class="link link-hover">Jobs</a>
          <a class="link link-hover">Press kit</a>
        </div>
        <div>
          <span class="footer-title">Legal</span>
          <a class="link link-hover">Terms of use</a>
          <a class="link link-hover">Privacy policy</a>
          <a class="link link-hover">Cookie policy</a>
        </div>
      </div>
      <p className='py-5 px-20 text-sm bg-black text-white'>Copyright © {date}. Developed by TANVIR. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;