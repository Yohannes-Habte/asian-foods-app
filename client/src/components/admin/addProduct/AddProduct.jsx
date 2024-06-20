import { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    spicy: "",
    image: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <h4 className="new-car-text text-center my-10">Add your product</h4>
      <form onSubmit={handleSubmit} className="form-container-add">
        <div className="flex flex-col gap-1">
          <label>Product name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Product name"
            onChange={handleChange}
            className="border-none p-2 text-black rounded outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
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
            name="description
            "
            id="description
            "
            rows="6"
            cols="50"
            value={formData.description}
            placeholder="Product description
            "
            onChange={handleChange}
            className="border-none p-2 text-black rounded outline-none"
          ></textarea>
        </div>

        <div className="flex gap-2 items-stretch justify-between">
          <div className="flex flex-col gap-1">
            <label htmlFor="spicy">Spicy level</label>
            <select
              name="spicy"
              id="spicy"
              value={formData.spicy}
              className="text-black border-none p-2 text-black rounded outline-none "
            >
              <option value="high">High</option>
              <option value="">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="spicy">Origin</label>
            <select
              name="spicy"
              id="spicy"
              value={formData.country}
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
          <label htmlFor="file-upload">Photo Upload</label>
          <input id="file-upload" type="file" className="custom-file-upload" />
        </div>

        <button
          type="submit"
          className="bg-orange-500 py-2 rounded-3xl hover:bg-orange-400 text-semibold"
        >
          Save product
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
