import React from "react";
import imgSingUp from "../../assets/signup-g-Dtp6-wtD.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Please Inter Your Name")
        .min(3, "Minimam char is 3"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please Inter Your Email"),
      phone: Yup.number().required("Please Inter Your Phone"),
      password: Yup.string()
        .required("Please Inter Your password")
        .min(6, "min is 6 numbers or char"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords Not match")
        .required("Please Inter Your password"),
    }),
    onSubmit: (values) => {
      Register(values);
    },
  });

  async function Register(values) {
    setIsLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        toast.success(`${data.data.message} Please login Now`);
        navigate("/login");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="container min-h-2.5  mx-auto flex flex-wrap justify-around">
        <div className=" max-w-xxl p-6  mt-10 dark:bg-gray-800 ">
          <img src={imgSingUp} alt="" />
        </div>

        <div className=" max-w-xl p-6 text-start  dark:bg-gray-800 ">
          <h1 className="mb-1 text-3xl font-extrabold text-main">
            Get Start Shopping
          </h1>
          <p className="mt-0 mb-5">
            Welcome to FreshCart! Enter your email to get started.
          </p>

          <form onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />

              {formik.touched.name && formik.errors.name ? (
                <div
                  className="p-4 mb-4 text-lg  text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.name}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.email && formik.errors.email ? (
                <div
                  className="p-4 mb-4 text-lg  text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                htmlFor="password"
                className="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.password && formik.errors.password ? (
                <div
                  className="p-4 mb-4 text-lg  text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="rePassword"
                className="block mb-2 text-lg  font-medium text-gray-900 dark:text-white"
              >
                rePassword
              </label>

              <input
                id="rePassword"
                name="rePassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.rePassword && formik.errors.rePassword ? (
                <div
                  className="p-4 mb-4 text-lg  text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.rePassword}
                </div>
              ) : null}
            </div>

            <div>
              {isLoading ? (
                <button
                  type="submit"
                  className="text-white  bg-lime-500 mt-5 hover:bg-lime-900 transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg  w-full  px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                >
                  <i className="fa-solid fa-spinner fa-spin"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  className="text-white  bg-lime-500 mt-5 hover:bg-lime-900 transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg  w-full  px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                >
                  Register
                </button>
              )}

              <p className="mt-2 mx-1 mb-5">
                You have an account?
                <Link
                  className="mb-1 mx-1 hover:text-green-800 text-base font-bold text-main"
                  to="/login"
                >
                  Login Now!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
