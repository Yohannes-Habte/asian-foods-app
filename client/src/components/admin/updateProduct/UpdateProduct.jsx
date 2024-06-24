import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./UpdateProduct.scss";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { URL } from "../../../utils/myLocalURL";
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const UpdateProduct = ({ setOpenUpdateProduct }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    food_name: data?.food_name || "",
    food_price: data?.food_price || "",
    description: data?.description || "",
    country: data?.country || "",
    spiceLevel: data?.spiceLevel || "",
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const { food_name, food_price, description, country, spiceLevel } = formData;

  useEffect(() => {
    const fetchSingleFood = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9000/api/v1/foods/${id}`
        );
        setData(data.food);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSingleFood();
  }, []);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFormData({
      food_name: "",
      food_price: "",
      description: "",
      country: "",
      spiceLevel: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cloud_name = import.meta.env.VITE_CLOUD_NAME;
    const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
    const cloud_URL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    const foodPhoto = new FormData();
    foodPhoto.append("file", image);
    foodPhoto.append("cloud_name", cloud_name);
    foodPhoto.append("upload_preset", upload_preset);
    // Save image to cloudinary
    const response = await axios.post(cloud_URL, foodPhoto);
    const { url } = response.data;

    try {
      setLoading(true);
      const updateProduct = {
        food_name,
        food_price,
        description,
        country,
        spiceLevel,
        image: url,
      };
      const { data } = await axios.put(`${URL}/foods/${id}`, updateProduct);
      toast.success(data.message);
      setLoading(false);
      handleReset();
      navigate("/admin");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <article className="modal">
      <section className="popup-box bg-cyan-900">
        <IoMdClose
          onClick={() => setOpenUpdateProduct(false)}
          className="close-modal"
        />
        <h4 className="food-title text-center  text-white">
          <Link to={"/"}>
            {" "}
            <FaArrowAltCircleLeft
              title="Return Home Page"
              className="go-back-icon"
            />{" "}
          </Link>{" "}
          Update {data?.food_name}
        </h4>
        <form
          onSubmit={handleSubmit}
          className="form-container-add bg-cyan-900"
        >
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
                <option value="default">Select spicy level</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
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
                <option value="default">Select Country</option>
                <option value="india">India</option>
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
            {loading && "Loading..."}
            {!loading && "Update product"}
          </button>
        </form>
      </section>
    </article>
  );
};

export default UpdateProduct;
