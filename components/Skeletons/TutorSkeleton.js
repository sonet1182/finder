import React from "react";
import Skeleton from "react-loading-skeleton";

function TutorSkeleton() {
  return (
    <>
      <div className="p-1">
        <div className="rand-tutor-card card-grid-2 hover-up text-center">
          <div className="text-center py-2">
            <Skeleton height={170} width={170}/>
          </div>
          <div className="card-block-info">
              <Skeleton height={20} width={180}/>
            <div className="mt-5">
              <span className="university_ellipsis text-ellipsis">
                <Skeleton height={20} width={200}/>
              </span>
            </div>
            <h6 className="text-ellipsis"><Skeleton height={20} width={250} rows={2}/></h6>

            <div className="mt-2 text-center">
                <Skeleton height={20} width={160}/>
            </div>
                <Skeleton height={20}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default TutorSkeleton;
