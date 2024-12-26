import React, { useEffect } from "react";

import { useContext } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const { getWishListItems, WishLists, deleteItemOnWishList } =
    useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  let navigate = useNavigate();

  useEffect(() => {
    getWishListItems();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="text-start font-bold my-8 text-2xl text-gray-500 ms-8">
          Wish List
        </h1>

        {WishLists.length > 0 ? (
          <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg container">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 container">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {WishLists.map((product) => (
                    <tr
                      key={product.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.title}
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            deleteItemOnWishList(product.id);
                          }}
                          className="font-bold bg-red-500 hover:bg-red-700   text-white rounded-md py-2 px-4  "
                        >
                          <i className="fa-solid fa-trash mx-1"></i>
                          Remove
                        </button>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="py-2 px-4 bg-main text-white ms-5 mt-3  hover:text-black  rounded-md font-bold"
                        >
                          Add To Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="w-[70%] mx-auto mt-10">
              <h1 className="sm:text-5xl text-3xl font-medium mb-10">
                Your Wish list Is Empty
              </h1>
              <button
                onClick={() => {
                  navigate("/products");
                }}
                className="py-2 px-4 bg-main w-full rounded font-black text-gray-200 md:text-base "
              >
                Go To Shopping Now
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
