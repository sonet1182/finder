import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta/Meta";
import PrivateLayout from "../../Layouts/PrivateLayout";

import {
  FaAngleDown,
} from "react-icons/fa";
import publicApi from "../../services/publicApi";
import JobCard from "../../components/Job/JobCard";
import JobSkeleton from "../../components/Job/JobSkeleton";
import Pagination from "react-js-pagination";
import { appContext } from "../_app";

export default function JobBoard() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [pageLinks, setPageLinks] = useState([]);
  // const [value, setValue] = useState([]);

  const value = JSON.parse(localStorage.getItem("user_data"));

  const perPageHandler = (total) => {
    setPerPage(total);
    fetchJobsHandler(1, total, {
      district: value.teacher.district_id,
      area: "",
      medium: "",
      class: "",
      gender: "",
    });
  };

//With this function you can convert object to array
const convertObj = (obj) => {
  const arr = [];
  for (const key in obj) {
    arr.push({ [key]: obj[key] });
  }
  return arr;
};

  const fetchJobsHandler = async (pageNumber = 1, qty = perPage) => {
    setLoading(true);
    const response = await publicApi.get(
      `api/job-board/${qty}?page=${pageNumber}`
    );

    if (response.status === 200) {
      setJobs(response.data.data);
      setPageLinks(response.data.data.links);
      setLoading(false);
    } else {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    fetchJobsHandler(1, perPage);
  }, [perPage]);

  return (
    <>
      <Meta title="Profile-update | Khuje Now" />

      <div className="">
      <h3 className="mt-10 mb-10 page-title">Job Board</h3>

        <div className="content-page">
          <div className="box-filters-job">
            <div className="row">
              <div className="col-6">
                <span className="text-small text-showing">
                  Showing
                  <strong>
                    {jobs?.from}-{jobs?.to}
                  </strong>
                  of <strong>{jobs?.total} </strong>
                  jobs
                </span>
              </div>
              <div className="col-6 text-end">
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
              ? jobs?.data?.map((job, i) => <><div className="col-md-6 py-2"><JobCard key={i} job={job} /></div></>)
              : [...Array(10)].map((x, i) => <><div className="col-md-6"><JobSkeleton key={i} /></div></>)}
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

JobBoard.Layout = PrivateLayout;
