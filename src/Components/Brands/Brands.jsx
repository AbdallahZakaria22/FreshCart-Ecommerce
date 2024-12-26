import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import axios from "axios";

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["BrandsProducts"],
    queryFn: getBrands,
  });

  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  async function handleOpenModal(id) {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((data) => setSelectedBrand(data.data.data))
      .catch((error) => console.log(error));
  }
  const handleCloseModal = () => {
    setSelectedBrand(null);
  };

  return (
    <>
      {isError ? toast.error(`${error.message}`) : ""}

      {isLoading ? <LoaderScreen /> : ""}

      <div className="container mb-2">
        <h1 className="text-start font-bold my-8 text-2xl text-gray-600 ms-8">
          All Brands
        </h1>
      </div>

      <div className="container mb-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 grid grid-cols-1 gap-12">
        {data?.data.data.map((brand) => (
          <div
            key={brand._id}
            className="p-5 cursor-pointer text-start px-2 shadow-md rounded-md"
            onClick={() => handleOpenModal(brand._id)}
          >
            <Link>
              <img
                className="h-auto max-w-full rounded-lg"
                src={brand.image}
                alt={brand.name}
              />
              <h2 className="text-lg font-semibold text-main mt-2">
                {brand.name}
              </h2>
            </Link>
          </div>
        ))}
      </div>

      {selectedBrand && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div className="relative w-full max-w-2xl max-h-full p-4">
            <div
              className="relative  bg-white rounded-lg shadow"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-3 border-b rounded-t">
                <button
                  onClick={handleCloseModal}
                  className="hover:bg-gray-200 hover:text-gray-900 ms-auto inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg"
                >
                  <i class="fa-solid fa-xmark fa-2xl"></i>
                </button>
              </div>
              <div className="flex items-center justify-between gap-12 p-4 space-y-4">
                <div className="pl-2 mt-8 w-full text-start">
                  <p className="sm:text-5xl text-3xl font-semibold text-main">
                    {selectedBrand.name}
                  </p>
                  <h3 className="mt-3 text-lg font-medium text-gray-800">
                    {selectedBrand.slug}
                  </h3>
                </div>
                <div className="">
                  <img
                    className="h-auto max-w-full rounded-lg mb-4"
                    src={selectedBrand.image}
                    alt={selectedBrand.name}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b">
                <button
                  onClick={handleCloseModal}
                  className="text-white bg-lime-500 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
