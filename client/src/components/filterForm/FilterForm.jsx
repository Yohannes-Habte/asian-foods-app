import { toast } from "react-toastify";
import "./FilterForm.css";
import { useEffect } from "react";

const FilterForm = ({
  data,
  getData,
  filters,
  updateChange,
  getBrand,
  reset,
  setBrands,
}) => {
  const { brand, power, year, color, price, fuel } = filters;
  useEffect(() => {
    getData("cars", 45, 0);

    return () => {};
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();

    getBrand(brand).then((res) => setBrands(res));

    reset();
  };

  return (
    <form className="filter-container">
      <div className="inputs-wrapper">
        {/* Brand */}
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="brand" className="text-white">
            Brand
          </label>

          <input
            type="text"
            name="brand"
            id="brand"
            value={brand}
            onChange={updateChange}
            placeholder="Car Brand"
            className="h-8 p-1 rounded outline-none cursor-pointer"
          />
        </div>

        {/* Power */}
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="power" className="text-white">
            Power
          </label>
          <select
            name="power"
            id="power"
            value={power}
            onChange={updateChange}
            className="h-8 p-1 rounded outline-none cursor-pointer"
          >
            <option value="">All</option>
            {data &&
              data.map((car) => {
                return (
                  <option key={car?.sys?.id} value={car?.sys?.id}>
                    {" "}
                    {car.fields.transmission} ps{" "}
                  </option>
                );
              })}
          </select>
        </div>

        {/* Year */}

        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="year" className="text-white">
            Year
          </label>
          <input
            type="text"
            name="year"
            id="year"
            value={year}
            onChange={updateChange}
            placeholder="Year"
            className="h-8 p-1 rounded outline-none cursor-pointer"
          />
        </div>

        {/* Color */}

        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="color" className="text-white">
            Color
          </label>
          <input
            type="text"
            name="color"
            id="selectedColor"
            value={color}
            onChange={updateChange}
            placeholder="Color"
            className="h-8 p-1 rounded outline-none cursor-pointer"
          />
        </div>

        {/* Price */}

        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="price" className="text-white">
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={price}
            onChange={updateChange}
            placeholder="Price"
            className="h-8 p-1 rounded outline-none cursor-pointer"
          />
        </div>

        {/* Fuel */}
        <div className="flex flex-col gap-1 mb-3">
          <label htmlFor="fuel" className="text-white">
            Fuel
          </label>
          <input
            type="text"
            name="fuel"
            id="fuel"
            value={fuel}
            onChange={updateChange}
            placeholder="Fuel Type"
            className="h-8 p-1 rounded outline-none cursor-pointer"
          />
        </div>
      </div>

      <div className="offers-button-wrapper">
        <div className="offers">
          We have 145 offers and you have the option to get your desire using
          the filter
        </div>
        <button onClick={handleSearch} className="filter-btn">
          {" "}
          Filter{" "}
        </button>

        <button onClick={reset} className="py-1 px-2 bg-gray-400 rounded">
          {" "}
          Reset{" "}
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
