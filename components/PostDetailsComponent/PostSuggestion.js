import React from "react";
import Slider from "react-slick";
import JobCard from "../Job/JobCard";

function PostSuggestion() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6500,
    dots: false,
  };

  return (
    <div className="container">
      <h4 className="page-title py-4">একই ধরনের আরও পোস্ট</h4>

      <Slider {...settings}>
        {[...Array(5)].map((service, i) => (
          <div className="p-1" key={i}>
            <div className="bg-white px-3">
              <div className="d-flex justify-content-between flex-column align-items-center">
                <JobCard />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default PostSuggestion;
