import axios from "axios";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import "./ContactPage.css";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      email: formData.email,
      comment: formData.comment,
    };
    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.post(
        "http://localhost:9000/api/v1/comments/new",
        newComment
      );
    } catch (error) {
      console.log(error.comment);
    }
  };

  return (
    <main>
      <Header />
      <section className="mb-20">
        <h1 className="header-text mt-12"> Did not find the right food?</h1>
        <p className="text-center mt-3 w-2/3 mx-auto text-white">
          Simply write to us with the desired food and spicy level, we will
          provide your desired food !
        </p>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="flex flex-col gap-1">
            <label>Email Address </label>
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
            <label htmlFor="comment">Text comment </label>
            <textarea
              name="comment"
              id="comment"
              rows="6"
              cols="50"
              value={formData.comment}
              placeholder="Your comment"
              onChange={handleChange}
              className="border-none mb-8 p-2 text-black rounded outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-cyan-600 py-2 rounded-3xl hover:bg-orange-400 text-semibold"
          >
            Send your comment
          </button>
        </form>
      </section>
      <Footer />
    </main>
  );
};

export default ContactPage;
