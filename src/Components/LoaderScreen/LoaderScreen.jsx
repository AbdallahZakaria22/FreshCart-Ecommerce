import React from "react";
import { ThreeCircles } from "react-loader-spinner";
export default function LoaderScreen() {
  return (
    <>
      <div className="bg-gray-300 flex justify-center h-screen items-center">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}
