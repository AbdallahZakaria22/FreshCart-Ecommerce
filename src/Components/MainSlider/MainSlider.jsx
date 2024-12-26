import React from "react";
import Slider from "react-slick";
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import img1 from "../../assets/grocery-banner.png";
import img2 from "../../assets/grocery-banner-2.jpeg";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    accessibility: true,
    infinite: true,
  };
  return (
    <>
      <div className="grid grid-cols-3 container py-4 mb-5">
        <div className="col-span-2">
          <Slider {...settings}>
            <img src={slide1} alt="" className="h-[400px]" />
            <img src={slide2} alt="" className="h-[400px]" />
            <img src={slide3} alt="" className="h-[400px]" />
          </Slider>
        </div>
        <div className="col-span-1 ">
          <img src={img1} alt="" className="h-[200px]" />
          <img src={img2} alt="" className="h-[200px]" />
        </div>
      </div>
    </>
  );
}
