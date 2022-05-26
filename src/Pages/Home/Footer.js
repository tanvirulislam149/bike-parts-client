import React from 'react';

const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <footer class="footer p-10 bg-accent-focus text-white text-white-content">
            <div>
                <img className='w-20 rounded-2xl' src="https://png.pngitem.com/pimgs/s/210-2102350_collection-of-free-engine-vector-auto-repair-car.png" alt="" />
                <p>AutoParts Industries Ltd.<br />Providing reliable Car Parts since 1992</p>
                <p>Copyright © {date}. All Rights Reserved. Developed by TANVIR</p>
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
        </footer>
    );
};

export default Footer;