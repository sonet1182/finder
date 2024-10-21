import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import publicApi from "../../services/publicApi";

function DivisionalTeachers() {
  const [divisionalTutors, setDivisionalTutors] = useState();


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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

  const getDivisionalTutors = async () => {
    const response = await publicApi.get(`api/divisional_tutors`);
    if (response?.status === 200) {
      setDivisionalTutors(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    getDivisionalTutors();
  }, []);

  

  return (
    <>
    {divisionalTutors?.dhaka_total && (
      <section className="">
        <div className="box-swiper mt-50">
          <p className="mb-2">Divisional Tutors:</p>
          <div className="swiper-container swiper-group-5 swiper">
            <div className="swiper-wrapper pt-5">
              <div className="swiper-slide hover-up">

                <Slider {...settings}>
                <Link href={`tutor_list?type=all&district=3&area=&medium=&class=&gender=`}>
                <div className="p-1">
                    <div className="rand-tutor-card card-grid-3 divisional_tutor hover-up text-center py-1 mb-0">
                      <p>
                        Dhaka: {divisionalTutors?.dhaka_total}
                      </p>
                    </div>
                  </div>
                </Link>
                  

                <Link href={`tutor_list?type=all&district=4&area=&medium=&class=&gender=`}>
                  <div className="p-1">
                    <div className="rand-tutor-card card-grid-3 divisional_tutor hover-up text-center py-1 mb-0">
                      <p>
                        Chattogram: {divisionalTutors?.chattogram_total}
                      </p>
                    </div>
                  </div>
                  </Link>

                  <Link href={`tutor_list?type=all&district=8&area=&medium=&class=&gender=`}>
                  <div className="p-1">
                    <div className="rand-tutor-card card-grid-3 divisional_tutor hover-up text-center py-1 mb-0">
                      <p>
                        Barishal: {divisionalTutors?.barishal_total}
                      </p>
                    </div>
                  </div>
                  </Link>

                  <Link href={`tutor_list?type=all&district=7&area=&medium=&class=&gender=`}>
                  <div className="p-1">
                    <div className="rand-tutor-card card-grid-3 divisional_tutor hover-up text-center py-1 mb-0">
                      <p>
                      Khulna: {divisionalTutors?.khulna_total}
                      </p>
                    </div>
                  </div>
                  </Link>

                  <Link href={`tutor_list?type=all&district=6&area=&medium=&class=&gender=`}>
                  <div className="p-1">
                    <div className="rand-tutor-card card-grid-3 divisional_tutor hover-up text-center py-1 mb-0">
                      <p>
                      Sylhet: {divisionalTutors?.sylhet_total}
                      </p>
                    </div>
                  </div>
                  </Link>

                  <Link href={`tutor_list?type=all&district=5&area=&medium=&class=&gender=`}>
                  <div className="p-1">
                    <div className="rand-tutor-card card-grid-3 divisional_tutor hover-up text-center py-1 mb-0">
                      <p>
                      Rajshahi: {divisionalTutors?.rajshahi_total}
                      </p>
                    </div>
                  </div>
                  </Link>

                  <Link href={`tutor_list?type=all&district=9&area=&medium=&class=&gender=`}>
                  <div className="p-1">
                    <div className="rand-tutor-card card-grid-3 divisional_tutor hover-up text-center py-1 mb-0">
                      <p>
                      Rangpur: {divisionalTutors?.rangpur_total}
                      </p>
                    </div>
                  </div>
                  </Link>

                  <Link href={`tutor_list?type=all&district=10&area=&medium=&class=&gender=`}>
                  <div className="p-1">
                    <div className="rand-tutor-card card-grid-3 divisional_tutor hover-up text-center py-1 mb-0">
                      <p>
                      Mymensingh: {divisionalTutors?.mymensingh_total}
                      </p>
                    </div>
                  </div>
                  </Link>

                </Slider>


              </div>
            </div>
          </div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </section>
    )}
      
    </>
  );
}

export default DivisionalTeachers;
