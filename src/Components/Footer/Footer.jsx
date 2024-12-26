import React from "react";
import amazon from "../../assets/amazonpay-DDt8kHan.svg";
import american from "../../assets/american-express-F7V82bnT.svg";
import visa from "../../assets/Visa.svg";
import paypal from "../../assets/Paypal.svg";
import mastercard from "../../assets/mastercard-CokDZD99.svg";
import app from "../../assets/appstore.svg";
import google from "../../assets/googleplay.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-200 py-8">
      <div className="container  px-4 ">
        <h2 className="text-xl font-bold mb-2 text-main">
          Get The FreshCart App
        </h2>
        <p className="text-gray-700  font-semibold  mb-4">
          We will send you a link, open it on your phone to download the app.
        </p>

        <div className="flex flex-col md:flex-row  gap-4 mb-6 ">
          <input
            type="email"
            placeholder="Email .."
            className="w-full md:w-1/3 px-4 flex-grow py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-lime-300"
          />
          <button className="bg-lime-500 text-white px-6 py-2 rounded-md hover:bg-lime-700">
            Share App Link
          </button>
        </div>

        <div className="relative w-full h-0">
          <div className="absolute inset-0 h-0.5 bg-gray-300"></div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4  py-4 mt-2">
          <div className=" flex justify-center items-center flex-wrap gap-4">
            <p className="text-gray-700 text-lg font-semibold ">
              Payment Partners
            </p>
            <div className="flex justify-center items-center flex-wrap gap-4 ">
              <img src={amazon} alt="Amazon Pay" />
              <img src={american} alt="American Express" />
              <img src={mastercard} alt="Mastercard" />
              <img src={paypal} alt="PayPal" />
              <img src={visa} alt="Visa" />
            </div>
          </div>

          <div className="flex justify-center items-center flex-wrap gap-4">
            <p className="text-gray-700 text-lg font-semibold ">
              Get deliveries with FreshCart
            </p>
            <div className="flex justify-center items-center gap-4">
              <img src={google} alt="Google Play" />
              <img src={app} alt="App Store" />
            </div>
          </div>
        </div>

        <div className="relative w-full h-0">
          <div className="absolute inset-0 h-0.5 bg-gray-300"></div>
        </div>
      </div>
    </footer>
  );
}
