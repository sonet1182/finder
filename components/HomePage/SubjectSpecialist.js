import React from "react";
import Slider from "react-slick";


function SubjectSpecialist() {
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

  return (
    <>
      <section className="section-box">
        <div className="section-box wow animate__animated animate__fadeIn mt-70">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
                Find Your Subject Specialist
              </h2>
              <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                Find Our Specialist to reach your dream goal
              </p>
            </div>
            <div className="box-swiper mt-50">
              <div className="swiper-container swiper-group-5 swiper">
                <div className="swiper-wrapper pb-70 pt-5">
                  <div className="swiper-slide hover-up">
                    <Slider {...settings}>
                      {skillsList.map((skill, i) => (
                        <div className="p-1" key={i}>
                          <div className="rand-tutor-card card-grid-2 hover-up text-center py-4">
                            <h4>{skill}</h4>
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

export default SubjectSpecialist;
