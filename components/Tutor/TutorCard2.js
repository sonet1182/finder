import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import altImg from "../../assets/images/user.webp";
import locationIcon from "../../assets/vector/location_map.svg";
import verefiedIcon from "../../assets/vector/store-verified-shopping-svgrepo-com (1).svg";

function TutorCard2({ tutor }) {
  const url = process.env.domain;

  const [src, setSrc] = useState(url + tutor.teacher_profile_picture);

  return (
    <>
      <div className="p-1 col-md-4">
        <div className="rand-tutor-card card-grid-2 hover-up text-center">
          <div className="py-4">
            <div className="box mx-auto link ">
              <Link href={`/tutor-details/${tutor.teacher_id}`}>
                <Image
                  className="mx-auto link"
                  src={src}
                  height={175}
                  width={175}
                  alt="photo"
                  onError={() => setSrc(altImg)}
                />
              </Link>

              {tutor.home_approval == 1 && (
                <div className="ribbon ribbon-top-left">
                  <span>Premium</span>
                </div>
              )}
            </div>
          </div>
          <div className="card-block-info">
            <h5 className="text-ellipsis">
              <Link href={`/tutor-details/${tutor.teacher_id}`}>
                {tutor.name}
              </Link>
              {tutor.verified == 1 ? <Image className="pt-2" alt="icon" src={verefiedIcon} height="30" width="30"/> : ''}
            </h5>
            <div className="mt-5">
              <span className="university_ellipsis text-ellipsis">


              {tutor.honours_institute && tutor.honours_institute != "null" ?  tutor.honours_institute : tutor.teacher_university && tutor.teacher_university != "null"
                  ? tutor.teacher_university
                  : "Unknown"}

              </span>
            </div>
            <h6 className="text-ellipsis">

            {tutor.honours_subject && tutor.honours_subject != "null" ?  tutor.honours_subject : tutor.teacher_subject && tutor.teacher_subject != "null"
                  ? tutor.teacher_subject
                  : "Unknown"}
            </h6>

            <div className="mt-10">
              <a className="btn btn-grey-small mr-5">
                <span style={{ display: "flex", alignItems: "center" }}>
                  <Image src={locationIcon} height={20} width={20} alt="icon"/> &nbsp;
                  {tutor?.districts?.districtName}
                </span>
              </a>
            </div>

            <div className="card-2-bottom mt-10">
              <div className="row">
                <Link href={`/tutor-details/${tutor.teacher_id}`}>
                  <div className="btn btn-1 gradient_bg text-light">
                    View Details
                  </div>
                </Link>
                {/* <Link href={{ pathname: '/tutor-details', query: { id: tutor.teacher_id } }}>
                  <div className="btn btn-1 gradient_bg text-light">
                    View Details
                  </div>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TutorCard2;
