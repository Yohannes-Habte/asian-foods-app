import axios from "axios";
import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import "./ContactPage.css";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const spaceId = import.meta.env.VITE_SPACE_ID;
    const accessToken = import.meta.env.VITE_COMMENT_MGT_ACCESS_TOKEN;
    const environmentId = "master";

    const url = `https://api.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries`;

    const entryData = {
      fields: {
        userName: {
          "en-US": formData.userName,
        },
        email: {
          "en-US": formData.email,
        },
        message: {
          "en-US": formData.message,
        },
      },
    };

    try {
      const { data } = await axios.post(url, entryData, {
        headers: {
          "Content-Type": "application/vnd.contentful.management.v1+json",
          Authorization: `Bearer ${accessToken}`,
          "X-Contentful-Content-Type": "comment",
        },
      });

      console.log("Comment", data);
      localStorage.setItem("comments", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <Header />
      <section className="mb-20">
        <h1 className="header-text"> Didn't find the right car?</h1>
        <p className="text-center">
          Simply write to us with the desired model and car name, we will
          provide your desired car !
        </p>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="flex flex-col gap-1">
            <label>Full Name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              placeholder="Your full name"
              onChange={handleChange}
              className="border-none p-2 text-black rounded outline-none"
            />
          </div>

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
            <label htmlFor="message">Text Message </label>
            <textarea
              name="message"
              id="message"
              rows="6"
              cols="50"
              value={formData.message}
              placeholder="Your message"
              onChange={handleChange}
              className="border-none mb-8 p-2 text-black rounded outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-orange-500 py-2 rounded-3xl hover:bg-orange-400 text-semibold"
          >
            Send your message
          </button>
        </form>
      </section>
      <Footer />
    </main>
  );
};

export default ContactPage;
