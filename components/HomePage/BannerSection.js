import React, { useState } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import admission from "../../assets/icons/graduation_10555313.png";
import Select from "react-select";
import Slider from "react-slick";
import Image from "next/image";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function BannerSection() {
  const [selectedOption, setSelectedOption] = useState(null);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
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

  const skillsList = [
    "English",
    "Bangla",
    "Math",
    "Physics",
    "Chemistry",
    "Biology",
    "ICT",
  ];

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "মোবাইল ফোন",
      image: admission,
    },
    {
      id: 2,
      name: "বাইক",
      image: admission,
    },
    {
      id: 3,
      name: "ডকুমেন্টস",
      image: admission,
    },
    {
      id: 4,
      name: "সার্টিফিকেট",
      image: admission,
    },
    {
      id: 5,
      name: "সার্টিফিকেট",
      image: admission,
    },
    {
      id: 6,
      name: "স্বজন",
      image: admission,
    },
  ]);

  return (
    <>
      <section className="section-box">
        <div className="banner-hero hero-2 hero-3">
          <div className="banner-inner" style={{ zIndex: '9' }}>
            <div className="block-banner">
              <h1 className="text-42 color-white wow animate__animated animate__fadeInUp">
                <div className="text-white">
                  <span>&#8220;</span> হারিয়ে যাওয়া <span>&#8221;</span>
                </div>
                জিনিস অথবা ব্যাক্তি খুঁজে পান সহজেই
              </h1>
              <div
                className="font-lg font-regular color-white mt-20 wow animate__animated animate__fadeInUp"
                data-wow-delay=".1s"
              >
                Each month, more than 3 million job seekers turn to website in
                their search for work, making over 140,000 applications every
                single day
              </div>
              <div
                className="form-find mt-40 wow animate__animated animate__fadeIn"
                data-wow-delay=".2s"
              >
                <form>
                  <div className="box-industry">
                    <Select
                      placeholder={<div>ধরন</div>}
                      styles={{
                        menu: (provided) => ({ ...provided, zIndex: 9999 }),
                      }}
                      className="form-input mr-10 select-active"
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                    />
                  </div>
                  <div className="box-industry">
                    <Select
                      placeholder={<div>লোকেশন</div>}
                      styles={{
                        menu: (provided) => ({ ...provided, zIndex: 9999 }),
                      }}
                      className="form-input mr-10 select-active"
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                    />
                  </div>

                  <input
                    className="form-input input-keysearch mr-10"
                    type="text"
                    placeholder="নাম / বর্ণনা... "
                  />

                  <div className="wrap2">
                    <button className="button2">
                      <FaSearch className="text-light" /> খুঁজুন
                      <FaArrowRight />
                    </button>
                  </div>
                </form>
              </div>
              <div
                className="list-tags-banner mt-20 wow animate__animated animate__fadeInUp"
                data-wow-delay=".3s"
              >
                <strong>Popular Searches:</strong>
                <a href="#">Designer</a>, <a href="#">Web</a>,{" "}
                <a href="#">IOS</a>, <a href="#">Developer</a>,{" "}
                <a href="#">PHP</a>, <a href="#">Senior</a>,{" "}
                <a href="#">Engineer</a>
              </div>
            </div>
          </div>

    
                 

                 

       
         
          

          <div className="box-swiper mt-50 container">
            <div className="swiper-container swiper-group-5 swiper">
              <div className="swiper-wrapper pt-5">
                <div
                  className="swiper-slide hover-up">
                  <Slider {...settings}>
                    {categories.map((category, i) => (
                      <div
                        className="swiper-slide hover-up px-2 text-center"
                        key={i}
                      >
                        <div className="item-logo justify-content-center">
                          <div className="image-left">
                            <Image
                              src={category.image}
                              className="py-2"
                              alt=""
                              height="50"
                              width="50"
                            />
                          </div>
                          <div className="text-info-right">
                            <h4 className="">{category.name}</h4>
                            <p className="font-xs">
                              185<span> Available</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BannerSection;
