import { useContext, useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { loginToContentful } from "../../utils/clientLogin";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import { UserContext } from "../../context/user/UserProvider";
import { USER_ACTION } from "../../context/user/UserReducer";
import { toast } from "react-toastify";
const LoginPage = () => {
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      dispatch({ type: USER_ACTION.LOGIN_START });
      await loginToContentful(email, password);
      dispatch({
        type: USER_ACTION.LOGIN_SUCCESS,
        payload: { email, password },
      });
      localStorage.setItem("userInfo", JSON.stringify({ email, password }));
    } catch (err) {
      dispatch({
        type: USER_ACTION.LOGIN_FAIL,
        payload: toast.error(err.message),
      });
    }
  };
  return (
    <main>
      <Header />
      <section>
        <h1 className="header-text"> Welcome to Your Account </h1>
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
          {error && <p>{error}</p>}
          <button
            type="submit"
            className="bg-orange-500 py-2 rounded-3xl hover:bg-orange-400 text-semibold"
          >
            Login
          </button>
        </form>
        <p className="have-no-account">
          Do not have an account?
          <Link className="sign-up" to="/sign-up">
            Sign Up
          </Link>
        </p>
      </section>
      <Footer />
    </main>
  );
};
export default LoginPage;
