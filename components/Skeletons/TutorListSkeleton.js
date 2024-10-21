import React from "react";
import Skeleton from "react-loading-skeleton";

function TutorListSkeleton() {
  return (
    <>


        <div className="p-1 col-md-4">
        <div className="rand-tutor-card card-grid-2 hover-up text-center">
          <div className="text-center py-2">
            <Skeleton height={200} width={200}/>
          </div>
          <div className="card-block-info">
            <h5 className="text-ellipsis">
              <a href="job-details.html">
              <Skeleton height={20} width={180}/>
              </a>
            </h5>
            <div className="mt-5">
              <span className="university_ellipsis text-ellipsis">
                <Skeleton height={20} width={200}/>
              </span>
            </div>
            <h6 className="text-ellipsis"><Skeleton height={20} width={250} rows={2}/></h6>

            <div className="mt-30 text-center">
                <Skeleton height={20} width={160}/>
            </div>
            <div className="card-2-bottom mt-30">
              <div className="row">
                <Skeleton height={20}/>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default TutorListSkeleton;
