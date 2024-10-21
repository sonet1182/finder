import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { testimonialData } from "../../utils/testimonialData";

import p1 from "../../assets/review/p1.jpg";
import p2 from "../../assets/review/p2.jpg";
import p3 from "../../assets/review/p3.jpg";
import p5 from "../../assets/review/p5.jpg";
import p6 from "../../assets/review/p6.jpg";

function TestimonialSection() {
  var settings = {
    infinite: true,
    padding: 3,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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

  const testimonialList = testimonialData.map((data, index) => {
    return (
      <div className="testimonial" key={index}>
        <div className="pic">
          <Image height={100} width={100} src={data.photo} alt="jobBox" />
        </div>
        <p className="description testimonial_ellipsis">{`"${data.review}"`}</p>
        <h3 className="title">{data.name}</h3>
        <small className="post">- {data.designation}</small>
      </div>
    );
  });

  return (
    <section className="section-box">
      <div className="light-bg section-box wow animate__animated animate__fadeIn py-5">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
              People Love Us!
            </h2>
            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
              We are prod to share the experience of our honourable clients
            </p>
          </div>
          <div className="box-swiper row mt-50">
            <div className="col-md-6 pt-2">
              <div className="neomp review-box my-2 card-grid-2 hover-up text-center">
                <h4 className="text-center py-3">
                  What our <span style={{ color: "purple" }}>Parents</span> say
                  about us
                </h4>
                <Slider {...settings}>
                  <span className="pt-5">
                    <div
                      className=""
                      style={{
                        overflow: "hidden",
                        width: "220px",
                        height: "220px",
                        display: "inline-block",
                        position: "relative",
                        border: "3px solid #a30a74",
                        borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%",
                      }}
                    >
                      <Image src={p6} height={250} width={250} alt="photo" />
                    </div>
                    <div className="card-block-info">
                      <h4>Sadia Naznin</h4>

                      <p className="font-sm">Mother to Grade 4 Student</p>

                      <p className="font-md color-text-paragraph mt-10">
                        “Tutorsheba has many exceptional and dedicated tutors
                        for my child. Their tutor has learned my child very
                        well. I am grateful for the positive impact on my
                        child&#39;s education to Tutorsheba and highly recommend
                        them to other parents”.
                      </p>
                    </div>
                  </span>
                  <span>
                    <div
                      className=""
                      style={{
                        overflow: "hidden",
                        width: "220px",
                        height: "220px",
                        display: "inline-block",
                        position: "relative",
                        border: "3px solid #a30a74",
                        borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%",
                      }}
                    >
                      <Image src={p5} height={250} width={250} alt="photo" />
                    </div>
                    <div className="card-block-info">
                      <h4>Sumon Sheikh</h4>
                      Father to Grade 4 Student
                      <p className="font-md color-text-paragraph mt-10">
                        “Tutorsheba has been a lifesaver for my child&#39;s
                        education. Their tutors are knowledgeable, engaging, and
                        dedicated to helping my child succeed. I have seen a
                        remarkable improvement in my child&#39;s grades and
                        confidence since starting with Tutorsheba, and I highly
                        recommend their services to any parent looking for
                        quality tutoring”.
                      </p>
                    </div>
                  </span>
                </Slider>
              </div>
            </div>
            <div className="col-md-6 pt-2">
              <div className="neomp review-box my-2 card-grid-2 hover-up text-center">
                <h4 className="text-center py-3">
                  What our <span style={{ color: "purple" }}>Tutors</span> say
                  about us
                </h4>

                <Slider {...settings}>
                  <span>
                    <div
                      className=""
                      style={{
                        overflow: "hidden",
                        width: "220px",
                        height: "220px",
                        display: "inline-block",
                        position: "relative",
                        border: "3px solid #a30a74",
                        borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%",
                      }}
                    >
                      <Image src={p1} height={250} width={250} alt="photo" />
                    </div>
                    <div className="card-block-info">
                      <h4>Sadia Islam Shanta</h4>

                      <p className="font-sm">
                        Physics Teacher ( BUTEX- Dept. of WPE )
                      </p>

                      <p className="font-md color-text-paragraph mt-10">
                        “This website is very user-friendly and helpful to both
                        teachers and students. Thank you tutorsheba”.
                      </p>
                    </div>
                  </span>
                  <span>
                    <div
                      className=""
                      style={{
                        overflow: "hidden",
                        width: "220px",
                        height: "220px",
                        display: "inline-block",
                        position: "relative",
                        border: "3px solid #a30a74",
                        borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%",
                      }}
                    >
                      <Image src={p2} height={250} width={250} alt="photo" />
                    </div>
                    <div className="card-block-info">
                      <h4>Tafsiruzzaman</h4>

                      <p className="font-sm">
                        Mathematics Teacher (UAP- Dept. of Civil Eng. )
                      </p>

                      <p className="font-md color-text-paragraph mt-10">
                        “I have been using Tutorsheba since 2019 and it helped
                        me tremendously not only with extra income but also with
                        growing network , improving skills and confidence”.
                      </p>
                    </div>
                  </span>
                  <span>
                    <div
                      className=""
                      style={{
                        overflow: "hidden",
                        width: "220px",
                        height: "220px",
                        display: "inline-block",
                        position: "relative",
                        border: "3px solid #a30a74",
                        borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%",
                      }}
                    >
                      <Image src={p3} height={250} width={250} alt="photo" />
                    </div>
                    <div className="card-block-info">
                      <h4>Syed Moin Hossain</h4>

                      <p className="font-sm">
                        English Teacher ( NSU- Dept. of LAW )
                      </p>

                      <p className="font-md color-text-paragraph mt-10">
                        “My experience with tutorsheba I quite appreciable.
                        Happy with your service. Will recommend to my friends”.
                      </p>
                    </div>
                  </span>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
