import React from "react";
import {
  FaDesktop,
  FaHome,
  FaMapMarkerAlt,
  FaNewspaper,
  FaPhone,
} from "react-icons/fa";
import moment from "moment/moment";
import Link from "next/link";

import {
  FaCalendar,
  FaElementor,
  FaGraduationCap,
  FaMoneyBill,
  FaSchool,
  FaUserTie,
} from "react-icons/fa";

function JobCard({ job }) {
  return (
    <>
      <div className="neomp my-2 card-grid-2 hover-up h-100">
        <div className="card-grid-2-image-left d-flex">
          <div className="right-info">
            <a className="name-job" href="">
              <FaMapMarkerAlt /> {job.s_area}, &nbsp;
              {job.districts?.districtName}
            </a>
          </div>

          <span className="btn btn-grey-small ml-auto ">Job ID: {job.id}</span>
        </div>

        <div className="card-block-info">
          <Link href={`/tuition-list/view/${job.id}`}>
            <h4 className="text-ellipsis" style={{ cursor: "pointer" }}>
              {job.title}
            </h4>
          </Link>

          <div className="mt-4 mb-3">
            <span className="t-type">
              {job.tutoring_type == "Home" ? (
                <>
                  <FaHome /> {job.tutoring_type}
                </>
              ) : (
                <>
                  <FaDesktop /> {job.tutoring_type}
                </>
              )}{" "}
              {job.s_number > 1 ? " + Group" : ""}
              Tutoring
            </span>{" "}
            <span className="publish">
              <FaNewspaper />{" "}
              {job.created_at && moment(job.created_at).fromNow()}
            </span>
          </div>

          <div className="job-details mt-3">
            <div className="row">
              <div className="col-md-4 col-6">
                <div className="pb-2">
                  <FaSchool /> Medium:<br></br>
                  <strong> {job?.s_medium}</strong>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="pb-2">
                  <FaElementor /> Class: <br></br>
                  <strong> {job?.s_class}</strong>
                </div>
              </div>

              <div className="col-md-4 col-6">
                <div className="pb-2">
                  <FaUserTie /> Preferred Tutor:<br></br>
                  <strong>{job?.t_gender}</strong>
                </div>
              </div>

              <div className="col-md-4 col-6">
                <div className="pb-2">
                  <FaCalendar /> Tutoring Days:<br></br>
                  <strong>{job?.t_days} </strong>
                </div>
              </div>

              <div className="col-md-4 col-6">
                <div className="pb-2">
                  <FaGraduationCap /> Subject: <br></br>
                  {job?.t_subject.split(",").map((subject) => (
                    <span
                      className="badge badge-success mr-1"
                      key={subject.trim()}
                    >
                      {subject.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="col-md-4 col-6">
                <div className="pb-2">
                  <FaMoneyBill /> Salary: <br></br>
                  <span className="card-text-price text-primary">
                    {job.t_salary >= 1
                      ? Number(job.t_salary).toLocaleString() + " Tk"
                      : "Negotiable"}
                  </span>
                  <span className="text-muted">/Month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-2-bottom d-flex">
            <p className="font-sm color-text-paragraph mt-2">
              Posted at: {moment(job.created_at).format("LL")}
            </p>

            <div className="ml-auto">
              {job.approval == 5 || job?.assigned?.length > 0 ? (
                <button className="btn btn-outline-danger" disabled>
                  Not Available
                </button>
              ) : (
                <Link href={`/tuition-list/view/${job.id}`}>
                  <div
                    className="btn btn-1 gradient_bg text-light"
                    style={{ fontSize: "15px" }}
                  >
                    View Details
                  </div>
                </Link>
              )}
            </div>
          </div>

          {job.s_phoneNumber && (
            <>
            <hr></hr>
            <div className="w-100 d-flex justify-content-center">
              <a
                href={`tel:${job.s_phoneNumber}`}
                className="btn btn-1 gradient_bg text-light text-center"
              >
                <FaPhone /> Call Guardian/Student
              </a>
            </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default JobCard;
