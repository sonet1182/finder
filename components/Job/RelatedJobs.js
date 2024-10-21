import React from "react";
import RelatedJob from "./RelatedJob";

function RelatedJobs({ relJobs }) {
  console.log({ relJobs });
  return (
    <>
      <div className="sidebar-border">
        <h6 className="f-18">Related jobs</h6>
        <div className="sidebar-list-job">
          <ul>
            {relJobs &&
              relJobs.map((job) => <RelatedJob key={job.id} job={job} />)}
          </ul>
        </div>
      </div>
    </>
  );
}

export default RelatedJobs;
