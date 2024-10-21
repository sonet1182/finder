import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import PrivateLayout from "../../../../../Layouts/StudentLayout";
import moment from "moment/moment";
import {
  FaCalendar,
  FaChild,
  FaClipboard,
  FaClock,
  FaElementor,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaSchool,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";
import publicApi from "../../../../../services/publicApi";
import Skeleton from "react-loading-skeleton";
import StarRatingComponent from "react-star-rating-component"; // Import the star rating component
import swal from "sweetalert";
import TutorCard3 from "../../../../../components/Tutor/TutorCard3";

export default function TuitionDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [tuition, setTuition] = useState([]);
  const [reviewData, setReviewData] = useState();
  const [confTutor, setConfTutor] = useState();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const fetchTutorData = async (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const response = await publicApi.get(`api/student/tuition_details/${id}`);

    if (response.status === 200) {
      setTuition(response.data.data);
      setReviewData(response.data.review_data);
      setConfTutor(response.data?.data?.confirmedtutor);
      setLoading(false);
    } else {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    fetchTutorData(id);
  }, [id]);

  const convertTimeFormat = (timeString) => {
    const formattedTime = moment(timeString, "HH:mm:ss").format("hh:mm A");
    return formattedTime;
  };

  const ApprovalBadge = ({ tuition }) => {
    if (tuition.confirmed) {
      return (
        <>
          <span className="badge badge-pill badge-success px-5 py-2">
            Confirmed
          </span>
        </>
      );
    } else if (tuition.assigned.length > 0) {
      return (
        <span className="badge badge-pill bg-midnight-bloom px-5 py-2">
          Assigned
        </span>
      );
    } else {
      if (tuition.approval === 0) {
        return (
          <span className="badge badge-pill bg-love-kiss px-5 py-2">
            Pending
          </span>
        );
      } else if (tuition.approval === 1) {
        return (
          <span className="badge badge-pill bg-arielle-smile px-5 py-2">
            Posted
          </span>
        );
      } else if (tuition.approval === 4) {
        return (
          <span className="badge badge-pill bg-plum-plate px-5 py-2">
            On Hold
          </span>
        );
      } else if (tuition.approval === 5) {
        return (
          <span className="badge badge-pill badge-dark px-5 py-2">Cancel</span>
        );
      }
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const data = {
      tuition_id: id,
      tutor_id: tuition.confirmed?.teacher_id,
      rating: rating,
      review: review,
    };

    const response = await publicApi.post(`api/student/tutor_review`, data);

    if (response.status === 200) {
      swal("Welcome", response.data.message, "success");
      setReviewData(response.data.review_data);
    } else {
      console.log("Server Error");
    }
  };

  return (
    <>
      <div className="app-main__outer">
        <div className="app-main__inner">
          <h3 className="mt-10 mb-10 page-title">Post Details</h3>

          {loading ? (
            <Skeleton height={270} />
          ) : (
            <section className="section-box mt-20">
              <div className="row d-flex">
                <div className="col-md-8">
                  <div className="card shadow py-4 px-5">
                    <div className="tuition-list">
                      <h4 className=""> {tuition?.s_fullName}</h4>

                      <h6>
                        <FaMapMarkerAlt className="text-danger" />
                        {tuition?.districts?.districtName}{" "}
                        {tuition?.districts && ","} {tuition?.s_area}
                      </h6>

                      <small className=" font-md">
                        <b>Job ID :</b> {tuition?.id} &nbsp; &nbsp;
                        <span className="m-line"></span> <b>Posted :</b>
                        {moment(tuition?.created_at).format("LL")}
                      </small>

                      <div className="job-details mt-3">
                        <div className="row">
                          <div className="col-md-4 col-6">
                            <div className="pb-3">
                              <FaSchool /> Medium:<br></br>
                              <strong> {tuition?.s_medium}</strong>
                            </div>
                          </div>
                          <div className="col-md-4 col-6">
                            <div className="pb-3">
                              <FaElementor /> Class: <br></br>
                              <strong> {tuition?.s_class}</strong>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="pb-3">
                              <FaClipboard /> Category:<br></br>
                              <strong>{tuition?.s_medium}</strong>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="pb-3">
                              <FaGraduationCap /> Subject: <br></br>
                              {tuition?.t_subject.split(",").map((subject) => (
                                <span
                                  className="badge badge-success mr-1"
                                  key={subject.trim()}
                                >
                                  {subject.trim()}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="col-md-4 col-6">
                            <div className="pb-3">
                              <FaSchool /> Institute :<br></br>
                              <strong>
                                {tuition?.s_college
                                  ? tuition?.s_college
                                  : "Not Specified"}
                              </strong>
                            </div>
                          </div>

                          <div className="col-md-4 col-6">
                            <div className="pb-3">
                              <FaUserGraduate /> Student Gender:<br></br>
                              <strong>{tuition?.s_gender}</strong>
                            </div>
                          </div>

                          <div className="col-md-4 col-6">
                            <div className="pb-3">
                              <FaUserTie /> Preferred Tutor:<br></br>
                              <strong>{tuition?.t_gender}</strong>
                            </div>
                          </div>

                          <div className="col-md-4 col-6">
                            <div className="pb-3">
                              <FaClock /> Tutoring Time:<br></br>
                              <strong>
                                {tuition?.time
                                  ? convertTimeFormat(tuition.time)
                                  : "Negotiable"}
                              </strong>
                            </div>
                          </div>

                          <div className="col-md-4 col-6">
                            <div className="pb-3">
                              <FaCalendar /> Tutoring Days:<br></br>
                              <strong>{tuition?.t_days} </strong>
                            </div>
                          </div>

                          <div className="col-md-4 col-6">
                            <div className="pb-3">
                              <FaChild /> No of Student:<br></br>
                              <strong>
                                {tuition?.s_number ? tuition?.s_number : "1"}
                              </strong>
                            </div>
                          </div>

                          <div className="col-md-4 col-6">
                            <FaMoneyBill /> Tuition Fee:<br></br>
                            <strong>
                              {tuition?.t_salary >= 1
                                ? tuition?.t_salary + " tk"
                                : "Negotiable"}
                            </strong>
                          </div>
                        </div>

                        {tuition?.ex_information && (
                          <div className="row" style={{ marginTop: "1rem" }}>
                            <div className="col-md-12">
                              Other Requirements:
                              <strong> {tuition?.ex_information}</strong>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card shadow">
                    <div className="py-3">
                      <h6 className="text-center">Current Status</h6>
                      <hr></hr>
                      <div className="text-center">
                        {tuition && ApprovalBadge({ tuition })}
                      </div>

                      {confTutor && (
                        <div className="px-4 py-2">
                          <TutorCard3 tutor={confTutor} />
                        </div>
                      )}
                    </div>
                  </div>

                  {confTutor && (
                    <div className="card shadow mt-3">
                      {reviewData ? (
                        <div className="py-3">
                          <h6 className="text-center">Your Review</h6>
                          <hr></hr>

                          <div className="px-3">
                            <div className="">
                              <label>Ratings</label>
                              <br />
                              <StarRatingComponent
                                name="rating"
                                starCount={5}
                                value={reviewData.rating}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="DetailsInformation">Review</label>
                              <textarea
                                rows="3"
                                name="review"
                                className="form-control"
                                value={reviewData.review}
                              ></textarea>
                            </div>

                            <div>
                              Review Posted:{" "}
                              {moment(reviewData.created_at).format("LL")}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-3">
                          <h6 className="text-center">Add Review</h6>
                          <hr></hr>

                          <form onSubmit={handleSubmitReview} className="px-3">
                            <div className="">
                              <label>Ratings</label>
                              <br />
                              <StarRatingComponent
                                name="rating"
                                starCount={5}
                                value={rating}
                                onStarClick={(nextValue) =>
                                  setRating(nextValue)
                                }
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="DetailsInformation">Review</label>
                              <textarea
                                rows="3"
                                name="review"
                                className="form-control"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                              ></textarea>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-1 bg-info text-light w-100"
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
TuitionDetails.Layout = PrivateLayout;
