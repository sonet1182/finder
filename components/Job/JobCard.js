import React from "react";
import {
  FaDesktop,
  FaHome,
  FaMapMarkerAlt,
  FaNewspaper,
  FaPhone,
} from "react-icons/fa";
import moment from "moment/moment";
import Link from "next/link";

import {
  FaCalendar,
  FaElementor,
  FaGraduationCap,
  FaMoneyBill,
  FaSchool,
  FaUserTie,
} from "react-icons/fa";

function JobCard({ job }) {
  return (
    <>
      <div className="neomp my-2 card-grid-2 hover-up h-100">
        <div className="card-grid-2-image-left d-flex">
          <div className="right-info">
            <a className="name-job" href="">
              <FaMapMarkerAlt /> এরিয়া, উপজেলা, জেলা
            </a>
          </div>

          <span className="btn btn-grey-small ml-auto ">
            পোস্ট আইডি: 12365
          </span>
        </div>

        <div className="card-block-info">
          <Link href={`/found-post/view/12365`}>
            <h4 className="text-ellipsis" style={{ cursor: "pointer" }}>
              একটি পাসপোর্ট হারানো গিয়েছে
            </h4>
          </Link>

          <div className="mt-4 mb-3">
            <span className="publish">
              <FaNewspaper />{" "}
            </span>
          </div>

          <div className="job-details mt-3">
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-8 truncate-text">
                গত ৩০ জুলাই, ২০২৮ - দুপুর ১২ টার দিকে এয়ারপোর্ট থেকে ফেরাএ পথে
                সি,এন,জি থেকে নামার সময় আমিয়া ভুল বসত আমার হ্যান্ড ব্যাগ টা ফুলে
                ফেলে রেখে আসি। ব্যগ টি তে কিছু নগদ অর্থ সহ আমার পাস্পোর্ট টি
                হারিয়ে ফেলেছি। যদি কোন সহৃদয় বান ব্যাকিত ব্যাগটি পেয়ে থাকেন তবে
                অতিওদ্রুত যোগাযোগ করার জন্য অনুড়ধ করা হল
              </div>
            </div>
          </div>

          <div className="card-2-bottom d-flex">
            <p className="font-sm color-text-paragraph mt-2">
              পোস্টেড:
            </p>

            <div className="ml-auto">
              <Link href={`/found-post/view/12356`}>
                <div
                  className="btn btn-1 gradient_bg text-light"
                  style={{ fontSize: "15px" }}
                >
                  বিস্তারিত দেখুন
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobCard;
