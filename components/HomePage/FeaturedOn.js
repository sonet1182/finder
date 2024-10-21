import React, { useState } from "react";
import Slider from "react-slick";
import admission from "../../assets/icons/graduation_10555313.png"
import religious from "../../assets/icons/reading_7160849.png"
import language from "../../assets/icons/languages_10775465.png"
import skill from "../../assets/icons/development_4154585.png"
import Image from "next/image";

import prothomAlo from "../../assets/images/paper_image/pratham-alo-logo-76b17e26.svg"
import dailyStar from "../../assets/images/paper_image/daily-star-logo-17ab1d07.svg"
import samakal from "../../assets/images/paper_image/samakal-logo-40ae7742.svg"
import champs from "../../assets/images/paper_image/champs-24-76f0ca10.svg"
import ittefaq from "../../assets/images/paper_image/ittefak-6b79023a.svg"


function FeaturedOn() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Prothom Alo',
      image: prothomAlo,
    },
    {
      id: 2,
      name: 'Daily Star',
      image: dailyStar,
    },
    {
      id: 3,
      name: 'Samakal',
      image: samakal,
    },
    {
      id: 3,
      name: 'Champs',
      image: champs,
    },
    {
      id: 3,
      name: 'Ittefaq',
      image: ittefaq,
    },
  ]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className="section-box">
        <div className="light-bg wow animate__animated animate__fadeIn pt-70">
          <div className="container">
            <div className="">
              <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
                We were <span className="text-purple">featured</span> on:
              </h2>
            </div>
            <div className="box-swiper mt-50">
              <div className="swiper-container swiper-group-5 swiper">
                <div className="swiper-wrapper pb-30">
                  <div className="swiper-slide">
                    <Slider {...settings}>
                      {services.map((service, i) => (
                        <div className="p-1" key={i}>
                          <div className="card hover-up text-center shadow-sm">
                            <div className="bg-white px-3">
                              <div className="d-flex justify-content-between flex-column align-items-center">
                                <Image
                                  src={service.image}
                                  className="py-2"
                                  alt=""
                                  height="110"
                                  // width="70"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeaturedOn;
