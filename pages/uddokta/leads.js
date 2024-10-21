import React, { useEffect, useState } from "react";
import ShebaUddoktaLayout from "./ShebaUddoktaLayout";
import moment from "moment/moment";
import Link from "next/link";
import {
  FaCalendar,
  FaMapMarkerAlt,
  FaMobile,
  FaMoneyBillAlt,
  FaNewspaper,
  FaPlus,
} from "react-icons/fa";
import JobSkeleton from "../../components/Job/JobSkeleton";
import axios from "axios";
import Pagination from "react-js-pagination";

function Leads() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [pageLinks, setPageLinks] = useState([]);

  const perPageHandler = (total) => {
    setPerPage(total);
    fetchJobsHandler(1, total);
  };

  const fetchJobsHandler = async (pageNumber = 1, qty = perPage) => {
    setLoading(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    axios
      .get(`api/partner/lead_list/${qty}?page=${pageNumber}`)
      .then((response) => {
        if (response.status === 200) {
          setJobs(response.data.data);
          setPageLinks(response?.data?.data?.links);
          setLoading(false);
        } else {
          console.log("Server Error");
        }
      });
  };

  useEffect(() => {
    fetchJobsHandler(1, perPage);
  }, []);

  return (
    <>
      <h5 className="mt-10 mb-10 page-title">Leads List</h5>
      <div className="row">
        <div className="col-md-12">
          <Link href="/uddokta/generate_lead">
            <button
              type="button"
              className="btn btn-outline-success w-100 neomp mb-4"
            >
              <FaPlus /> Add New Lead
            </button>
          </Link>
        </div>

        <div className="display-list">
          {!loading
            ? jobs?.data?.map((job, i) => (
                <>
                  <div className="neomp my-2 card-grid-2 hover-up">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="card-grid-2-image-left">
                          <div className="right-info">
                            <a className="name-job" href="">
                              <FaCalendar />{" "}
                              {moment(job.created_at).format("LL")}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                        <div className="pl-15 mb-15 mt-30">
                          <span className="publish">Id: {job.id}</span>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="card-block-info">
                      <Link href={`tuition-list/view/123`}>
                        <h4>
                          <small className="text-small">Name: </small>
                          {job.s_fullName}
                        </h4>
                      </Link>

                      <hr></hr>

                      <div className="row py-2">
                        <div className="col-md-3 col-sm-6 col-xs-6 py-2">
                          <b className="">
                            <FaMapMarkerAlt /> Address :
                          </b>{" "}
                          <br></br>
                          <span className="t-value">
                            {job.s_area}, &nbsp;
                            {job.districts?.districtName}
                          </span>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-6 py-2">
                          <b className="">
                            <FaMobile /> Phone :
                          </b>{" "}
                          <br></br>
                          <span className="t-value">{job.s_phoneNumber}</span>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-6 py-2">
                          <b className="">
                            <FaMoneyBillAlt /> Salary:{" "}
                          </b>{" "}
                          <br></br>
                          <span className="card-text-price text-primary">
                            {job.t_salary}
                          </span>
                          <span className="text-muted">/Month</span>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-6 py-2">
                          <b className="">
                            <FaMoneyBillAlt /> Type:{" "}
                          </b>{" "}
                          <br></br>
                          {job.lead_type == 0 ? "Self" : "Referrel"} Lead
                        </div>
                      </div>

                      <div className="row">
                        <p className="font-sm color-text-paragraph mt-10 col-6">
                          <b className="">
                            <FaNewspaper /> Job Status:
                          </b>

                          {job.confirmed ? (
                            <button className="btn btn-sm btn-success">
                              confirmed
                            </button>
                          ) : job.assigned.length > 0 ? (
                            <button className="btn btn-sm btn-danger">
                              Assigned
                            </button>
                          ) : job.approval == 0 ? (
                            <button className="btn btn-sm btn-danger">
                              Pending
                            </button>
                          ) : job.approval == 1 ? (
                            <button className="btn btn-sm btn-danger">
                              Published
                            </button>
                          ) : job.approval == 4 ? (
                            <button className="btn btn-sm btn-warning">
                              Hold
                            </button>
                          ) : job.approval == 5 ? (
                            <button className="btn btn-sm btn-danger">
                              Cancelled
                            </button>
                          ) : job.approval == 3 ? (
                            <button className="btn btn-sm btn-dark">
                              Rejected
                            </button>
                          ) : (
                            ""
                          )}
                        </p>

                        <p className="font-sm color-text-paragraph mt-10 col-6">
                          <b className="">
                            <FaNewspaper /> Payment Status :
                          </b>

                          {job.txn ? (
                            <button className="btn btn-success btn-sm">
                              Paid
                            </button>
                          ) : (
                            <button className="btn btn-danger btn-sm">
                              Pending
                            </button>
                          )}
                        </p>
                      </div>

                      <div className="card-2-bottom mt-20">
                        <p className="font-sm color-text-paragraph mt-10">
                          <b className="text-primary">NB :</b>

                          {job.txn ? (
                            <span className="text-purple">
                              Your payment has been paid in{" "}
                              {moment(job.txn.created_at).format("LL")} to{" "}
                              {job.txn.acc_number} ({job.txn.bank_type})
                            </span>
                          ) : job.confirmed ? (
                            <span className="text-purple">
                              Congratulations! Your leads has been confirmed!
                            </span>
                          ) : job.assigned.length > 0 ? (
                            <span className="text-purple">
                              A teacher has been assigned to your job, Please,
                              wait for confirmation.
                            </span>
                          ) : job.approval == 0 ? (
                            <span className="text-purple">
                              Requiremets have not been successfully taken. Well
                              verify your lead to confirm.
                            </span>
                          ) : job.approval == 1 ? (
                            <span className="text-purple">
                              Your job has been approved and published to our
                              site.
                            </span>
                          ) : job.approval == 4 ? (
                            <span className="text-purple">
                              For some reasons your job has been hold. Please
                              wait for next informations.
                            </span>
                          ) : job.approval == 5 ? (
                            <span className="text-purple">
                              Unfortunatelay your job has been cancelled.
                            </span>
                          ) : job.approval == 3 ? (
                            <span className="text-purple">
                              Unfortunatelay your job has been rejected.
                            </span>
                          ) : (
                            ""
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ))
            : [...Array(10)].map((x, i) => (
                <>
                  <JobSkeleton key={i} />
                </>
              ))}
        </div>

        <div className="paginations d-flex">
          <div className="d-flex mx-auto neomp">
            <Pagination
              activePage={jobs?.current_page ? jobs?.current_page : 0}
              itemsCountPerPage={jobs?.per_page ? jobs?.per_page : 0}
              totalItemsCount={jobs?.total ? jobs?.total : 0}
              onChange={(pageNumber) => {
                fetchJobsHandler(pageNumber, perPage);
              }}
              pageRangeDisplayed={8}
              itemclassName="page-item"
              linkclassName="page-link"
              firstPageText="First"
              lastPageText="Last"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Leads;

Leads.Layout = ShebaUddoktaLayout;
