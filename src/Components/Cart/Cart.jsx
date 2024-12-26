import React, { useEffect } from "react";

import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    getCartItems,
    carProducts,
    deleteItemOnCart,
    updateCart,
    cleerCart,
    numberOfItem,
    totalPrise,
  } = useContext(CartContext);

  let navigate = useNavigate();

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <div className="container">
        <div className="flex justify-around items-center">
          <div className="w-52">
            <h1 className="text-start font-bold my-8 text-2xl text-gray-500">
              Shopping Cart
            </h1>
          </div>
          <div className="w-44">
            {carProducts.length > 0 ?<button
              onClick={() => {
                cleerCart();
              }}
              className="font-bold bg-red-500 hover:bg-red-700   text-white rounded-md py-2 px-4  "
            >
              Clear All
            </button>:""}
            
          </div>
        </div>

        {carProducts.length > 0 ? (
          <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg container">
              <div className="flex justify-around items-center">
                <div className="w-50">
                  <h2 className="text-start font-bold my-8 text-2xl text-gray-500">
                    Total Price :{" "}
                    <span className="text-main">{totalPrise}</span>{" "}
                  </h2>
                </div>
                <div className="w-50">
                  <h2 className="text-start font-bold my-8 text-2xl text-gray-500">
                    Total Number :{" "}
                    <span className="text-main">{numberOfItem}</span>
                  </h2>
                </div>
              </div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {carProducts.map((product) => (
                    <tr
                      key={product.product.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt="Apple Watch"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              updateCart(
                                product.product.id,
                                product.count - 1 == 0
                                  ? deleteItemOnCart(product.product.id)
                                  : product.count - 1
                              );
                            }}
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <span>{product.count}</span>
                          </div>
                          <button
                            onClick={() => {
                              updateCart(product.product.id, product.count + 1);
                            }}
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.price}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteItemOnCart(product.product.id)}
                          className="font-bold bg-red-500 hover:bg-red-700   text-white rounded-md py-2 px-4  "
                        >
                          <i className="fa-solid fa-trash mx-1"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => {
                navigate("/checkout");
              }}
              className="py-2 px-4 bg-main w-full rounded font-black text-gray-200 md:text-base mt-5"
            >
              Check Out
            </button>
          </>
        ) : (
          <>
            <div className="w-[70%] mx-auto mt-10">
              <h1 className="sm:text-5xl text-3xl font-medium mb-10">
                Your Cart Is Empty
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
