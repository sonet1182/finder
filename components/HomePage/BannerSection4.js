import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";

import CircleMeta from "../Banner/CircleMeta";
import DivisionalTeachers from "./DivisionalTeachers";
import TutorSearchModal from "./TutorSearchModal";

function BannerSection4() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <section className="section-box top-header-banner">
        <div className="banner-hero hero-1">
          <div className="banner-innerc container">
            <div className="row">
              <div className="col-md-8">
                <div className="block-banner">
                  <h2
                    className="text-42 heading-banner wow animate__ animate__fadeInUp animated"
                    style={{
                      visibility: "visible",
                      animationName: "fadeInUp",
                      color: "purple",
                    }}
                  >
                    Best{" "}
                    <span className="color-brand-2">Tutoring Platform </span>
                    <br className="d-none d-lg-block" />
                    for Home & Online Tuitions
                  </h2>
                  <div
                    className="banner-description my-20 wow animate__ animate__fadeInUp animated"
                    data-wow-delay=".1s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.1s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <div
                      className="font-lg text-muted mt-20 wow animate__animated animate__fadeInUp"
                      data-wow-delay=".1s"
                    >
                      <FaMapMarkerAlt /> Find the Right Tutor in Your Area
                    </div>
                  </div>

                  <div className="wrap">
                    <button className="button2" onClick={handleShow}>
                      <FaSearch className="text-light" /> Find a Tutor{" "}
                      <FaArrowRight />
                    </button>
                  </div>

                  <div
                    className="list-tags-banner mt-60 wow animate__ animate__fadeInUp animated"
                    data-wow-delay=".3s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.3s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <DivisionalTeachers />
                  </div>
                </div>
              </div>
              <div className="col-md-4 shape-1 mb-hide">
                <CircleMeta />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose} keyboard="false" centered>
        <Modal.Body>
          <TutorSearchModal />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BannerSection4;
