import React from "react";
import imgSingIn from "../../assets/signin-DlR7P608.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { TokenContext } from "../../Context/TokenContext";

export default function Signin() {
  let { token, setToken } = useContext(TokenContext);

  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please Inter Your Email"),

      password: Yup.string()
        .required("Please Inter Your password")
        .min(6, "min is 6 numbers or char"),
    }),
    onSubmit: (values) => {
      Login(values);
    },
  });

  async function Login(values) {
    setIsLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data) => {
        toast.success(`Welcome to FreshCart`);
        localStorage.setItem("Token", data.data.token);
        localStorage.setItem("Username", data.data.user.name);
        localStorage.setItem("UserEmail", data.data.user.email);
        setToken(data.data.token);
        navigate("/");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="container min-h-2.5   mx-auto flex flex-wrap justify-evenly text-xl">
        <div className="   mt-10  dark:bg-gray-800 ">
          <img src={imgSingIn} alt="" />
        </div>

        <div className=" max-w-xl mt-16 w-3/4 text-start dark:bg-gray-800 ">
          <h1 className="mb-1 text-3xl font-extrabold text-main">
            Sign in to FreshCart
          </h1>
          <p className="mt-2  mb-5">Welcome back to FreshCart!</p>

          <form onSubmit={formik.handleSubmit}>
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
                htmlFor="password"
                className="block mb-2 text-lg mt-4  font-medium text-gray-900 dark:text-white"
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
              {isLoading ? (
                <button
                  type="submit"
                  className="text-white  bg-lime-500 mt-10 hover:bg-lime-900 transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg  w-full  px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                >
                  <i className="fa-solid fa-spinner fa-spin"></i>
                </button>
              ) : (
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="text-white  bg-lime-500 mt-10 hover:bg-lime-900 transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full   px-4 py-2 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
                >
                  Login
                </button>
              )}
              <p className="mt-3 mx-1 mb-2">
                You don’t have an account?
                <Link
                  className="mb-1 mx-1 hover:text-green-800 text-base font-bold text-main"
                  to="/register"
                >
                  Sign Up
                </Link>
              </p>
              <Link
                className="mb-1 mx-1 hover:text-green-800 text-base font-bold text-main"
                to="/forget-password"
              >
                Forget Your Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
