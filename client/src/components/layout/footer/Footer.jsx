import "./Footer.css";
import { BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { IoLogoYoutube } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

// import {FontAwesomeIcon} from "@fontawesome/react-FontAwesomeIcon"

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <section className="footer-asides-wrapper mb-10">
        <aside>
          <h3 className="text-2xl font-bold pb-6 text-gray-100">
            Our Services
          </h3>
          <ul className="">
            <li className="py-1 hover:underline cursor-pointer">Products</li>
            <li className="py-1 hover:underline cursor-pointer">
              Special offers
            </li>
            <li className="py-1 hover:underline cursor-pointer">Services</li>
            <li className="py-1 hover:underline cursor-pointer">Job Offers</li>
          </ul>
        </aside>

        <aside>
          <h3 className="text-2xl font-bold pb-6 text-gray-100">Follow us</h3>
          <ul>
            <div className="flex gap-2 items-center py-1">
              <BsFacebook />
              <li className=" hover:underline cursor-pointer">Facebook</li>
            </div>

            <div className="flex gap-2 items-center py-1">
              <FaLinkedin />
              <li className=" hover:underline cursor-pointer">LinkedIn</li>
            </div>
            <div className="flex gap-2 items-center py-1">
              <FiInstagram />
              <li className=" hover:underline cursor-pointer"> Instagram</li>
            </div>

            <div className="flex gap-2 items-center py-1">
              <IoLogoYoutube />
              <li className=" hover:underline cursor-pointer">Youtube</li>
            </div>
          </ul>
        </aside>

        <aside>
          <h3 className="text-2xl font-bold pb-6 text-gray-100">Contact us</h3>

          <ul>
            <div className="flex gap-2 items-center py-1">
              <MdEmail />
              <li className=" hover:underline cursor-pointer">
                mycar@contact.com
              </li>
            </div>
            <div className="flex gap-2 items-center py-1">
              <BsFillTelephoneFill />
              <li className=" hover:underline cursor-pointer">+49123456789</li>
            </div>
            <div className="flex gap-2 items-center py-1">
              <FaLocationDot />
              <li>Myfood Straße 12</li>
            </div>
            <li className="pl-7">12345 Berlin</li>
          </ul>
        </aside>
      </section>
      <p className="copy-wright w-full p-6 text-center text-sm">
        All rights reserved @ myFood 2024. This project is created by Mehedi,
        Ali & Yohannes{" "}
      </p>
    </footer>
  );
};

export default Footer;
