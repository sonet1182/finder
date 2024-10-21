import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta/Meta";
import PrivateLayout from "../../Layouts/PrivateLayout";

import { FaAngleDown } from "react-icons/fa";
import publicApi from "../../services/publicApi";
import JobCard from "../../components/Job/JobCard";
import JobSkeleton from "../../components/Job/JobSkeleton";
import Pagination from "react-js-pagination";
import axios from "axios";

export default function ConfirmedJobs() {
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

    axios.get("/sanctum/csrf-cookie").then((res) => {
      axios
        .get(`api/tutor/confirmed_tuition_list/${qty}?page=${pageNumber}`)
        .then((response) => {
          if (response.status === 200) {
            setJobs(response.data.data);
            setPageLinks(response?.data?.data?.links);
            setLoading(false);
          } else {
            console.log("Server Error");
          }
        });
    });
  };

  useEffect(() => {
    fetchJobsHandler(1, perPage);
  }, []);

  return (
    <>
      <Meta title="Profile-update | Tutor Sheba" />

      <div className="">
        <div className="bg-info mt-3 py-2 pl-2">
          <h5 className="text-title text-white px-4">Your Confirmed Jobs</h5>
        </div>

        <div className="content-page">
          <div className="box-filters-job">
            <div className="row">
              <div className="col-xl-6 col-lg-5 col-6 mt-sm-15">
                <span className="text-small text-showing">
                  Showing
                  <strong>
                    {jobs?.from}-{jobs?.to}
                  </strong>
                  of <strong>{jobs?.total} </strong>
                  jobs
                </span>
              </div>
              <div className="col-xl-6 col-lg-7 col-6 text-end mt-sm-15">
                <div className="display-flex2">
                  <div className="box-border mr-10">
                    <span className="text-sortby">Show:</span>
                    <div className="dropdown dropdown-sort">
                      <button
                        className="btn dropdown-toggle"
                        id="dropdownSort"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-bs-display="static"
                      >
                        <span>{perPage}</span>
                        <FaAngleDown />
                      </button>
                      <ul
                        className="dropdown-menu dropdown-menu-light"
                        aria-labelledby="dropdownSort"
                      >
                        <li onClick={() => perPageHandler(5)}>
                          <a
                            className={`dropdown-item ${
                              perPage == 5 && "active"
                            }`}
                            href="#"
                          >
                            5
                          </a>
                        </li>
                        <li onClick={() => perPageHandler(10)}>
                          <a
                            className={`dropdown-item ${
                              perPage == 10 && "active"
                            }`}
                            href="#"
                          >
                            10
                          </a>
                        </li>
                        <li onClick={() => perPageHandler(15)}>
                          <a
                            className={`dropdown-item ${
                              perPage == 15 && "active"
                            }`}
                            href="#"
                          >
                            15
                          </a>
                        </li>
                        <li onClick={() => perPageHandler(20)}>
                          <a
                            className={`dropdown-item ${
                              perPage == 20 && "active"
                            }`}
                            href="#"
                          >
                            20
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row display-list">
            {!loading
              ? jobs?.data?.map((job, i) => <JobCard key={i} job={job} />)
              : [...Array(10)].map((x, i) => <JobSkeleton key={i} />)}
          </div>
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

ConfirmedJobs.Layout = PrivateLayout;
