import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Slider from "react-slick";
import publicApi from "../../services/publicApi";
import TutorSkeleton from "../Skeletons/TutorSkeleton";
import HomeTuitionImg from "../../assets/vector/Kids Studying from Home-bro.svg";
import OnlineTuitionImg from "../../assets/vector/Webinar-bro.svg";
import GroupTuitionImg from "../../assets/vector/Teaching-pana.svg";

function TuitionTypesSection() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
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
        <div className="light-bg section-box wow animate__animated animate__fadeIn py-5">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
                Tuition Types
              </h2>
              <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                Find the Best Tuition Type which suits you most
              </p>
            </div>
            <div className="box-swiper row mt-50">
              <div className="col-md-4">
                <div className="neomp my-2 card-grid-2 hover-up text-center">
                  <span className="flash"></span>
                  <div className="">
                    <Image
                      src={HomeTuitionImg}
                      height={300}
                      width={300}
                      alt="photo"
                    />
                  </div>
                  <div className="card-block-info">
                    <h4>Home Tutoring</h4>
                    <div className="mt-5">
                      <span className="card-briefcase">
                        Looking for one-to-one classes?
                      </span>
                    </div>
                    <p className="font-sm color-text-paragraph mt-10">
                      It’s a unique opportunity to learn in the home with your
                      expected future in different categories everything is in
                      favor of your need
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="neomp my-2 card-grid-2 hover-up text-center">
                  <span className="flash"></span>
                  <div className="">
                    <Image
                      src={OnlineTuitionImg}
                      height={300}
                      width={300}
                      alt="photo"
                    />
                  </div>
                  <div className="card-block-info">
                    <h4>Online Tutoring</h4>
                    <div className="mt-5">
                      <span className="card-briefcase">
                        Are you left with any doubts?
                      </span>
                    </div>
                    <p className="font-sm color-text-paragraph mt-10">
                      Connect with the best tutors from anywhere and take online
                      classes by using different tools Make your life more
                      easier with this process.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="neomp my-2 card-grid-2 hover-up text-center">
                  <span className="flash"></span>
                  <div className="">
                    <Image
                      src={GroupTuitionImg}
                      height={300}
                      width={300}
                      alt="photo"
                    />
                  </div>
                  <div className="card-block-info">
                    <h4>Group Tutoring</h4>
                    <div className="mt-5">
                      <span className="card-briefcase">
                        Need the Compititive & Effordable experience?
                      </span>
                    </div>
                    <p className="font-sm color-text-paragraph mt-10">
                      A group of students can full fill their hunger for
                      learning within more affordable tuition fees. 
                      Get the opportunity of learning with knowledge sharing!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TuitionTypesSection;
