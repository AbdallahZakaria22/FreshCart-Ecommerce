import React, { useEffect, useState } from "react";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import axios from "axios";
import { toast } from "react-toastify";

export default function AllOrders() {
  let userId = localStorage.getItem("userid");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllOrders() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      setOrders(response.data);
    } catch (error) {
      toast.error("Error fetching orders");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      {isLoading && <LoaderScreen />}
      <div className="w-[90%] lg:w-[80%] mx-auto mb-4">
        <h1 className="text-start font-bold my-8 text-2xl text-gray-500">
          My Orders:
        </h1>
      </div>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.id}
            className="w-[90%] lg:w-[80%] mx-auto my-8 shadow-lg rounded-md flex flex-col lg:flex-row justify-between items-center p-4 gap-4"
          >
            <div className="text-start p-3 w-full lg:w-2/3">
              {order.cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-col sm:flex-row justify-between items-center gap-5 mb-5"
                >
                  <div className="mx-4">
                    <img
                      src={item.product.imageCover}
                      className="w-20 sm:w-28"
                      alt={item.product.title}
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">
                      {item.product.title}
                    </h4>
                    <h4 className="text-lg font-semibold text-main mb-2">
                      {item.price} EGP
                    </h4>
                    <div className="flex justify-center sm:justify-start gap-2 mb-2">
                      <h4 className="text-lg font-semibold text-gray-800">
                        Qty:
                      </h4>
                      <p className="text-lg font-medium text-main">
                        {item.count}
                      </p>
                    </div>
                    <div className="flex justify-center sm:justify-start gap-2 mb-2">
                      <h4 className="text-lg font-semibold text-gray-800">
                        Total Price:
                      </h4>
                      <p className="text-lg font-medium text-main">
                        {item.count * item.price} EGP
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-start p-3 w-full lg:w-1/3">
              <h3 className="border-b-lime-500 w-full mb-4 text-2xl font-semibold text-gray-900 border-b">
                Order Details
              </h3>
              <div className="flex justify-between gap-5 mb-2">
                <h4 className="text-lg font-semibold text-gray-800">Order ID:</h4>
                <p className="text-lg font-medium text-main">{order.id}</p>
              </div>
              <div className="flex justify-between gap-5 mb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  Payment Method:
                </h4>
                <p className="text-lg font-medium text-main">
                  {order.paymentMethodType}
                </p>
              </div>
              <div className="flex justify-between gap-5 mb-2">
                <h4 className="text-lg font-semibold text-gray-800">Address:</h4>
                <p className="text-lg font-medium text-main">
                  {order.shippingAddress.city} - {order.shippingAddress.details}
                </p>
              </div>
              <div className="flex justify-between gap-5 mb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  Phone Number:
                </h4>
                <p className="text-lg font-medium text-main">
                  {order.shippingAddress.phone}
                </p>
              </div>
              <div className="flex justify-between gap-5 mb-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  Total Order Price:
                </h4>
                <p className="text-lg font-medium text-main">
                  {order.totalOrderPrice}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-lg font-medium text-gray-600">
          No orders found.
        </p>
      )}
    </>
  );
}
