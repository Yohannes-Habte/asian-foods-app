import axios from "axios";
import "./EntireProducts.scss";
import { useEffect, useState } from "react";

const EntireProducts = () => {
  // Local state variable

  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);

  const getAllSpecialFoods = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:9000/api/v1/foods`);
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

  return (
    <section>
      <h2> List of Products </h2>

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
                  <td className="body-cell"> {food.description.slice(0, 70).concat(" ...")}</td>
                  <td className="body-cell">delete | Edit </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default EntireProducts;
