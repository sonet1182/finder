import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import altImg from "../../assets/images/user.webp";
import locationIcon from "../../assets/vector/location_map.svg";
import verefiedIcon from "../../assets/vector/store-verified-shopping-svgrepo-com (1).svg";

function TutorCard3({ tutor }) {
  const url = process.env.domain;

  const [src, setSrc] = useState(url + tutor.teacher_profile_picture);

  return (
    <div className="p-1">
      <div className="card-grid-2 mb-0 hover-up">
        <div className="py-4 row">
          <div className="box mx-auto link col-md-6">
            <Link href={`/tutor-details/${tutor.teacher_id}`} passHref>
              <a>
                <Image
                  className="mx-auto link"
                  src={src}
                  height={170}
                  width={170}
                  alt="photo"
                  onError={() => setSrc(altImg)}
                />
              </a>
            </Link>
          </div>

          <div className="col-md-6">
            <div className="sm-text-center">
              <h5 className="text-ellipsis">
                <Link href={`/tutor-details/${tutor.teacher_id}`} passHref>
                  <a>{tutor.teacher_name}</a>
                </Link>
                {tutor.verified == 1 ? (
                  <Image
                    className="pt-2"
                    alt="icon"
                    src={verefiedIcon}
                    height={30}
                    width={30}
                  />
                ) : (
                  ""
                )}
              </h5>
              <div className="mt-5">
                <span className="university_ellipsis text-ellipsis">
                  {tutor.honours_institute && tutor.honours_institute !== "null"
                    ? tutor.honours_institute
                    : tutor.teacher_university
                    ? tutor.teacher_university
                    : "Unknown"}
                </span>
              </div>
              <h6 className="text-ellipsis">
                {tutor.honours_subject && tutor.honours_subject !== "null"
                  ? tutor.honours_subject
                  : tutor.teacher_subject
                  ? tutor.teacher_subject
                  : "Unknown"}
              </h6>
              <div className="mt-5">
                <Link href={`/tutor-details/${tutor.teacher_id}`} passHref>
                  <a className="btn btn-1 gradient_bg text-light">View Details</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorCard3;
