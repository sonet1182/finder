import React from "react";

import SortingBox from "../Common/SortingBox";
import JobCard from "./JobCard";

function JobList({ jobs,searchContent, search, totalJobs, offset, jobsPerPage }) {
  // const jobsData = searchContent?.jobs?.length >0 ? searchContent : jobs;
  // console.log(search)
  return (
    <>
      <div className="content-page">
        <div className="box-filters-job">
          <div className="row">
            <div className="col-xl-6 col-lg-5">
              <span className="text-small text-showing">
                Showing
                <strong className="mx-1">
                  {offset + 1}-{offset + jobs?.jobs?.length}
                </strong>
                of <strong>{totalJobs} </strong>
                jobs
              </span>
            </div>
            <div className="col-xl-6 col-lg-7 text-lg-end mt-sm-15">
              <div className="display-flex2">
                <SortingBox />
              </div>
            </div>
          </div>
        </div>
        <div className="row display-list">
          <div className="col-xl-12 col-12">
            {
              search && searchContent?.jobs?.length < 1 ?
              "No jobs found"  
              : searchContent?.jobs?.length > 0 ?
              searchContent?.jobs?.map((job) => (
                <JobCard key={job.id} job={job} />
              )) 
              : 
              jobs?.jobs?.map((job) => (
                <JobCard key={job.id} job={job} />
              )) 
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default JobList;
