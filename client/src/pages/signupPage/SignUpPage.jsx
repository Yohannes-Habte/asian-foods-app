import { useContext, useState } from "react";
import axios from "axios";
import "./SignUpPage.css";
import { Link } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import { UserContext } from "../../context/user/UserProvider";
// import { USER_ACTION } from "../../context/user/UserReducer";
// import { toast } from "react-toastify";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignUpPage = () => {
  const { dispatch } = useContext(UserContext);

  const [formData, setFormData] = useState(initialState);

  const { firstName, lastName, email, password } = formData;

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

    try {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };
      const { data } = await axios.post(
        "http://localhost:9000/api/v1/auth/register",
        newUser
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <main>
      <Header />
      <section className="login-page-container">
        <h1 className="header-text mt-16"> Create Account for Free </h1>
        <form onSubmit={handleSubmit} className="form-container-signup">
          <div className="flex flex-col gap-1">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
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
              value={lastName}
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
              value={email}
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
              value={password}
              placeholder="Create your password"
              onChange={handleChange}
              className="border-none p-2 text-black rounded outline-none mb-8"
            />
          </div>
          <button
            type="submit"
            className="bg-cyan-600 py-2 rounded-3xl hover:bg-orange-400 text-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="have-account text-white">
          Already have an account?
          <Link className="login-link hover:text-white" to="/login">
            Log In
          </Link>
        </p>
      </section>
      <Footer />
    </main>
  );
};
export default SignUpPage;
