import React from "react";
import JobCard from "./JobCard";

function JobTab({ id, active, jobs}) {
  return (
    <>
      <div
        className={`tab-pane fade show ${active ? "active" : ""}`}
        id={id}
        role="tabpanel"
        aria-labelledby={id}
      >
        <div className="row">
            <JobCard jobs={jobs}  />
        </div>
      </div>
    </>
  );
}

export default JobTab;
