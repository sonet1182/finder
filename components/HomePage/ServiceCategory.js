import React, { useState } from "react";
import Slider from "react-slick";
import admission from "../../assets/icons/graduation_10555313.png"
import religious from "../../assets/icons/reading_7160849.png"
import language from "../../assets/icons/languages_10775465.png"
import skill from "../../assets/icons/development_4154585.png"
import Image from "next/image";

function ServiceCategory() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Versity Admission',
      image: admission,
    },
    {
      id: 2,
      name: 'Language Learning',
      image: language,
    },
    {
      id: 3,
      name: 'Test Preperation',
      image: admission,
    },
    {
      id: 3,
      name: 'Special Skill Development',
      image: skill,
    },
    {
      id: 3,
      name: 'Prof. Skill Development',
      image: skill,
    },
    {
      id: 3,
      name: 'Bangla Medium',
      image: admission,
    },
    {
      id: 3,
      name: 'English Medium',
      image: admission,
    },
    {
      id: 3,
      name: 'English Version',
      image: admission,
    },
    {
      id: 3,
      name: 'Madrasa Medium',
      image: religious,
    },
    {
      id: 3,
      name: 'Arts',
      image: admission,
    },
    {
      id: 3,
      name: 'Religious Studies',
      image: religious,
    },
  ]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
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
        <div className=" wow animate__animated animate__fadeIn pt-70">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
                Our Services
              </h2>
              <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                Here are services we provide
              </p>
            </div>
            <div className="box-swiper mt-50">
              <div className="swiper-container swiper-group-5 swiper">
                <div className="swiper-wrapper pb-30">
                  <div className="swiper-slide">
                    <Slider {...settings}>
                      {services.map((service, i) => (
                        <div className="p-1" key={i}>
                          <div className="card hover-up text-center shadow-sm">
                            <div className="bg-white p-4">
                              <div className="d-flex justify-content-between flex-column align-items-center">
                                <Image
                                  src={service.image}
                                  className="py-2"
                                  alt=""
                                  height="80"
                                  width="70"
                                />
                                <h1 className="fs-5 text-capitalize text-center">
                                  {service.name}
                                </h1>
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

export default ServiceCategory;
