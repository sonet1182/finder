import React, { useState, useContext } from "react";
import Slider from "react-slick";
import TutorCard from "../Tutor/TutorCard";


function JobSection() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
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
      <section className="section-box mt-20">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
              Our Popular Tutors
            </h2>
            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
              Search and connect with the right candidates faster.{" "}
            </p>
          </div>

          <div className="mt-70">
            <div className="">
              <Slider {...settings}>
                {[...Array(10)].map((x, i) => (
                  <TutorCard key={i} />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default JobSection;
