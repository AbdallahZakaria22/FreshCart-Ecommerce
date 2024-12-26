import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Please Inter Your resetCode"),
    }),
    onSubmit: (values) => {
      verifyCode(values);
    },
  });

  async function verifyCode(values) {
    setIsLoading(true);
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .then((data) => {
        toast.success(`Your Code is Verified Successfully`);

        console.log(data);

        navigate("/reset-password");
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
            Please Enter Your Reset Code
          </h3>

          <form onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="resetCode"
                className="block mb-2 text-lg mt-10 font-medium text-gray-900 dark:text-white"
              >
                Reset Code
              </label>

              <input
                id="resetCode"
                name="resetCode"
                type="text"
                placeholder="your resetCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.resetCode}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {formik.touched.resetCode && formik.errors.resetCode ? (
                <div
                  className="p-4 mb-4 text-lg  text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.resetCode}
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
