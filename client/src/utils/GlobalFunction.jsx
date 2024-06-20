import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GlobalFunction = (url) => {
  // Global state variables for fetching comments from the backend
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (err) {
        setError(toast.error());
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};

export default GlobalFunction;
