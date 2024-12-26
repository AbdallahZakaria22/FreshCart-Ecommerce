import React, { useEffect, useState } from "react";

import LoaderScreen from "../LoaderScreen/LoaderScreen";

import axios from "axios";
import { toast } from "react-toastify";

export default function AllOrders() {
  let userId = localStorage.getItem("userid");
  const [orders, setorders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllOrders() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((data) => {
        setorders(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Erroor");
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      {isLoading ? <LoaderScreen /> : ""}
      <div className="w-[80%] mx-auto mb-2">
        <h1 className="text-start font-bold my-8 text-2xl text-gray-500 ms-8">
          My Orders :
        </h1>
      </div>

      {orders.length > 0 ? (
        <>
          {orders.map((order) => (
            <div className="w-[80%] mx-auto my-8  shadow-lg rounded-md  flex justify-between items-center p-3 ">
              <div className="text-start p-3">
                {order.cartItems.map((item) => (
                  <div className="flex justify-between items-center gap-5 mb-5 ">
                    <div className=" mx-8">
                      <img
                        src={item.product.imageCover}
                        className="w-20"
                        alt={item.product.title}
                      />
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center  mb-2">
                        <ph4 className="text-lg font-semibold text-gray-700">
                          {item.product.title}
                        </ph4>
                      </div>
                      <div className="flex justify-center  mb-2">
                        <h4 className="text-lg font-semibold text-main">
                          {item.price} EGP
                        </h4>
                      </div>
                      <div className="flex gap-3 justify-center mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">
                          Qty:{" "}
                        </h4>
                        <p className="text-lg font-medium text-main">
                          {item.count}
                        </p>
                      </div>
                      <div className="flex gap-3 justify-center mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">
                          Total Price:{" "}
                        </h4>
                        <p className="text-lg font-medium text-main">
                          {item.count * item.price} EGP
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* details*/}
              <div className="text-start p-3">
                <h3 className="border-b-lime-500 w-full mb-2 text-3xl font-semibold text-gray-900 border-b">
                  order details
                </h3>
                <div className="flex justify-between gap-5 mb-2">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Order ID:{" "}
                  </h4>
                  <p className="text-lg font-medium text-main">{order.id}</p>
                </div>
                <div className="flex justify-between gap-5 mb-2">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Payment Method:{" "}
                  </h4>
                  <p className="text-lg font-medium text-main">
                    {order.paymentMethodType}
                  </p>
                </div>
                <div className="flex justify-between gap-5 mb-2">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Address:{" "}
                  </h4>
                  <p className="text-lg font-medium text-main">
                    {order.shippingAddress.city}-{order.shippingAddress.details}
                  </p>
                </div>
                <div className="flex justify-between gap-5 mb-2">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Phone Number:{" "}
                  </h4>
                  <p className="text-lg font-medium text-main">
                    {order.shippingAddress.phone}
                  </p>
                </div>
                <div className="flex justify-between gap-5 mb-2">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Total Order Price:{" "}
                  </h4>
                  <p className="text-lg font-medium text-main">
                    {order.totalOrderPrice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
}
