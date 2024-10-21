import React, { useEffect, useState } from "react";
import privateApi from "../../../services/privateApi";
import StudentLayout from "../../../Layouts/StudentLayout";
import Link from "next/link";
import altImg from "../../../assets/images/user.webp";
import locationIcon from "../../../assets/icons/member.png";
import customerCare from "../../../assets/vector/customer-care.jpg";
import fbCommunity from "../../../assets/vector/fb_community.svg";
import Image from "next/image";
import { FaCamera, FaPenAlt, FaPlus } from "react-icons/fa";
import { useRef } from "react";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import moment from "moment";

export default function Profile() {
  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);

  const [userName, setUserName] = useState({
    name: JSON.parse(localStorage.getItem("user_data"))?.name,
    mail: JSON.parse(localStorage.getItem("user_data"))?.email,
    phone: JSON.parse(localStorage.getItem("user_data"))?.phoneNumber,
    join_date: JSON.parse(localStorage.getItem("user_data"))?.created_at,
  });
  const [jobs, setJobs] = useState([]);
  const [notice, setNotice] = useState("");

  var time = new Date().getHours();
  var greeting =
    "Good " + (time < 12 ? "Morning" : time < 18 ? "Afternoon" : "Evening");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async (e) => {
    const response = await privateApi.get("api/student/dashboard_info");
    if (response.status === 200) {
      setJobs(response.data.jobs);
      setNotice(response.data.notice);
      setLoader(false);
    } else {
      console.log("Server Error");
    }
  };

  const url = process.env.domain;
  const [src, setSrc] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    if (userData && userData.image != null) {
      setSrc(url + userData.image);
    }
  }, []);

  const filePro = useRef();
  const [imagedata, setImagedata] = useState("");

  const handleChange = (file) => {
    setSrc(URL.createObjectURL(file[0]));
    setShow(true);
    setImagedata(file[0]);
  };

  const formData = new FormData();
  formData.append("image", imagedata);

  const formSubmit = async (e) => {
    setShow(false);

    const response = await privateApi.post(
      "api/student/update_profile_photo",
      formData
    );

    if (response.status === 200) {
      const user_data = JSON.parse(localStorage.getItem("user_data")) || {};
      user_data.image = response.data.data;
      localStorage.setItem("user_data", JSON.stringify(user_data));
      
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
      });

      window.location.reload();
    } else {
      alert("Sorry");
    }
  };

  return (
    <>
      <div className="app-main__outer">
        <div className="app-main__inner">
          <div className="row">
            <div className="col-md-8 py-3">
              <div className="card h-100 justify-content-center d-flex px-3">
                <div className="py-1">
                  <div className="row">
                    <h6>
                      <span className="float-right">
                        <Link href="/student/profile/update">
                          <button className="badge bg-success">
                            <FaPenAlt /> Edit Profile
                          </button>
                        </Link>
                      </span>
                    </h6>
                  </div>

                  <div className="row">
                    <div className="pc-hide col-4">
                      <div
                        className="wrapper3 mt-10 mb-40 box-info-profie"
                        style={{
                          display: "flex",
                          margin: "auto",
                        }}
                      >
                        <div
                          className="img-box"
                          onClick={(e) => filePro.current.click()}
                        >
                          <input
                            ref={filePro}
                            onChange={(e) => handleChange(e.target.files)}
                            multiple={false}
                            type="file"
                            hidden
                          />
                          {src ? (
                            <img
                              className="img-fluid avater-img-src"
                              src={src}
                              height={180}
                              width={180}
                              alt="photo"
                            />
                          ) : (
                            <Image
                              className="img-fluid avater-img-src"
                              src={altImg}
                              height={180}
                              width={180}
                              alt="photo"
                            />
                          )}
                        </div>

                        <div className="text text-light text-center">
                          <FaCamera />
                        </div>
                      </div>
                    </div>

                    <div className="col-8 item-center">
                      <div>
                        <h6>{greeting},</h6>
                        <h3 className="pb-2">{userName.name}</h3>
                        <div>
                          Phone:{" "}
                          <strong style={{ fontSize: "22px" }}>
                            {userName.phone}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div role="alert" className="alert alert-danger fade show mt-1">
                  <b className="text-center">
                    <strong>NB:</strong> {notice}
                  </b>
                </div>
              </div>
            </div>

            <div className="col-md-4  py-3">
              <div className="card h-100 shadow">
                <div className="row card-body">
                  <div className="col-3 item-center text-center">
                    <Image
                      src={locationIcon}
                      alt="verify"
                      height={80}
                      width={80}
                    />
                  </div>
                  <div className="h-100 col-9">
                    <h6>Welcome to</h6>
                    <h5>Guardian/Student Portal</h5>
                    <hr></hr>
                    Member Since:
                    <h6>{moment(userName?.join_date).format("LL")}</h6>
                  </div>
                </div>
                <Link href="/student/profile/posted-jobs">
                  <div className="card-footer text-center bg-purple link">
                    <FaPlus /> Post a New Tution Job
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="row">
            <h5 className="mt-10 mb-10 page-title">Activity Status</h5>
          </div>

          <div className="row">
            <div className="col-md-6 col-xl-2">
              <div className="custom-card mb-3 widget-content bg-love-kiss">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading">Pending</div>
                    <div className="widget-subheading">
                      verification processing
                    </div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-white">
                      <span>{jobs?.pending}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-2">
              <div className="custom-card mb-3 widget-content bg-arielle-smile">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading">Posted</div>
                    <div className="widget-subheading">Posted in job board</div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-white">
                      <span>{jobs?.posted}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-2">
              <div className="custom-card mb-3 widget-content bg-midnight-bloom">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading">Assigned</div>
                    <div className="widget-subheading">
                      Tutor has been assigned
                    </div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-white">
                      <span>{jobs?.assigned}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-2">
              <div className="custom-card mb-3 widget-content bg-grow-early">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading">Confirmed</div>
                    <div className="widget-subheading">
                      Tutor has been Confirmed
                    </div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-white">
                      <span>{jobs?.confirmed}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-2">
              <div className="custom-card mb-3 widget-content bg-plum-plate">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading">On Hold</div>
                    <div className="widget-subheading">Revenue streams</div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-white">
                      <span>{jobs?.on_hold}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-2">
              <div className="custom-card mb-3 widget-content bg-premium-dark">
                <div className="widget-content-wrapper text-white">
                  <div className="widget-content-left">
                    <div className="widget-heading">Cancelled</div>
                    <div className="widget-subheading">Revenue streams</div>
                  </div>
                  <div className="widget-content-right">
                    <div className="widget-numbers text-white">
                      <span>{jobs?.cancelled}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 py-3">
              <div className="card shadow">
                <div className="row card-body">
                  <div className="col-md-6">
                    <div className="text-center">
                      <Image
                        src={customerCare}
                        alt="Customer Care"
                        height={250}
                        width={250}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 item-center">
                    <div>
                      <h6>You can also call us at:</h6>
                      <h4>
                        <a href="tel:+8801722575388">+880 1722-575388</a>
                      </h4>
                      <small>(10:00 AM - 10:10 PM)</small>
                      <hr></hr>
                      For any kind of help or information contact with our
                      support team
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 py-3">
              <div className="card shadow">
                <div className="row card-body">
                  <div className="col-md-6">
                    <div className="text-center">
                      <Image
                        src={fbCommunity}
                        alt="fb Community"
                        height={250}
                        width={250}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 item-center">
                    <div>
                      <h6>Stay tuned by social communication</h6>
                      <h4>Join Guardian Community</h4>
                      <a
                        href="https://www.facebook.com/groups/902131949902074"
                        className="badge badge-pill badge-primary px-3 mt-2"
                      >
                        Join Now
                      </a>
                      <hr></hr>
                      Share your queries and experience with friends and family.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="md"
        centered
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body className="text-center py-5">
          <h3 className="pb-5">Are you sure to update Profile Photo？</h3>

          <div className="mt-3">
            <button
              className="btn btn-danger mx-1 px-5"
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
            <button className="btn btn-success mx-1 px-5" onClick={formSubmit}>
              Confirm
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

Profile.Layout = StudentLayout;
