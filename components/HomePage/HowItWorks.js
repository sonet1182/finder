/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { FaInbox, FaMoneyBillAlt, FaSlack, FaUserPlus } from "react-icons/fa";

import dArrow from "../../public/icons/dashed-arrow.svg";

import addImg from "../../assets/icons/add_1073676.png";
import demoClass from "../../assets/icons/software-development_6802166.png";
import confirm from "../../assets/icons/mail_12247421.png";
import continueTutor from "../../assets/icons/learning_234641.png";

import Image from "next/image";
import { useState } from "react";

function HowItWorks() {

  return (
    <>
      <section className="section-box">
        <div className="light-bg section-box wow animate__animated animate__fadeIn py-5">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
                How it Works?
              </h2>
              <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                Here&apos;s how it works for{" "}
                <span className="text-purple">Tutors</span>
              </p>
            </div>

            <div className="timeline">
              <div className="timeline__event  animated fadeInUp delay-3s timeline__event--type1">
                <div className="timeline__event__icon mb-hide1">
                  <h3>1</h3>
                </div>
                <div className="timeline__event__date px-5">
                  <FaUserPlus />
                </div>
                <div className="timeline__event__content ">
                  <div className="timeline__event__title">
                    Create Tutor Profile
                  </div>
                  <div className="timeline__event__description">
                    <p>
                      Create your profile in minutes with sign up information.
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline__event animated fadeInUp delay-2s timeline__event--type2">
                <div className="timeline__event__icon mb-hide1">
                  <h3>2</h3>
                </div>
                <div className="timeline__event__date px-5">
                  <FaSlack />
                </div>
                <div className="timeline__event__content">
                  <div className="timeline__event__title">Apply for Jobs</div>
                  <div className="timeline__event__description">
                    <p>
                      Completing your profile start browsing our latest TUITION
                      JOBS page and start applying.
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline__event animated fadeInUp delay-1s timeline__event--type3">
                <div className="timeline__event__icon mb-hide1">
                  <h3>3</h3>
                </div>
                <div className="timeline__event__date px-5">
                  <FaInbox />
                </div>
                <div className="timeline__event__content">
                  <div className="timeline__event__title">
                    Get Free Tutoring Job Alert
                  </div>
                  <div className="timeline__event__description">
                    <p>
                      Get updated tutoring jobs alerts via SMS/CALL whenever new
                      jobs are posted.
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline__event animated fadeInUp timeline__event--type1">
                <div className="timeline__event__icon mb-hide1">
                  <h3>4</h3>
                </div>
                <div className="timeline__event__date px-5">
                  <FaMoneyBillAlt />
                </div>
                <div className="timeline__event__content">
                  <div className="timeline__event__title">
                    Start Tutoring and Grow Your Income
                  </div>
                  <div className="timeline__event__description">
                    <p>
                      LIf parent like the demo session , you can continue
                      tuition and start earning
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container font-pop py-5">
        <div>
          <h4 className="text-secondary pb-4 text-center">
            Here&apos;s how it works for{" "}
            <span className="text-purple">Students/Guardians</span>
          </h4>
          <div className="ms-xl-5 ps-xl-5">
            <div className="my-5 px-3">
              <div className="css-0" style={{ animationDelay: "0ms" }}>
                <div className="row row-cols-12 mb-3rem">
                  <div className="bg-white p-30 rounded-2 d-flex gap-3 col-12 col-lg-5 shadow">
                    <Image className="mb-2" src={addImg} height="80" width="80"/>
                    <div>
                      <p className="text-black2 mb-2 fs-5">
                        Search for Tutors or Post your tuition requirements
                      </p>
                      <p className="text-muted mb-0">
                        Post Tution by creating Account or without Account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="css-0" style={{ animationDelay: "0ms" }}>
                <div className="row row-cols-12 mb-3rem">
                  <div className="col-2"></div>
                  <div
                    className="bg-white p-30 rounded-2 d-flex gap-3 col-12 col-lg-5 shadow"
                    style={{ position: "relative" }}
                  >
                    <img
                      className="mb-2 mb-hide"
                      src="/icons/dashed-arrow.svg"
                      style={{
                        position: "absolute",
                        left: "-120px",
                        top: "-40px",
                      }}
                    />
                    <Image className="mb-2" src={demoClass} height="80" width="80"/>
                    <div>
                      <p className="text-black2 mb-2 fs-5">
                        Get one to one demo session for free
                      </p>
                      <p className="text-muted mb-0">
                        Get free one day demo session with the tutor at your
                        preferred location.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="css-0">
                <div className="row row-cols-12 mb-3rem">
                  <div className="col-4"></div>
                  <div
                    className="bg-white p-30 rounded-2 d-flex gap-3 col-12 col-lg-5 shadow"
                    style={{ position: "relative" }}
                  >
                    <img
                      className="mb-2 mb-hide"
                      src="/icons/dashed-arrow.svg"
                      style={{
                        position: "absolute",
                        left: "-120px",
                        top: "-40px",
                      }}
                    />
                    <Image className="mb-2" src={confirm} height="80" width="80"/>
                    <div>
                      <p className="text-black2 mb-2 fs-5">Hire your tutor</p>
                      <p className="text-muted mb-0">
                        If you like the demo session, confirm the teacher.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="css-0">
                <div className="row row-cols-12 mb-3rem">
                  <div className="col-6"></div>
                  <div
                    className="bg-white p-30 rounded-2 d-flex gap-3 col-12 col-lg-5 shadow"
                    style={{ position: "relative" }}
                  >
                    <img
                      className="mb-2 mb-hide"
                      src="/icons/dashed-arrow.svg"
                      style={{
                        position: "absolute",
                        left: "-120px",
                        top: "-40px",
                      }}
                    />
                    <Image className="mb-2" src={continueTutor} height="80" width="80"/>
                    <div>
                      <p className="text-black2 mb-2 fs-5">Get results</p>
                      <p className="text-muted mb-0">
                        Gain knowledge, boost confidence and improve overall
                        academic performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HowItWorks;
