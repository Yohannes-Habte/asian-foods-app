import { useContext, useState } from "react";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import { UserContext } from "../../context/user/UserProvider";
import { USER_ACTION } from "../../context/user/UserReducer";
import { toast } from "react-toastify";
import axios from "axios";
import { URL } from "../../utils/myLocalURL";
const LoginPage = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
    };
    try {
      dispatch({ type: USER_ACTION.LOGIN_START });
      const { data } = await axios.post(`${URL}/auth/login`, newUser, {
        withCredentials: true,
      });
      dispatch({
        type: USER_ACTION.LOGIN_SUCCESS,
        payload: data.user,
      });

      if (data.user.is_admin) {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success(data.message);
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      handleReset();
    } catch (error) {
      dispatch({
        type: USER_ACTION.LOGIN_FAIL,
        payload: toast.error(error.response.data.message),
      });
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
