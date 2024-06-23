import axios from "axios";
import "./EntireProducts.scss";
import { useEffect, useState } from "react";
import AddProduct from "../addProduct/AddProduct";
import UpdateProduct from "../updateProduct/UpdateProduct";
import { MdEditSquare } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { URL } from "../../../utils/myLocalURL";

const EntireProducts = () => {
  // Local state variable

  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);

  const getAllSpecialFoods = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URL}/foods`);
      setFoods(data.foods);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSpecialFoods();

    return () => {};
  }, []);

  // Update single product

  // Delete single food
  const deleteFood = async (foodId) => {
    try {
      await axios.delete(`${URL}/foods/${foodId}`);
      setFoods(foods.filter((food) => food.food_id !== foodId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="products-list-wrapper">
      <h3 className="products-title"> List of Products </h3>

      <button
        onClick={() => setOpenAddProduct(true)}
        className="add-product-btn"
      >
        Add Product
      </button>
      <table className="product-table">
        <thead className="table-head">
          <tr className="head-tr">
            <th className="head-cell"> Product ID</th>
            <th className="head-cell">Product Name</th>
            <th className="head-cell">Photo</th>
            <th className="head-cell">Product Price</th>
            <th className="head-cell">Description</th>
            <th className="head-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading && <p>Loading...</p>}
          {foods &&
            foods.map((food) => {
              return (
                <tr key={food.food_id} className="body-tr">
                  <td className="body-cell"> {food.food_id} </td>
                  <td className="body-cell"> {food.food_name} </td>
                  <td className="body-cell">
                    <img src={food.image} alt="" className="image" />
                  </td>
                  <td className="body-cell"> {food.food_price} </td>
                  <td className="body-cell">
                    {" "}
                    {food.description.slice(0, 70).concat(" ...")}
                  </td>
                  <td className="body-cell">
                    <strong className="flex space-x-5 cursor-pointer">
                      <Link to={`/products/product/${food.food_id}`}>
                        <MdEditSquare
                          onClick={() => setOpenUpdateProduct(true)}
                          className="text-green-400 hover:text-green-500"
                        />
                      </Link>
                      <FaTrash
                        onClick={() => deleteFood(food.food_id)}
                        className="text-red-500 hover:text-red-700"
                      />{" "}
                    </strong>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {openAddProduct && <AddProduct setOpenAddProduct={setOpenAddProduct} />}
      {openUpdateProduct && (
        <UpdateProduct setOpenUpdateProduct={setOpenUpdateProduct} />
      )}
    </section>
  );
};

export default EntireProducts;
