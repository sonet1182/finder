import Image from "next/image";
import React from "react";
import bannerImg from "../../assets/vector/Teacher-rafiki.svg"

import Slider from "react-slick";

function CircleMeta() {
  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    // <Slider {...settings}>
      <div className="text-center d-none d-lg-block shape-1 mt-50">
        <Image src={bannerImg} alt="vector"/>
      </div>
    // </Slider>
  );
}

export default CircleMeta;
