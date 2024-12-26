import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import axios from "axios";
import { toast } from "react-toastify";

export default function CategoriesSlider() {
  const [catImages, setCatImages] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: false,
    accessibility: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function categoriesImage() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((data) => {
        setCatImages(data.data.data);
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  }

  useEffect(() => {
    categoriesImage();
  }, []);

  return (
    <>
      <div className="container mb-8">
        <h1 className="text-start font-bold my-8 text-2xl text-gray-500">
          Featured Categories
        </h1>
        <Slider {...settings}>
          {catImages.map((cat, index) => (
            <div key={index} className="text-center hover:text-lime-400">
              <img
                className="h-[250px] w-full"
                src={cat.image}
                alt={cat.name}
              />
              <p className="my-2 font-medium">{cat.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
