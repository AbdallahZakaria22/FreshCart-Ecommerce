import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please Inter Your Email"),

      newPassword: Yup.string()
        .required("Please Inter Your password")
        .min(6, "min is 6 numbers or char"),
    }),
    onSubmit: (values) => {
      resetPassword(values);
    },
  });

  async function resetPassword(values) {
    setIsLoading(true);
    return await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((data) => {
        toast.success(
          `Your Password is Reset Successfully, please signin again`
        );

        navigate("/FreshCart-Ecommerce/login");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="w-[80%] mx-auto  text-xl">
        <div className="  mt-16  text-start dark:bg-gray-800 ">
          <h3 className="my-10 text-3xl font-extrabold text-main ">
            Reset Your Account Password
          </h3>

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
                htmlFor="newPassword"
                className="block mb-2 text-lg mt-4  font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>

              <input
                id="newPassword"
                name="newPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div
                  className="p-4 mb-4 text-lg  text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.newPassword}
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
                  Verify
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
