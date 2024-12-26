import React from "react";
import NotFoundimg from "../../assets/error.svg";
export default function NotFound() {
  return (
    <>
      <div className="w-1/2  mx-auto mt-20">
        <img src={NotFoundimg} alt="NotFound" />
      </div>
    </>
  );
}
