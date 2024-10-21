import Link from "next/link";
import React from "react";
import Meta from "../../../components/Meta/Meta";
import PrivateLayout from "../../../Layouts/PrivateLayout";


export default function PaymentSection() {
  return (
    <>
      <Meta title="Payment Section | Tutor Sheba" />

      <div className="">
        <h3 className="mt-10 mb-10 page-title">Payment Section</h3>

        <div className="col-xl-12 col-md-12 my-4">
          <span className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <h4 className="font-weight-bold text-info text-uppercase mb-1">
                    Tuition Matching Payment
                  </h4>
                  <div className="no-gutters align-items-center">
                    After finalizing a job to a tutor we ask for (60%-Home
                    Tutoring; 50%-Online Tutoring) advance of his/her first
                    months payment only once for each tuition job.
                  </div>
                </div>
                <div className="col-auto">
                  <Link href="/profile/payments/tuition_matching">
                    <button type="button" className="btn btn-outline-info">
                      Click Here
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </span>
        </div>

        {/* <div className="col-xl-12 col-md-12 my-4">
          <a className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <h4 className="font-weight-bold text-info text-uppercase mb-1">
                    Profile Verification Payment
                  </h4>
                  <div className="no-gutters align-items-center">
                    You need to pay a one-time verification charge for the
                    profile verification process.
                  </div>
                </div>
                <div className="col-auto">
                  <Link href="/profile/payments/tuition_matching">
                    <button type="button" className="btn btn-outline-info">
                      Click Here
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div className="col-xl-12 col-md-12 my-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <h4 className="font-weight-bold text-info text-uppercase mb-1">
                    Refund Option
                  </h4>
                  <div className="row no-gutters align-items-center"></div>
                </div>
                <div className="col-auto">
                  <a type="button" className="btn btn-outline-info">
                    Click Here
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}


      </div>
    </>
  );
}

PaymentSection.Layout = PrivateLayout;
