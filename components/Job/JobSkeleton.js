import React from "react";
import Skeleton from "react-loading-skeleton";

function JobSkeleton({job}) {
  return (
    <>
      <div className="col-xl-12 col-12">
        <Skeleton height={270}/>
      </div>
    </>
  );
}

export default JobSkeleton;
