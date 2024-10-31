import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Meta from "../../../components/Meta/Meta";
import publicApi from "../../../services/publicApi";
import MasterLayout from "../../../Layouts/MasterLayout";

import moment from "moment/moment";
import {
  FaArrowRight,
  FaCalendar,
  FaElementor,
  FaGraduationCap,
  FaLocationArrow,
  FaMapMarked,
  FaMapMarker,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaPaperPlane,
  FaSchool,
  FaSearch,
  FaSeedling,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";
import Link from "next/link";
import { getToken } from "../../../services/auth/token";
import axios from "axios";
import { toast } from "react-toastify";
import TuitionDetailsSkeleton from "../../../components/Skeletons/TuitionDetailsSkeleton";

function TuitionDetails(req) {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [tuition, setTuition] = useState([]);
  const [appAble, setAppAble] = useState(false);
  const [accProgress, setAccProgress] = useState(null);
  const [applied, setApplied] = useState(null);

  const url = process.env.domain;
  const [src, setSrc] = useState("");

  const fetchTutorData = async (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const response = await publicApi.get(`api/tuition_details/${id}`);

    if (response.status === 200) {
      setTuition(response.data.data);
      setAccProgress(response.data.acc_progress);
      setApplied(response.data.tuition_request);
      setLoading(true);
    } else {
      console.log("Server Error");
    }
  };

  const tuitionApply = async (e) => {
    const data = {
      student_id: tuition?.id,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("api/tutor/tuition_apply", data).then((res) => {
        if (res.status === 200) {
          if (res.data.status == "success") {
            setAppAble(3);
            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 6000,
              closeOnClick: true,
            });
          } else if (res.data.status == "sorry") {
            toast.error(res.data.message, {
              position: "top-right",
              autoClose: 6000,
              closeOnClick: true,
            });
          } else if (res.data.status == "already") {
            toast.info(res.data.message, {
              position: "top-right",
              autoClose: 6000,
              closeOnClick: true,
            });
          }
        } else {
          toast.error("Server Problem !", {
            position: "top-right",
            autoClose: 6000,
            closeOnClick: true,
          });
        }
      });
    });
  };

  useEffect(() => {
    fetchTutorData(id);
    if (accProgress != null) {
      if (accProgress >= 80) {
        if (applied) {
          setAppAble(3);
        } else {
          setAppAble(2);
        }
      } else {
        setAppAble(1);
      }
    } else {
      setAppAble(0);
    }
  }, [id, accProgress]);

  const applyBtn = (
    <>
      {appAble == 0 ? (
        <Link href="/auth/login">
          <button type="submit" className="btn btn-outline-primary mb-2 w-100">
            <FaPaperPlane /> Login then apply this job
          </button>
        </Link>
      ) : appAble == 1 ? (
        <>
          <h6 className="text-danger text-center">
            Account Progress 80% is Required!
          </h6>

          <Link href={"/profile/update"}>
            <button className="btn btn-outline-info mb-2 w-100">
              Upgrade Account
            </button>
          </Link>
        </>
      ) : appAble == 2 ? (
        <div className="w-100 text-center">
          <a
            onClick={tuitionApply}
            className="animated-button1 text-light link"
            style={{ padding: "5px 30px" }}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Apply Now
          </a>
        </div>
      ) : appAble == 3 ? (
        <button className="btn btn-outline-success mb-2 w-100" disabled>
          Already Applied
        </button>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <>
      {loading ? (
        <>
          <Meta title={`Tutor Details | Khuje Now`} />
          <section className="section-box mt-20">
            <div className="container">
              <div className="row d-flex">
                <div className="col-md-9 mx-auto">
                  <div className="box-border-single">
                    <div className="container">
                      <div className="tuition-list">
                        <div className="">
                          <h2 className="text-center"> {tuition?.title}</h2>
                          <p className="text-center font-md">
                            <b>Job ID :</b> {tuition?.id} &nbsp; &nbsp;
                            <span className="m-line"></span>{" "}
                            <b>Posted at :</b>
                            {moment(tuition?.created_at).format("LL")}
                          </p>

                          <h4 className="text-center py-3">
                            <FaMapMarkerAlt className="text-danger" />
                          </h4>

                          <h4 className="text-center">
                            {tuition?.districts?.districtName}{" "}
                            {tuition?.districts && ","} {tuition?.s_area}
                          </h4>

                          <div className="job-details mt-3">
                            <div className="row">
                              <div className="col-md-4 col-6">
                                <div className="pb-2">
                                  <FaSchool /> Medium:<br></br>
                                  <strong> {tuition?.s_medium}</strong>
                                </div>
                              </div>
                              <div className="col-md-4 col-6">
                                <div className="pb-2">
                                  <FaElementor /> Class: <br></br>
                                  <strong> {tuition?.s_class}</strong>
                                </div>
                              </div>

                              <div className="col-md-4 col-6">
                                <div className="pb-2">
                                  <FaUserGraduate /> Student Gender:<br></br>
                                  <strong>{tuition?.s_gender}</strong>
                                </div>
                              </div>

                              <div className="col-md-4 col-6">
                                <div className="pb-2">
                                  <FaUserTie /> Preferred Tutor:<br></br>
                                  <strong>{tuition?.t_gender}</strong>
                                </div>
                              </div>

                              <div className="col-md-4 col-6">
                                <div className="pb-2">
                                  <FaCalendar /> Tutoring Days:<br></br>
                                  <strong>{tuition?.t_days} </strong>
                                </div>
                              </div>

                              <div className="col-md-4 col-6">
                                <div className="pb-2">
                                  <FaCalendar /> Tutoring Time:<br></br>
                                  <strong>
                                    {tuition?.time
                                      ? tuition.time
                                      : "Negotiable"}
                                  </strong>
                                </div>
                              </div>

                              {tuition?.time_duration &&
                                <div className="col-md-4 col-6">
                                <div className="pb-2">
                                  <FaCalendar /> Tutoring Duration:<br></br>
                                  <strong>
                                    {tuition?.time_duration}
                                  </strong>
                                </div>
                              </div>
                              }

                              

                              <div className="col-md-4 col-6">
                                <div className="pb-2">
                                  <FaCalendar /> No of Student:<br></br>
                                  <strong>
                                    {tuition?.s_number
                                      ? tuition?.s_number
                                      : "1"}
                                  </strong>
                                </div>
                              </div>

                              <div className="col-md-4 col-6">
                                <div className="pb-2">
                                  <FaGraduationCap /> Subject: <br></br>
                                  {tuition?.t_subject
                                    .split(",")
                                    .map((subject) => (
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
                                <div className="pb-2">
                                  <FaMoneyBill /> Salary: <br></br>
                                  <span className="card-text-price text-primary">
                                    {tuition?.t_salary >= 1
                                      ? Number(
                                          tuition?.t_salary
                                        ).toLocaleString() + " Tk"
                                      : "Negotiable"}
                                  </span>
                                  <span className="text-muted">/Month</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row" style={{ marginTop: "3rem" }}>
                            <div className="col-md-8">
                              Other Requirements : <br></br>
                              <strong> {tuition?.ex_information}</strong>
                            </div>
                            <div className="col-md-4">
                            
                              {tuition?.assigned?.length > 0 ? (
                                <button
                                  className="btn btn-outline-danger mb-2 w-100"
                                  disabled
                                >
                                  Not Available
                                </button>
                              ) : (
                                applyBtn
                              )}

                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="">
                        <Link href={`/tuition-list`}>
                          <div className="btn btn-1 gradient_bg text-light w-100">
                            Go Back to All Jobs
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <TuitionDetailsSkeleton />
      )}
    </>
  );
}

TuitionDetails.Layout = MasterLayout;

export default TuitionDetails;
