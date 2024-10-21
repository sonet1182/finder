import React, { useState } from "react";

import MasterLayout from "../../Layouts/MasterLayout";
import RelatedJobs from "../../components/Job/RelatedJobs";
import JobTags from "../../components/Job/JobTags";
import SocialShare from "../../components/Common/SocialShare";
import JobModal from "../../components/HomePage/JobSection/JobModal";
import ProcessSection from "../../components/HomePage/ProcessSection";
import Meta from "../../components/Meta/Meta";

function JobDetails({ jobDetails, relJobs }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const {
    title,
    category,
    work_place,
    unit_price,
    working_hours,
    tags,
    occupation,
    number_of_people,
    activity_frequency,
    work_content,
    required_skill,
    remarks,
    already_applied,
  } = jobDetails;

  return (
    <>
      <Meta title={`${title} | Tutor Sheba`} />
      <section className="section-box mt-20">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
              <div className="box-border-single">
                <div className="row mt-10">
                  <div className="col-lg-8 col-md-12">
                    <h3>{title}</h3>
                    <div className="mt-0 mb-15">
                      <span className="card-briefcase">{category}</span>
                      <span className="card-time">3 mins ago</span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 text-lg-end">
                    <div
                      className="btn btn-apply-icon btn-apply btn-apply-big hover-up"
                      onClick={handleShow}
                    >
                      Apply now
                    </div>
                  </div>
                </div>
                <div className="border-bottom pt-10 pb-10"></div>

                <div className="job-overview">
                  <h5 className="border-bottom pb-15 mb-30">Overview</h5>
                  <div className="row">
                    <div className="col-md-6 d-flex">
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description industry-icon mb-10">
                          Occupation
                        </span>
                        <strong className="small-heading">{occupation}</strong>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex">
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description experience-icon mb-10">
                          Positions
                        </span>
                        <strong className="small-heading">
                          {number_of_people}
                        </strong>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-25">
                    <div className="col-md-6 d-flex mt-sm-15">
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description salary-icon mb-10">
                          Project Unit Price
                        </span>
                        <strong className="small-heading">{unit_price}</strong>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex">
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description experience-icon mb-10">
                          Experience
                        </span>
                        <strong className="small-heading">1 - 2 years</strong>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-25">
                    <div className="col-md-6 d-flex mt-sm-15">
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description jobtype-icon mb-10">
                          Activity Frequency
                        </span>
                        <strong className="small-heading">
                          {activity_frequency}
                        </strong>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex mt-sm-15">
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description mb-10">
                          Working Hours
                        </span>
                        <strong className="small-heading">
                          {working_hours}
                        </strong>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-25">
                    <div className="col-md-6 d-flex mt-sm-15">
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description jobtype-icon mb-10">
                          Updated
                        </span>
                        <strong className="small-heading">10/07/2022</strong>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex mt-sm-15">
                      <div className="sidebar-text-info ml-10">
                        <span className="text-description mb-10">Location</span>
                        <strong className="small-heading">{work_place}</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-single">
                  <h4>Content of work</h4>
                  <p className="contains-new-line text-dark">{work_content}</p>
                  <h4>Requirements</h4>
                  <p className="contains-new-line text-dark">
                    {required_skill}
                  </p>
                  {remarks && (
                    <>
                      <h4>Others</h4>
                      <p className="contains-new-line text-dark">{remarks}</p>
                    </>
                  )}
                </div>
                <div className="single-apply-jobs">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <a className="btn btn-default mr-15" onClick={handleShow}>
                        Apply now
                      </a>
                      <a className="btn btn-border" href="#">
                        Save job
                      </a>
                    </div>
                    <div className="col-md-7 text-lg-end social-share">
                      <SocialShare />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 pl-40 pl-lg-15 mt-lg-30">
              {relJobs.length > 0 && (
                <RelatedJobs relJobs={relJobs.slice(0, 8)} />
              )}

              {tags && <JobTags tags={tags} />}
            </div>
          </div>
        </div>
      </section>
      <ProcessSection onlySteps />

      <JobModal show={show} setShow={setShow} />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const jobDetailsResp = await fetch(
    `${process.env.domain}jobs/${context.params.id}`
  );

  const relJobsResp = await fetch(
    `${process.env.domain}related-jobs/${context.params.id}`
  );

  const jobDetails = await jobDetailsResp.json();
  const relJobs = await relJobsResp.json();

  return {
    props: {
      jobDetails,
      relJobs: relJobs.jobs,
    },
  };
};

JobDetails.Layout = MasterLayout;

export default JobDetails;
