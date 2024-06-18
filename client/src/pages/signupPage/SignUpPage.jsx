import { useContext, useState } from "react";
import axios from "axios";
import "./SignUpPage.css";
import { Link } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import { UserContext } from "../../context/user/UserProvider";
import { USER_ACTION } from "../../context/user/UserReducer";
import { toast } from "react-toastify";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignUpPage = () => {
  const { dispatch } = useContext(UserContext);

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const reset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const spaceId = import.meta.env.VITE_SPACE_ID;
    const accessToken = import.meta.env.VITE_MGT_ACCESS_TOKEN;
    const environmentId = "master";
    
    const url = `https://api.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries`;
    const entryData = {
      fields: {
        firstName: {
          "en-US": formData.firstName,
        },
        lastName: {
          "en-US": formData.lastName,
        },
        email: {
          "en-US": formData.email,
        },
        password: {
          "en-US": formData.password,
        },
      },
    };
    try {
      dispatch({ type: USER_ACTION.SIGN_UP_START });
      const { data } = await axios.post(url, entryData, {
        headers: {
          "Content-Type": "application/vnd.contentful.management.v1+json",
          Authorization: `Bearer ${accessToken}`,
          "X-Contentful-Content-Type": "user",
        },
      });
      dispatch({
        type: USER_ACTION.SIGN_UP_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));

      reset()
    } catch (error) {
      dispatch({
        type: USER_ACTION.SIGN_UP_FAIL,
        payload: toast.error(error.response.data.message),
      });
    }
  };
  return (
    <main>
      <Header />
      <section className="login-page-container">
        <h1 className="header-text"> Create Account for Free </h1>
        <form onSubmit={handleSubmit} className="form-container-signup">
          <div className="flex flex-col gap-1">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              placeholder="Your first name"
              onChange={handleChange}
              className="border-none p-2 text-black rounded outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder="Your last name"
              onChange={handleChange}
              className="border-none p-2 text-black rounded outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Your email address"
              onChange={handleChange}
              className="border-none p-2 text-black rounded outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Create your password"
              onChange={handleChange}
              className="border-none p-2 text-black rounded outline-none mb-8"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 py-2 rounded-3xl hover:bg-orange-400 text-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="have-account">
          Already have an account?
          <Link className="login-link" to="/login">
            Log In
          </Link>
        </p>
      </section>
      <Footer />
    </main>
  );
};
export default SignUpPage;
