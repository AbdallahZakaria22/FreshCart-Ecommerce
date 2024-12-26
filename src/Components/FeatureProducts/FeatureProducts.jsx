import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function FeatureProducts() {
  const { addToCart } = useContext(CartContext);
  const { addToWishList, numberOfWishList, WishLists, deleteItemOnWishList } =
    useContext(WishlistContext);

  let { data, isError, isLoading, error } = useQuery({
    QueryKey: ["FeatureProducts"],
    queryFn: getProducts,
  });

  async function addProductToCart(id) {
    let data = await addToCart(id);
  }

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  return (
    <>
      {isError ? toast.error(`${error.message}`) : ""}
      {isLoading ? <LoaderScreen /> : ""}

      <div className="container mb-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-8 grid grid-cols-1 gap-12  ">
        {data?.data.data.map((product) => (
          <div
            key={product.id}
            className="product cursor-pointer text-start px-2 shadow-md rounded-md"
          >
            <Link to={`/FreshCart-Ecommerce/products/${product.id}`}>
              <img
                className="h-auto max-w-full rounded-lg"
                src={product.imageCover}
                alt={product.title}
              />
              <p className="text-main">{product.category.name}</p>
              <h2>{product.title}</h2>
              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-4">
                  {product?.priceAfterDiscount ? (
                    <>
                      <p className="line-through">{`${product?.price}  EGP`}</p>
                      <p>{`${product?.priceAfterDiscount}  EGP`}</p>
                    </>
                  ) : (
                    <p>{`${product?.price}  EGP`}</p>
                  )}
                </div>

                <p className="text-lg">
                  <i className="fa fa-star rating-color"></i>

                  {`   ${product?.ratingsAverage}`}
                </p>
              </div>
            </Link>

            <div className="flex py-2  justify-around items-center mt-2">
              <button
                onClick={() => addProductToCart(product.id)}
                className="btn py-2 px-4 bg-main text-white w-2/3 rounded"
              >
                Add To Cart
              </button>

              {numberOfWishList > 0 ? (
                WishLists.some((item) => item.id === product.id) ? (
                  <p>
                    <i
                      onClick={() => {
                        deleteItemOnWishList(product.id);
                      }}
                      className="fa-solid fa-heart fa-2xl cursor-pointer text-red-700 w-1/3"
                    ></i>
                  </p>
                ) : (
                  <p>
                    <i
                      onClick={() => addToWishList(product.id)}
                      className="fa-regular fa-heart fa-2xl cursor-pointer text-red-700 w-1/3"
                    ></i>
                  </p>
                )
              ) : (
                <p>
                  <i
                    onClick={() => addToWishList(product.id)}
                    className="fa-regular fa-heart fa-2xl cursor-pointer text-red-700 w-1/3"
                  ></i>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
