import Image from "next/image";
import React, { useState } from "react";
import managementLogo from "../../../assets/imgs/page/homepage1/management.svg";
import JobModal from "./JobModal";

function JobCard({ jobs }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {jobs?.slice(0, 8)?.map((job, index) => {
        return (
          <div
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 "
            key={index}
          >
            <div className="card-grid-2 card-mh hover-up neomp">
              <div className="card-grid-2-image-left">
                <span className="flash"></span>
                <div className="right-info">
                  <span className="location-small">{job?.work_place}</span>
                </div>
              </div>
              <div className="card-block-info">
                <h6>
                  <a href="job-details.html">{job?.title?.substring(0, 10)}</a>
                </h6>
                <div className="mt-5">
                  <span className="card-briefcase">{job?.category}</span>
                  <span className="card-time">
                    4<span> minutes ago</span>
                  </span>
                </div>
                <p className="font-sm color-text-paragraph mt-15">
                  {job?.work_content?.substring(0, 50)}
                </p>
                {/* <div className="mt-30">
                <a className="btn btn-grey-small mr-5" href="jobs-grid.html">
                  Adobe XD
                </a>
                <a className="btn btn-grey-small mr-5" href="jobs-grid.html">
                  Figma
                </a>
              </div> */}
                <div className="card-2-bottom mt-30">
                  <div className="row">
                    <div className="col-lg-6 col-6">
                      <span className="fs-6 fw-bold">{job?.unit_price}</span>
                      {/* <span className="text-muted">/Hour</span> */}
                    </div>
                    <div className="col-lg-6 col-6 text-end">
                      <div className="btn btn-apply-now" onClick={handleShow}>
                        Apply now
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <JobModal show={show} setShow={setShow} />
    </>
  );
}

export default JobCard;

//
{
  /* <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 " key={index}>
<div className="card-grid-2 hover-up neomp">
  <div className="card-grid-2-image-left">
    <span className="flash"></span>
    <div className="image-box">
      <Image src={managementLogo} alt="jobBox" />
    </div>
    <div className="right-info">
      <a className="name-job" href="company-details.html">
      {job?.work_place} 
     
      </a>
      <span className="location-small">{job?.work_place}</span>
    </div>
  </div>
  <div className="card-block-info">
    <h6>
      <a href="job-details.html">UI / UX Designer fulltime</a>
    </h6>
    <div className="mt-5">
      <span className="card-briefcase">{job?.work_place}</span>
      <span className="card-time">
        4<span> minutes ago</span>
      </span>
    </div>
    <p className="font-sm color-text-paragraph mt-15">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Recusandae architecto eveniet, dolor quo repellendus pariatur
    </p>
    <div className="mt-30">
      <a className="btn btn-grey-small mr-5" href="jobs-grid.html">
        Adobe XD
      </a>
      <a className="btn btn-grey-small mr-5" href="jobs-grid.html">
        Figma
      </a>
    </div>
    <div className="card-2-bottom mt-30">
      <div className="row">
        <div className="col-lg-6 col-6">
          <span className="card-text-price">$500</span>
          <span className="text-muted">/Hour</span>
        </div>
        <div className="col-lg-6 col-6 text-end">
          <div className="btn btn-apply-now" onClick={handleShow}>
            Apply now
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div> */
}
