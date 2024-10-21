import { faTruckArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Card, CardGroup } from "react-bootstrap";
import { FaBluetooth } from "react-icons/fa";
import Slider from "react-slick";
import publicApi from "../../services/publicApi";

function BannerSlider() {
  const [banners, setBanners] = useState([]);

  // const url = "http://localhost:8000/";
  const url = "http://backend.itsheba.com.bd/";

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async (e) => {
    const response = await publicApi.get("api/bannar-list");
    if (response.status === 200) {
      setBanners(response.data.banners);
    } else {
      console.log("Server Error");
    }
  };

  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: false,
  };

  return (
    <>
      <Slider {...settings}>
        {banners.map((banner, i) => (
          <div key={i} className="">
            <Image
              src={url + banner.img}
              alt="thumbnail"
              width="100%"
              height="45"
              layout="responsive"
            />
          </div>
        ))}
      </Slider>
    </>
  );
}

export default BannerSlider;
