import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import LoaderScreen from "../LoaderScreen/LoaderScreen";
import Slider from "react-slick";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function ProductDetails() {
  const { addToCart } = useContext(CartContext);
  const { addToWishList, numberOfWishList, WishLists, deleteItemOnWishList } =
    useContext(WishlistContext);

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    accessibility: true,
  };

  async function addProductToCart(id) {
    let data = await addToCart(id);
  }

  let { id } = useParams();

  async function productDetail() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => {
        setProduct(data.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    productDetail();
  }, []);

  return (
    <>
      {isLoading ? <LoaderScreen /> : ""}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-evenly  py-4 mb-5">
        <div className="col-span-1 m-auto w-full md:w-3/4 rounded-md shadow">
          <Slider {...settings}>
            {product?.images?.map((src, index) => (
              <img
                key={index}
                className="w-full h-auto object-cover"
                src={src}
                alt={product?.title}
              />
            ))}
          </Slider>
        </div>

        <div className="col-span-2 p-4">
          <div className="text-start px-2">
            <h3 className="mb-4 text-xl md:text-2xl font-semibold text-black">
              {product?.title}
            </h3>

            <p className="text-black mb-4 text-sm md:text-base font-medium">
              {product?.description}
            </p>

            <h4 className="text-main mb-4 text-sm md:text-lg font-medium">
              {product?.category?.name}
            </h4>

            <div className="flex flex-col md:flex-row justify-around items-center mt-2 gap-4">
              <div className="flex gap-4">
                {product?.priceAfterDiscount ? (
                  <>
                    <p className="line-through text-sm md:text-base">
                      {`${product?.price} EGP`}
                    </p>
                    <p className="text-sm md:text-base">
                      {`${product?.priceAfterDiscount} EGP`}
                    </p>
                  </>
                ) : (
                  <p className="text-sm md:text-base">{`${product?.price} EGP`}</p>
                )}
              </div>

              <p className="text-sm md:text-lg flex items-center">
                <i className="fa fa-star rating-color mr-2"></i>
                {`${product?.ratingsAverage}`}
              </p>

              {numberOfWishList > 0 ? (
                WishLists.some((item) => item.id === product.id) ? (
                  <p>
                    <i
                      onClick={() => {
                        deleteItemOnWishList(product.id);
                      }}
                      className="fa-solid fa-heart fa-2xl cursor-pointer text-red-700 w-1/3"
                    ></i>
                  </p>
                ) : (
                  <p>
                    <i
                      onClick={() => addToWishList(product.id)}
                      className="fa-regular fa-heart fa-2xl cursor-pointer text-red-700 w-1/3"
                    ></i>
                  </p>
                )
              ) : (
                <p>
                  <i
                    onClick={() => addToWishList(product.id)}
                    className="fa-regular fa-heart fa-2xl cursor-pointer text-red-700 w-1/3"
                  ></i>
                </p>
              )}
            </div>

            <div className="py-2 mt-4">
              <button
                onClick={() => addProductToCart(product.id)}
                className="py-2 px-4 bg-main text-white w-full rounded text-sm md:text-base"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
