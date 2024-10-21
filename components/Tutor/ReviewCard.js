import Image from "next/image";
import React from "react";
import { useState } from "react";
import altImg from "../../assets/images/user.webp";
import picon from "../../public/favicon.ico";
import StarRatingComponent from "react-star-rating-component";

function ReviewCard({ reviewData }) {
  const url = process.env.domain;

  const [src, setSrc] = useState(url + reviewData.student?.image);

  return (
    <>
      <div className="p-1 my-1">
        <div className="card hover-up">
          <div className="py-2 row">
            <div className="col-md-2 col-3">
              <div className="d-flex h-100">
                <div className="mx-auto my-auto">
                  {reviewData.student_id == 0 ? (
                    <Image
                      src={picon}
                      height={90}
                      width={90}
                      alt="photo"
                    />
                  ) : (
                    <Image
                      src={src}
                      height={90}
                      width={90}
                      alt="photo"
                      onError={() => setSrc(altImg)}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-10 col-9">
              <div>
                {reviewData.student_id == 0
                  ? "Tutor Sheba"
                  : reviewData.student?.name}
              </div>

              <StarRatingComponent
                name="rating"
                starCount={5}
                value={reviewData.rating}
              />

              <h6>{reviewData.review}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewCard;
