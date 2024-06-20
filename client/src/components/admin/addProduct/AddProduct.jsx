import { useState } from "react";
import "./AddProduct.css";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    food_name: "",
    food_price: "",
    description: "",
    country: "",
    spiceLevel: "",
  });

  const { food_name, food_price, description, country, spiceLevel } = formData;
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cloud_name = "dgmthsu2w";
    const upload_preset = "ff8sgbpd";
    const cloud_URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    const foodPhoto = new FormData();
    foodPhoto.append("file", image);
    foodPhoto.append("cloud_name", cloud_name);
    foodPhoto.append("upload_preset", upload_preset);
    // Save image to cloudinary
    const response = await axios.post(cloud_URL, foodPhoto);
    const { url } = response.data;

    try {
      const newProduct = {
        food_name,
        food_price,
        description,
        country,
        spiceLevel,
        image: url,
      };
      const { data } = await axios.post(
        "http://localhost:9000/api/v1/foods/new",
        newProduct
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <h4 className="new-car-text text-center my-10 text-white">
        Add your product
      </h4>
      <form onSubmit={handleSubmit} className="form-container-add">
        <div className="flex flex-col gap-1">
          <label>Product name</label>
          <input
            type="text"
            name="food_name"
            value={food_name}
            placeholder="Product name"
            onChange={handleChange}
            className="border-none p-2 text-black rounded outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Price</label>
          <input
            type="number"
            name="food_price"
            value={food_price}
            placeholder="Price of the product"
            onChange={handleChange}
            className="border-none p-2 text-black rounded outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="description
          "
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="6"
            cols="50"
            value={description}
            placeholder="Product description"
            onChange={handleChange}
            className="border-none p-2 text-black rounded outline-none"
          ></textarea>
        </div>

        <div className="flex gap-2">
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="spiceLevel">Spicy level</label>
            <select
              name="spiceLevel"
              id="spiceLevel"
              value={spiceLevel}
              onChange={handleChange}
              className="text-black border-none p-2 text-black rounded outline-none "
            >
              <option value="high">High</option>
              <option value="">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="country">Origin</label>
            <select
              name="country"
              id="country"
              value={country}
              onChange={handleChange}
              className="text-black border-none p-2 text-black rounded outline-none"
            >
              <option value="">India</option>
              <option value="pakistan">Pakistan</option>
              <option value="bangladesh">Bangladesh</option>
              <option value="thailland">Thailland</option>
              <option value="japan">Japan</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-8">
          <label htmlFor="image">Photo Upload</label>
          <input
            id="image"
            type="file"
            className="custom-file-upload"
            name="image"
            onChange={handleImage}
          />
        </div>

        <button
          type="submit"
          className="bg-cyan-500 py-2 rounded-3xl hover:bg-orange-400 text-semibold"
        >
          Save product
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
