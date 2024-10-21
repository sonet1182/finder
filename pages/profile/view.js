import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta/Meta";
import PrivateLayout from "../../Layouts/PrivateLayout";
import publicApi from "../../services/publicApi";
import altImg from "../../assets/images/user.webp";

export default function ViewProfile() {

  const [loading, setLoading] = useState(false);
  const [tutor, setTutor] = useState([]);

  const url = process.env.domain;
  const [src, setSrc] = useState("");


  

  const fetchId = async () => {
    const response = await publicApi.get(`api/tutor/user_info`);
    if (response.status === 200) {
      fetchTutorData(response?.data?.data?.profile_data?.teacher_id);
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
      console.log("tutor data", response.data.data?.teacher_profile_picture);
      setLoading(true);
    } else {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    fetchId();
  }, []);

  return (
    <>
      <Meta title="Profile-view | Tutor Sheba" />

      <div className="">
                  <div className="box-border-single">
                    <div className="row">
                      <div className="col-md-4">
                        <Image
                          className="mx-auto"
                          src={src}
                          height={200}
                          width={200}
                          alt="photo"
                          onError={() => setSrc(altImg)}
                        />
                        <br></br>

                        <small className="ml-4">
                          <i className="fa fa-clock-o"></i> Member Since:
                          {moment(tutor?.created_at).format("LL")}
                        </small>

                        <p className="">
                          Total views: <strong>{tutor?.views}</strong>
                        </p>
                      </div>
                      <div className="col-md-7 mt-5">
                        <div className="row">
                          <div className="col-4">Name:</div>
                          <div className="col-7">
                            <h5>{tutor?.name}</h5>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">ID#:</div>
                          <div className="col-7">
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
                          <div className="col-7">
                            <h6>{tutor.teacher_degree}</h6>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">Area Covered:</div>
                          <div className="col-7">
                            {tutor.districts?.districtName}({tutor.tuition_area}
                            )
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4">Teaching:</div>
                          <div className="col-7">{tutor.tuition_subject}</div>
                        </div>
                        <div className="row">
                          <div className="col-4">Present Location:</div>
                          <div className="col-7">
                            {tutor.teacher_present_address}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-20">
                      <div className="col">
                        <table className="table">
                          <thead className="thead-custom">
                            <tr>
                              <th scope="col">Tution Info</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">Expected Minimum Salary</th>
                              <td>{tutor.tuition_salary}</td>
                            </tr>
                            <tr>
                              <th scope="row">Current Status for Tuition </th>
                              <td>Available</td>
                            </tr>
                            <tr>
                              <th scope="row">Days Per Week</th>
                              <td colSpan="2">{tutor.tuition_days}</td>
                            </tr>
                            <tr>
                              <th scope="row">Preffered Tution Style</th>
                              <td>{tutor.tuition_style}</td>
                            </tr>
                            <tr>
                              <th scope="row">Place of Learning</th>
                              <td>Home Visit</td>
                            </tr>
                            <tr>
                              <th scope="row">Extra Facilities</th>
                              <td colSpan="2">Phone help</td>
                            </tr>
                            <tr>
                              <th scope="row">Preffered Medium of Version</th>
                              <td>{tutor.tuition_medium}</td>
                            </tr>
                            <tr>
                              <th scope="row">Preffered Class </th>
                              <td>{tutor.tuition_class}</td>
                            </tr>
                            <tr>
                              <th scope="row">Preffered Subjects</th>
                              <td colSpan="2">{tutor.tuition_subject}</td>
                            </tr>

                            <tr>
                              <th scope="row">Preferred Time</th>
                              <td colSpan="2">{tutor.tuition_shift}</td>
                            </tr>
                            <tr>
                              <th scope="row">Preffered Area to Teach</th>
                              <td colSpan="2">
                                {tutor.districts?.districtName} ,<br></br>{" "}
                                {tutor.tuition_area}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="row mt-20">
                      <div className="col">
                        <h5 className="ml-2 mb-5">Educational Qualification</h5>
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
                    </div>
                  </div>
                </div>
    </>
  );
}

ViewProfile.Layout = PrivateLayout;
