import "./Footer.css";
import { BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

// import {FontAwesomeIcon} from "@fontawesome/react-FontAwesomeIcon"

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <section className="footer-asides-wrapper">
        <aside>
          <h3 className="text-2xl font-bold pb-6 text-gray-400 customfont">Our Services</h3>
          <ul className="">
            <li>Products</li>
            <li>Services</li>
            <li>Job Offers</li>
            <li>Upcoming Cars</li>
          </ul>
        </aside>

        <aside>
          <h3 className="text-2xl font-bold pb-6 text-gray-400 customfont">Follow us</h3>
          <ul>
            <div className="flex gap-3">
              <BsFacebook /> 
              <li>Facebook</li>
            </div>
            
            <div className="flex gap-3">
              <FaLinkedin />
              <li>LinkedIn</li>
            </div>
            <div className="flex gap-3">
              <FiInstagram />
              <li> Instagram</li>
            </div>
            <div className="flex gap-3">
              <FaTwitter />    
              <li>Twitter</li>
            </div>
            
            <div className="flex gap-2">
              <IoLogoYoutube />
              <li>Youtube</li>
            </div>
          </ul>

        </aside>

        <aside>
          <h3 className="text-2xl font-bold pb-6 text-gray-400 customfont">Contact us</h3>
          
          <ul>
            <div className="flex gap-3">
              <MdEmail />
              <li>mycar@contact.com</li>
            </div>
            <div className="flex gap-3">
              <BsFillTelephoneFill />
              <li>+49123456789</li>
            </div>
            <div className="flex gap-3">
              <FaLocationDot />
              <li>Mycar Straße 12</li>
            </div>
            <li className="pl-7">12345 Berlin</li>
          </ul>
        </aside>
      </section>
      <p className="copy-wright w-full p-6 text-center text-sm">All rights reserved @ myCar 2024. This project is created by Mehedi, Ali & Yohannes </p>
    </footer>
  );
};

export default Footer;
