import Image from "next/image";
import React from "react";
import sideImg from "../../assets/vector/Online learning-pana.svg";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import Link from "next/link";


function SearchTutorSection() {
  return (
    <section className="section-box mt-20">
      <div className="text-center">
        <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
          SEARCH TUTORING JOBS
        </h2>
        <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp mb-hide">
          Find Your Tution Jobs, in your area
        </p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="text-center d-lg-block shape-1 mt-50">
              <Image src={sideImg} alt="svg" />
            </div>

            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp text-center pc-hide">
          Find Your Tution Jobs, in your area
        </p>
          </div>
          <div className="col-md-6">
            <div
              className="py-3 mt-40 wow animate__animated animate__fadeIn"
              data-wow-delay=".2s"
            >
              <div className="text-center py-3 font-md color-text-paragraph-2 wow animate__animated animate__fadeInUp mb-hide">
              <h5>Looking for interesting tuition jobs to excel your teaching experience? </h5>
              If teaching jobs interests you, 
              then you are on the right place. tutorsheba.com, we often have <strong>500+</strong> open home tuition jobs that are genuine and <strong>100%</strong> verified. 
              Whether you are starting your career as a tuition teacher or an expert in your field, we can help you find your next big tuition job. 
              You can search and apply to the tuition jobs that best fit your skills, favorable location, class and subjects.
              </div>

              

              <div className="w-100 text-center">
                <Link href="/tuition-list">
                  <a className="animated-button1 text-light link">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <FaSearch className="text-light" /> Search Tution{" "}
                    <FaArrowRight />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchTutorSection;
