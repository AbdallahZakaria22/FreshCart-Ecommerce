import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  const [payment, setpayment] = useState("Cash");


  const { CashCheckOut, OnlineCheckOut } = useContext(CartContext);

  const formik = useFormik({
    initialValues: {
      phone: "",
      city: "",
      details: "",
    },
    validationSchema: Yup.object({
      phone: Yup.number().required("Please Inter Your Phone"),
      city: Yup.string().required("Please Inter Your city"),
      details: Yup.string()
        .required("Details are required")
        .min(10, "Details must be at least 10 characters"),
    }),
    onSubmit: (values) => {
      ckeckOut(values);
    },
  });

  const paymentFormik = useFormik({
    initialValues: {
      paymentType: "Cash",
    },
    validationSchema: Yup.object({
      paymentType: Yup.string().required("Please select a payment type"),
    }),
    onSubmit: (values) => {
      setpayment(values.paymentType);
    },
  });

  async function ckeckOut(values) {
    if (payment == "Cash") {
      CashCheckOut(values);
    } else {
      OnlineCheckOut(values);
    }
  }

  return (
    <>
      <div className="w-[80%] mx-auto">
        <h1 className="text-start font-bold my-8 text-2xl text-gray-500">
          Checkout
        </h1>

        <div className="container text-start">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
              >
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Write Your phone..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div
                  className="p-4 mb-4 text-lg  text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
              >
                City
              </label>

              <input
                id="city"
                name="city"
                type="text"
                placeholder="Write Your city..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
              />
              {formik.touched.city && formik.errors.city ? (
                <div
                  className="p-4 mb-4 text-lg  text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.city}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="details"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Details
              </label>

              <textarea
                id="details"
                name="details"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                placeholder="Write Your Address Here..."
                rows="4"
              ></textarea>
              {formik.touched.details && formik.errors.details ? (
                <div
                  className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.details}
                </div>
              ) : null}
            </div>

            <form onSubmit={paymentFormik.handleSubmit}>
              <div>
                <div className="">
                  <label className="flex items-center mr-4  text-main text-lg">
                    <input
                      type="radio"
                      name="paymentType"
                      value="Cash"
                      onChange={(e) => {
                        paymentFormik.handleChange(e);
                        paymentFormik.submitForm();
                      }}
                      onBlur={paymentFormik.handleBlur}
                      checked={paymentFormik.values.paymentType === "Cash"}
                      className="mr-2"
                    />
                    Cash payment
                  </label>

                  <label className="flex items-center text-main text-lg">
                    <input
                      type="radio"
                      name="paymentType"
                      value="Online"
                      onChange={(e) => {
                        paymentFormik.handleChange(e);
                        paymentFormik.submitForm();
                      }}
                      onBlur={paymentFormik.handleBlur}
                      checked={paymentFormik.values.paymentType === "Online"}
                      className="mr-2"
                    />
                    Online payment
                  </label>
                </div>

                {paymentFormik.touched.paymentType &&
                paymentFormik.errors.paymentType ? (
                  <div
                    className="p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {paymentFormik.errors.paymentType}
                  </div>
                ) : null}
              </div>
            </form>

            <div>
              {payment == "Cash" ? (
                <button
                  type="submit"
                  className="text-white  bg-lime-500 mt-5 hover:bg-lime-900 transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg  w-full  px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                >
                  Cash Payment Check out
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  className="text-white  bg-lime-500 mt-5 hover:bg-lime-900 transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg  w-full  px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                >
                  Online Payment Check out
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
