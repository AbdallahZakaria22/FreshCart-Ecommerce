import React, { useEffect, useState } from "react";
import FeatureProducts from "../FeatureProducts/FeatureProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import LoaderScreen from "../LoaderScreen/LoaderScreen";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      {showLoader && <LoaderScreen /> ? (
        <LoaderScreen />
      ) : (
        <>
          <MainSlider />
          <CategoriesSlider />
          <h1 className="text-start font-bold my-8 text-2xl container text-gray-500">
            Products
          </h1>
          <FeatureProducts />
        </>
      )}
    </>
  );
}
