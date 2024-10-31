import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Meta from "../../components/Meta/Meta";
import publicApi from "../../services/publicApi";
import MasterLayout from "../../Layouts/MasterLayout";
import altImg from "../../assets/images/user.webp";
import Image from "next/image";
import moment from "moment/moment";
import TutorDetailsSkeleton from "../../components/Skeletons/TutorDetailsSkeleton";
import ctnIcon from "../../assets/vector/agenda-phone-number-svgrepo-com.svg";
import { Modal, ProgressBar } from "react-bootstrap";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ReviewCard from "../../components/Tutor/ReviewCard";
// import StarRatingComponent from "react-star-rating-component";
import { FaStar, FaStarHalfAlt, FaStarO } from "react-icons/fa";
import RatingComponent from "../../components/Tutor/RatingComponent";

function TutorDetails(req) {
  const router = useRouter();
  const { id } = router.query;

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitloading, setSubmitLoading] = useState(false);
  const [tutor, setTutor] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  const [avgRating, setAvgRating] = useState();
  const [ratingCount, setRatingCount] = useState();

  const url = process.env.domain;
  const [src, setSrc] = useState("");

  const [dataInput, setDataInput] = useState({
    name: "",
    phone: "",
    details: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setDataInput({
      ...dataInput,
      [e.target.name]: e.target.value,
      error_list: [],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setSubmitLoading(true);

    const data = {
      tutor_id: id,
      request_name: dataInput.name,
      request_phoneNumber: dataInput.phone,
      request_info: dataInput.details,
    };

    const response = await publicApi.post(
      `api/student_to_teacher_request`,
      data
    );

    if (response.status === 200) {
      setSubmitLoading(false);
      setDataInput({
        name: "",
        phone: "",
        details: "",
        error_list: [],
      });

      swal("Welcome", response.data.message, "success");
    } else {
      console.log("Server Error");
    }
  };

  const fetchTutorData = async (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const response = await publicApi.get(`api/tutor_details/${id}`);
    if (response.status === 200) {
      setTutor(response.data.data);
      setSrc(url + response.data.data?.teacher_profile_picture);
      setReviewData(response.data.review_data);
      setAvgRating(response.data.averageRating);
      setRatingCount(response.data.ratingsCount);

      setLoading(true);
    } else {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    fetchTutorData(id);
  }, [id]);

  const contactForm = (
    <>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter your full name"
            onChange={handleInput}
            value={dataInput.name}
          />
        </div>

        <div className="form-group">
          <label htmlFor="PhoneNo">Phone Number</label>
          <input
            type="number"
            name="phone"
            className="form-control"
            id="PhoneNo"
            placeholder="Phone Number"
            onChange={handleInput}
            value={dataInput.phone}
          />
        </div>
        <div className="form-group">
          <label htmlFor="DetailsInformation">Details Information</label>
          <textarea
            rows="3"
            name="details"
            className="form-control"
            id="DetailsInformation"
            onChange={handleInput}
            value={dataInput.details}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-1 bg-info text-light w-100">
          Submit
        </button>
      </form>
    </>
  );

  const [activeTab, setActiveTab] = useState("Tuition Info");

  const renderContent = () => {
    switch (activeTab) {
      case "Tuition Info":
        return (
          <div>
            <table className="table tuition-info-text">
              <tbody>
                <tr>
                  <td className="col-4">Expected Minimum Salary</td>
                  <td className="col-8">{tutor.tuition_salary}</td>
                </tr>
                <tr>
                  <td className="col-4">Current Status for Tuition</td>
                  <td className="col-8">
                    <span className="green-text">Available</span>
                  </td>
                </tr>
                <tr>
                  <td className="col-4">Days Per Week</td>
                  <td className="col-8">{tutor.tuition_days}</td>
                </tr>
                <tr>
                  <td className="col-4">Preferred Tuition Style</td>
                  <td className="col-8">{tutor.tuition_style}</td>
                </tr>
                <tr>
                  <td className="col-4">Tuitoring Experience</td>
                  <td className="col-8">{tutor.tuition_experience} Years</td>
                </tr>
                <tr>
                  <td className="col-4">Place of Learning</td>
                  <td className="col-8">Home Visit</td>
                </tr>
                <tr>
                  <td className="col-4">Extra Facilities</td>
                  <td className="col-8">Phone help</td>
                </tr>
                <tr>
                  <td className="col-4">Preferred Medium of Instruction</td>
                  <td className="col-8">{tutor.tuition_medium}</td>
                </tr>
                <tr>
                  <td className="col-4">Preferred Class</td>
                  <td className="col-8">{tutor.tuition_class}</td>
                </tr>
                <tr>
                  <td className="col-4">Preferred Subjects</td>
                  <td className="col-8">{tutor.tuition_subject}</td>
                </tr>
                <tr>
                  <td className="col-4">Preferred Time</td>
                  <td className="col-8">{tutor.tuition_shift}</td>
                </tr>
                <tr>
                  <td className="col-4">Preferred Area to Teach</td>
                  <td className="col-8">
                    {tutor.districts?.districtName},<br />
                    {tutor.tuition_area}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "Educational Qualification":
        return (
          <div>
            <table className="table table-bordered mb-hide mt-20">
              <thead className="thead-custom">
                <tr>
                  <th>Exam Name</th>
                  <th>Year</th>
                  <th>Institute</th>
                  <th>Group/Subject</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> SSC / O-level / Dakhil</td>
                  <td>{tutor.ssc_year}</td>

                  <td>{tutor.ssc_institute}</td>
                  <td>{tutor.ssc_group} </td>
                  <td>{tutor.ssc_gpa}</td>
                </tr>

                <tr>
                  <td>HSC / A level / Alim</td>
                  <td>{tutor.hsc_year}</td>

                  <td>{tutor.hsc_institute}</td>
                  <td>{tutor.hsc_group} </td>
                  <td>{tutor.hsc_gpa}</td>
                </tr>

                <tr>
                  <td>Graduation / Bachelor / Diploma</td>
                  <td>{tutor.honours_year}</td>
                  <td>{tutor.honours_institute}</td>
                  <td>{tutor.honours_subject} </td>
                  <td>{tutor.honours_gpa}</td>
                </tr>
              </tbody>
            </table>

            <table className="table table-bordered pc-hide mb-3">
              <tbody className="mt-5">
                <tr>
                  <th className="thead-custom">Exam Name</th>
                  <td>SSC</td>
                </tr>

                <tr>
                  <th className="thead-custom">Year</th>
                  <td>{tutor.ssc_year}</td>
                </tr>

                <tr>
                  <th className="thead-custom">Institute</th>
                  <td>{tutor.ssc_institute}</td>
                </tr>

                <tr>
                  <th className="thead-custom">Group/Subject</th>
                  <td>{tutor.ssc_group} </td>
                </tr>

                <tr>
                  <th className="thead-custom">GPA</th>
                  <td>{tutor.ssc_gpa} </td>
                </tr>
              </tbody>
            </table>

            <table className="table table-bordered pc-hide mb-3">
              <tbody className="mt-5">
                <tr>
                  <th className="thead-custom">Exam Name</th>
                  <td>HSC</td>
                </tr>

                <tr>
                  <th className="thead-custom">Year</th>
                  <td>{tutor.hsc_year}</td>
                </tr>

                <tr>
                  <th className="thead-custom">Institute</th>
                  <td>{tutor.hsc_institute}</td>
                </tr>

                <tr>
                  <th className="thead-custom">Group/Subject</th>
                  <td>{tutor.hsc_group} </td>
                </tr>

                <tr>
                  <th className="thead-custom">GPA</th>
                  <td>{tutor.hsc_gpa} </td>
                </tr>
              </tbody>
            </table>

            <table className="table table-bordered pc-hide">
              <tbody className="mt-5">
                <tr>
                  <th className="thead-custom">Exam Name</th>
                  <td>Honours</td>
                </tr>

                <tr>
                  <th className="thead-custom">Year</th>
                  <td>{tutor.honours_year}</td>
                </tr>

                <tr>
                  <th className="thead-custom">Institute</th>
                  <td>{tutor.honours_institute}</td>
                </tr>

                <tr>
                  <th className="thead-custom">Group/Subject</th>
                  <td>{tutor.honours_group} </td>
                </tr>

                <tr>
                  <th className="thead-custom">GPA</th>
                  <td>{tutor.honours_gpa} </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "Ratings & Reviews":
        return (
          <div>
            <h4 className="py-3 bg-light px-2">Ratings & Reviews</h4>

            <div className="row py-3">
              <div className="col-md-6">
                <div className="d-flex h-100">
                  <div className="mx-auto my-auto text-center">
                    <h6>Student Reviews</h6>
                    <div>
                      {/* <StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={Math.round(avgRating ?? 0)}
                      /> */}
                    </div>
                    {avgRating ?? '0'} Out of 5<p>({reviewData ? reviewData.length : '0'} Ratings)</p>
                  </div>
                </div>
              </div>

              {console.log('object', ratingCount)}

              <RatingComponent ratingCount={ratingCount} />;
{/* 
              <div className="col-md-6">
                <div
                  className="d-flex item-center py-1"
                  style={{ fontWeight: "600" }}
                >
                  5 star &nbsp;{" "}
                  <ProgressBar
                    variant="warning"
                    now={84}
                    style={{ width: "70%", height: "10px" }}
                  />{" "}
                  &nbsp; 84%
                </div>
                <div
                  className="d-flex item-center py-1"
                  style={{ fontWeight: "600" }}
                >
                  4 star &nbsp;{" "}
                  <ProgressBar
                    variant="warning"
                    now={9}
                    style={{ width: "70%", height: "10px" }}
                  />{" "}
                  &nbsp; 9%
                </div>
                <div
                  className="d-flex item-center py-1"
                  style={{ fontWeight: "600" }}
                >
                  3 star &nbsp;{" "}
                  <ProgressBar
                    variant="warning"
                    now={4}
                    style={{ width: "70%", height: "10px" }}
                  />{" "}
                  &nbsp; 4%
                </div>
                <div
                  className="d-flex item-center py-1"
                  style={{ fontWeight: "600" }}
                >
                  2 star &nbsp;{" "}
                  <ProgressBar
                    variant="warning"
                    now={2}
                    style={{ width: "70%", height: "10px" }}
                  />{" "}
                  &nbsp; 2%
                </div>
                <div
                  className="d-flex item-center py-1"
                  style={{ fontWeight: "600" }}
                >
                  1 star &nbsp;{" "}
                  <ProgressBar
                    variant="warning"
                    now={1}
                    style={{ width: "70%", height: "10px" }}
                  />{" "}
                  &nbsp; 1%
                </div>
              </div> */}


            </div>

            <h4 className="py-3 bg-light px-2"></h4>

            <div>
              {reviewData?.map((rev, i) => (
                <>
                  <ReviewCard key={i} reviewData={rev} />
                </>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Meta title={`Tutor Details | Khuje Now`} />

          <div className="row mt-30">
            <div className="col-md-3">
              <div className="card shadow ml-lg-3 mr-lg-1 tutor-details-card">
                <div className="card-body py-3">
                  <div className="text-center">
                    <Image
                      className="mx-auto round-image"
                      src={src}
                      height={200}
                      width={200}
                      alt="photo"
                      onError={() => setSrc(altImg)}
                    />
                    <h5>{tutor?.name}</h5>
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "gold" }}
                    />{" "}
                    {avgRating ?? '0'} ({reviewData ? reviewData.length : ''} Review)
                    <p className="">
                      Total views: <strong>{tutor?.views}</strong>
                    </p>
                  </div>

                  <div className="px-3 mt-2">
                    <div className="row">
                      <div className="col-4">Location:</div>
                      <div className="col-8">
                        {tutor.owndistricts?.districtName}(
                        {tutor.teacher_present_address})
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">ID#:</div>
                      <div className="col-8">
                        <h6>{tutor.teacher_id}</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">Gender:</div>
                      <div className="col-7">
                        <h6>{tutor.teacher_gender}</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">Qualification:</div>
                      <div className="col-8">
                        <h6>
                          {tutor.honours_study_type &&
                          tutor.honours_study_type != "null"
                            ? tutor.studytype?.name
                            : tutor.teacher_degree}
                        </h6>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">Area Covered:</div>
                      <div className="col-8">
                        {tutor.districts?.districtName}({tutor.tuition_area})
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer text-center">
                  <small className="ml-4">
                    <i className="fa fa-clock-o"></i> Member Since:
                    {moment(tutor?.created_at).format("LL")}
                  </small>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow mx-1 tutor-details-card mt-xs-5">
                <div className="card-body py-3">
                  <div className="tabs-container">
                    {[
                      "Tuition Info",
                      "Educational Qualification",
                      "Ratings & Reviews",
                    ].map((tab) => (
                      <div
                        key={tab}
                        className={`${
                          activeTab == tab ? "tab_active" : ""
                        } tabs text-secondary`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </div>
                    ))}
                  </div>

                  <div className="tab-content">{renderContent()}</div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow ml-lg-1 mr-lg-3 tutor-details-card mt-xs-5">
                <div className="card-body py-3">
                  <h5>Contact with this tutor</h5>
                  <hr></hr>
                  {contactForm}
                </div>
              </div>
            </div>
          </div>

          <section className="section-box">
            <div className="ct-btn" onClick={() => setShow(true)}>
              <Image src={ctnIcon} height={30} width={30} alt="" />{" "}
            </div>
          </section>

          <Modal
            show={show}
            onHide={() => setShow(false)}
            keyboard="false"
            centered
          >
            <Modal.Body>
              <div className="sidebar-border">
                <h6 className="f-18 text-center">Contact with This tutor</h6>
                <div className="sidebar-list-job">{contactForm}</div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <TutorDetailsSkeleton />
      )}
    </>
  );
}

TutorDetails.Layout = MasterLayout;

export default TutorDetails;
