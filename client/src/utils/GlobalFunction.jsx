import { useState } from "react";
import { clientProducts } from "./clientProducts";

const GlobalFunction = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get all food products
  const getProducts = async (type = type, limit = limit, skip = skip) => {
    try {
      setLoading(true);
      const data = await clientProducts.getEntries({
        content_type: type,
        limit: limit,
        skip: skip,
      });
      setData(data.items);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  return { loading, data, getProducts };
};

export default GlobalFunction;
