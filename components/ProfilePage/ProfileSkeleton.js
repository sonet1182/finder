import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function ProfileSkeleton() {
  return (
    <>
      <main className="name">
        <section className="section-box mt-20">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">
                <Skeleton height={650} />
              </div>
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-8">
                    <Skeleton height={130} />
                  </div>
                  <div className="col-md-4">
                    <Skeleton height={130} />
                  </div>
                  <div className="col-md-4 mt-4">
                    <Skeleton height={160} />
                  </div>
                  <div className="col-md-4 mt-4">
                    <Skeleton height={160} />
                  </div>
                  <div className="col-md-4 mt-4">
                    <Skeleton height={160} />
                  </div>
                </div>

                <div className="row py-5">
                  <Skeleton height={60} />
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <Skeleton height={160} />
                  </div>
                  <div className="col-md-3">
                    <Skeleton height={160} />
                  </div>
                  <div className="col-md-3">
                    <Skeleton height={160} />
                  </div>
                  <div className="col-md-3">
                    <Skeleton height={160} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ProfileSkeleton;
