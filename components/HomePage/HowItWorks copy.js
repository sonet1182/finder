import React from "react";
import { Accordion } from "react-bootstrap";

function HowItWorks() {
  return (
    <section className="section-box">
      <div className="light-bg section-box wow animate__animated animate__fadeIn py-5">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
              How it Works?
            </h2>
          </div>

          <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp mt-50">
            Here&apos;s how it works for Tutor:
        </p>

          <div className="box-swiper mt-10">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Create Tutor Profile</Accordion.Header>
                <Accordion.Body>
                Become a teacher by creating your profile here and tell us about yourself, your skills, subject expertise, qualifications, teaching ability and experience. Be sure to provide as much information as you can in your profile so that we can speed up the verification process and your profile starts showing up in the right spot when parents and students are searching for home tutors on our website.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Apply for Jobs</Accordion.Header>
                <Accordion.Body>
                Once your profile is complete, you can start browsing our latest TUITION JOBS page and start applying for the tuition jobs that best fits your skills, favorable location, class and subjects.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Get Free Tutoring Job Alert</Accordion.Header>
                <Accordion.Body>
                Get updated tutoring jobs alerts via SMS/CALL whenever new jobs are posted.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Start Tutoring and Grow Your Income</Accordion.Header>
                <Accordion.Body>
                If parent like the demo session , you can continue tuition and start earning
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

        
            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp mt-50">
            Here&apos;s how it works for Parents & Students:
            </p>
   

            <div className="box-swiper mt-10">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Search for Tutors os Post your tuition requirements</Accordion.Header>
                <Accordion.Body>
                Search from our huge database of home tutors matching your needs and if you need help, you can post your tuition requirement here for free. One of our team member will get in touch with you soon over the phone to discuss and confirm your requirements.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Get one to one demo session for free</Accordion.Header>
                <Accordion.Body>
                Once we have identified a perfect home tutor for you that matches your tuition requirement, we will arrange a one day demo session with the tutor at your preferred location.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Hire your tutor</Accordion.Header>
                <Accordion.Body>
                If you like the demo session, you continue with the same teacher .In case, If you do not like the demo session, we will arrange a new teacher for you.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Get results</Accordion.Header>
                <Accordion.Body>
                Gain knowledge, boost confidence and improve overall academic performance.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>


        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
