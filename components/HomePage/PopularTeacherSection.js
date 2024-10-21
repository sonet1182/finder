import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import publicApi from "../../services/publicApi";
import TutorSkeleton from "../Skeletons/TutorSkeleton";
import TutorCard from "../Tutor/TutorCard";

function PopularTeacherSection() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [tutors, setTutors] = useState([]);

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

  const fetchTutors = async () => {
    const response = await publicApi.get(`api/random_popular_tutor`);
    if (response.status === 200) {
      setTutors(response.data.data);
      setLoading(false);
    } else {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const tutorSearchHandler = async (e) => {
    router.push({
      pathname: `/tutor_list/`,
      query: {
        type: "premium",
        district: "",
        area: "",
        medium: "",
        class: "",
        gender: "",
      },
    });
  };

  return (
    <>
      <section className="section-box">
        <div className="light-bg section-box wow animate__animated animate__fadeIn pt-70">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
                Our Popular Tutors
              </h2>
              <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                Here are few of the Verified Teachers
                <span className="float-right">
                  <button
                    className="btn btn-sm btn-1 gradient_bg text-light"
                    onClick={tutorSearchHandler}
                  >
                    View More
                  </button>
                </span>
              </p>
            </div>
            <div className="box-swiper mt-50">
              <div className="swiper-container swiper-group-5 swiper">
                <div className="swiper-wrapper pb-30">
                  <div className="swiper-slide">
                    <Slider {...settings}>
                      {!loading
                        ? tutors.map((tutor, i) => (
                            <TutorCard key={i} tutor={tutor} />
                          ))
                        : [...Array(12)].map((x, i) => (
                            <TutorSkeleton key={i} />
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

export default PopularTeacherSection;
