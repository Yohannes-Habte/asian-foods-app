import { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
// import { loginToContentful } from "../../utils/clientLogin";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
// import { UserContext } from "../../context/user/UserProvider";
// import { USER_ACTION } from "../../context/user/UserReducer";
// import { toast } from "react-toastify";
import axios from "axios";
const LoginPage = () => {
  // const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:9000/api/v1/auth/login",
        newUser
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <main>
      <Header />
      <section>
        <h1 className="header-text mt-16"> Welcome to Your Account </h1>
        <form onSubmit={handleSubmit} className="form-container-login">
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-none p-2 text-black rounded outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-none mb-8 p-2 text-black rounded outline-none"
            />
          </div>
          {/* {error && <p>{error}</p>} */}
          <button
            type="submit"
            className="bg-cyan-600 py-2 rounded-3xl hover:bg-orange-400 text-semibold"
          >
            Login
          </button>
        </form>
        <p className="have-no-account text-white">
          Do not have an account?
          <Link className="sign-up hover:text-white" to="/sign-up">
            Sign Up
          </Link>
        </p>
      </section>
      <Footer />
    </main>
  );
};
export default LoginPage;
