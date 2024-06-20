import { toast } from "react-toastify";
import "./FilterForm.css";
import { useEffect } from "react";

const FilterForm = ({
  data,
  getData,
  filters,
  updateChange,
  getname,
  reset,
  setnames,
}) => {
  const { name, spicy, country, price } = filters;
  useEffect(() => {
    getData("cars", 45, 0);

    return () => {};
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();

    getname(name).then((res) => setnames(res));

    reset();
  };

  return (
    <form className="filter-container max-w-5xl mx-auto">
      <div className="flex items-end justify-between">
        <div className="inputs-wrapper">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-white text-xs">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={""}
              onChange={updateChange}
              placeholder="Food Name"
              className="h-8 p-1 rounded outline-none cursor-pointer min-w-36 bg-gray-200"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="price" className="text-white text-xs">
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              value={""}
              onChange={updateChange}
              placeholder="Price"
              className="h-8 p-1 rounded outline-none cursor-pointer min-w-36 bg-gray-200"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="spicy" className="text-white  text-xs">
              Spicy level
            </label>
            <select
              name="spicy"
              id="spicy"
              value={""}
              onChange={updateChange}
              className="h-8 p-1 rounded outline-none cursor-pointer min-w-36 bg-gray-200"
            >
              <option value="">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="country" className="text-white text-xs">
              Country
            </label>
            <select
              name="country"
              id="country"
              value={""}
              onChange={updateChange}
              className="h-8 p-1 rounded outline-none cursor-pointer min-w-36 bg-gray-200"
            >
              <option value="">All</option>
              <option value="low">India</option>
              <option value="medium">Bangladesh</option>
              <option value="high">Pakistan</option>
              <option value="high">Thailand</option>
              <option value="high">Japan</option>
              <option value="high">China</option>
              <option value="high">Vietnam</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="py-1 px-4 bg-gray-500 rounded">
            {" "}
            Reset{" "}
          </button>
          <button
            onClick={handleSearch}
            className="py-1 px-4 bg-cyan-500 rounded"
          >
            {" "}
            Filter{" "}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;
