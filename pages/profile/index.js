import React, { useContext, useEffect, useState } from "react";
import Meta from "../../components/Meta/Meta";
import privateApi from "../../services/privateApi";
import PrivateLayout from "../../Layouts/PrivateLayout";
import Link from "next/link";
import verifyIcon from "../../assets/vector/verified-svgrepo-com.svg";
import pendingIcon from "../../assets/vector/sand-clock-svgrepo-com.svg";
import premiumIcon from "../../assets/vector/window-premium-svgrepo-com.svg";
import proPercentage from "../../assets/vector/profile-user-svgrepo-com.svg";
import appliedIcon from "../../assets/vector/credit-card-credit-svgrepo-com.svg";
import AssignedIcon from "../../assets/vector/batch-services-svgrepo-com.svg";
import confirmIcon from "../../assets/vector/confirm-svgrepo-com.svg";
import cancelIcon from "../../assets/vector/cancel-svgrepo-com (1).svg";
// import popup from "../../assets/images/popup.jpg";

import customerCare from "../../assets/vector/customer-care.jpg";
import fbCommunity from "../../assets/vector/fb_community.svg";

import altImg from "../../assets/images/user.webp";
import locationIcon from "../../assets/vector/location_map.svg";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { Modal } from "react-bootstrap";
import { FaCamera, FaPen, FaPenAlt } from "react-icons/fa";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { saveData } from "../../services/auth/token";
import { appContext } from "../_app";

import OGImage from "../../assets/images/og_image.jpg";

export default function Profile() {
  const [loader, setLoader] = useState(true);
  const [premiumModal, setPremiumModal] = useState(false);
  const value = useContext(appContext);
  const [user2, setUser2] = useState(value.userData);
  const [user, setUser] = useState([]);
  const [userName, setUserName] = useState({
    name: JSON.parse(localStorage.getItem("user_data"))?.name,
    mail: JSON.parse(localStorage.getItem("user_data"))?.email,
    phone: JSON.parse(localStorage.getItem("user_data"))?.phoneNumber,
  });

  var time = new Date().getHours();
  var greeting =
    "Good " + (time < 12 ? "Morning" : time < 18 ? "Afternoon" : "Evening");

  useEffect(() => {
    if (
      user2.approval == 1 ||
      user2.verification?.profile_verification_request == 1
    ) {
      setPremiumModal(false);
    } else {
      setPremiumModal(true);
    }
    getUserData();
  }, [user2]);

  const getUserData = async (e) => {
    const response = await privateApi.get("api/tutor/dashboard_info");
    if (response.status === 200) {
      setUser(response.data.data);
      console.log("userr data", response.data.data);
      setLoader(false);
    } else {
      console.log("Server Error");
    }
  };

  const url = process.env.domain;
  const [src, setSrc] = useState(
    url +
      JSON.parse(localStorage.getItem("user_data"))?.teacher
        ?.teacher_profile_picture
  );

  const filePro = useRef();

  const [show, setShow] = useState(false);
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

    const res = await privateApi.post(
      "api/tutor/update_profile_photo",
      formData
    );

    if (res.status === 200) {
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
      });

      saveData(JSON.stringify(res.data.data), res.data.notification);

      window.location.reload();
    } else {
      alert("Sorry");
    }
  };

  return (
    <>
      <Meta title="Profile | Khuje Now" />
      <meta property="og:image" content={OGImage} />

      <div className="row">
        <div className="col-md-8 py-3">
          <div className="card h-100 justify-content-center d-flex px-3">
            <div className="py-1">
              <div className="row">
                <h6>
                  {greeting},{" "}
                  <span className="float-right">
                    <Link href="/profile/update">
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

                <div className="col-8">
                  <h3 className="py-2">{userName.name}</h3>
                  <div>
                    Email: <strong>{userName.mail}</strong>
                  </div>
                  <div>
                    Phone: <strong>{userName.phone}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div role="alert" className="alert alert-danger fade show mt-1">
              <b className="text-center">
                <strong>NB:</strong> {user?.notice?.text}
              </b>
            </div>
          </div>
        </div>

        <div className="col-md-4  py-3">
          <div className="card h-100 shadow">
            <div className="row card-body">
              <div className="col-3 item-center text-center">
                <Image src={locationIcon} alt="verify" height={80} width={80} />
              </div>
              <div className="h-100 col-9">
                <h5>Total: {user?.total_jobs}</h5>
                <small>Jobs on your prefeard locations</small>
                <hr></hr>
                Your Tuition Area:
                <h6>{user?.tuition_area}</h6>
              </div>
            </div>
            <Link href="/profile/job_board">
              <div className="card-footer text-center bg-purple link">
                View Jobs
              </div>
            </Link>
          </div>
        </div>

        <div className="col-md-4  py-3">
          <div className="card h-100 shadow">
            <div className="row card-body">
              <div className="col-4 item-center text-center">
                <Image
                  src={proPercentage}
                  alt="verify"
                  height={80}
                  width={80}
                />
              </div>
              <div className="h-100 col-8">
                {/* <h5>{user?.teacher?.prog}%</h5> */}

                {user?.teacher?.prog > 80 ? (
                  <div className="progress">
                    <div
                      className="bar"
                      style={{ width: `${user?.teacher?.prog}%` }}
                    >
                      <p className="percent">{user?.teacher?.prog}%</p>
                    </div>
                  </div>
                ) : (
                  <div className="progress">
                    <div
                      className="bar2"
                      style={{ width: `${user?.teacher?.prog}%` }}
                    >
                      <p className="percent">{user?.teacher?.prog}%</p>
                    </div>
                  </div>
                )}

                {user?.teacher?.prog > 80 ? (
                  <small>
                    Congratulations! Your tutor profile is now completed with{" "}
                    {user?.teacher?.prog}% informations. Well organized profile
                    may help to get more benefits.
                  </small>
                ) : (
                  <small>
                    Please completed minimum <strong>80%</strong> Profile
                    Progress to apply your required tuitions. More informations
                    helps us to reach you with your preferred tuition jobs.
                  </small>
                )}
              </div>
            </div>
            <Link href="/profile/update">
              <div className="card-footer text-center bg-purple link">
                Update Profile
              </div>
            </Link>
          </div>
        </div>

        <div className="col-md-4  py-3 mb-hide">
          <div className="card h-100 shadow">
            <div className="row card-body">
              <div className="col-4 item-center text-center">
                {user?.teacher?.user?.verified == 1 ? (
                  <Image src={verifyIcon} alt="verify" height={80} width={80} />
                ) : user?.teacher?.user?.verified == 0 ? (
                  <Image
                    src={pendingIcon}
                    alt="verify"
                    height={80}
                    width={80}
                  />
                ) : (
                  <Skeleton height={80} width={80} />
                )}
              </div>

              <div className="col-8">
                {user?.teacher?.user?.verified == 1 ? (
                  <>
                    <h5>Verified</h5>
                    <br></br>
                    <small>
                      Congratulations! Your profile is verified & authenticated.
                    </small>
                  </>
                ) : user?.teacher?.user?.verified == 0 ? (
                  <>
                    <h5>Pending</h5>
                    <br></br>
                    <small>
                      Your pofile is on verification process. You can send us a
                      profile verification Request. Verified profile will help
                      you to get your preferred tuition easily
                    </small>
                  </>
                ) : (
                  <>
                    <Skeleton height={10} width={180} />
                    <Skeleton height={80} width={180} />
                  </>
                )}
              </div>
            </div>
            <Link href="/profile/profile_verification" className="">
              <div className="card-footer text-center bg-purple link">
                Verify Profile
              </div>
            </Link>
          </div>
        </div>

        <div className="col-md-4  py-3">
          <div className="card h-100 shadow">
            <div className="row card-body">
              <div className="col-4 item-center text-center">
                <Image src={premiumIcon} alt="verify" height={80} width={80} />
              </div>
              <div className="h-100 col-8">
                {user?.teacher?.home_approval == 1 ? (
                  <>
                    <h5>Premium</h5>
                    <br></br>
                    <h6 className="text-success">
                      Congratulations! Your are our premium member.
                    </h6>
                  </>
                ) : (
                  <>
                    <h5>Premium Request</h5>
                    <small>
                      Make your profile premium for one year to receive frequent
                      tuition job updates & get prioritized your tuition job
                      applications by Notifications.
                    </small>
                  </>
                )}
              </div>
            </div>
            <Link href="/profile/profile_verification">
              <div className="card-footer text-center bg-purple link">
                Premium Profile Verification Request
              </div>
            </Link>
          </div>
        </div>
      </div>

      <h4 className="mt-10 mb-10 page-title">Apply Status</h4>

      <div className="row">
        <div className="col-md-3 py-3">
          <div className="card h-100">
            <div className="row card-body">
              <div className="col-4 item-center text-center">
                <Image src={appliedIcon} alt="verify" height={80} width={80} />
              </div>
              <div className="h-100 col-8">
                <h6>Applied Jobs</h6>

                <h3>{user?.applied}</h3>
              </div>
            </div>
            <div className="card-footer text-center bg-light link">
              <Link href="/profile/applied_jobs">View List</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 py-3">
          <div className="card h-100">
            <div className="row card-body">
              <div className="col-4 item-center text-center">
                <Image src={AssignedIcon} alt="verify" height={80} width={80} />
              </div>
              <div className="h-100 col-8">
                <h6>Assigned Jobs</h6>

                <h3>{user?.assigned}</h3>
              </div>
            </div>
            <div className="card-footer text-center bg-light link">
              <Link href="/profile/assigned_jobs">View List</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 py-3">
          <div className="card h-100">
            <div className="row card-body">
              <div className="col-4 item-center text-center">
                <Image src={confirmIcon} alt="verify" height={80} width={80} />
              </div>
              <div className="h-100 col-8">
                <h6>Confirmed Jobs</h6>

                <h3>{user?.confirmed}</h3>
              </div>
            </div>
            <div className="card-footer text-center bg-light link">
              <Link href="/profile/confirmed_jobs">View List</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 py-3">
          <div className="card h-100">
            <div className="row card-body">
              <div className="col-4 item-center text-center">
                <Image src={cancelIcon} alt="verify" height={80} width={80} />
              </div>
              <div className="h-100 col-8">
                <h6>Cancelled Jobs</h6>

                <h3>{user?.cancelled}</h3>
              </div>
            </div>
            <div className="card-footer text-center bg-light link">
              <Link href="/profile/cancelled_jobs">View List</Link>
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
                  For any kind of help or information contact with our support
                  team
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
                  <h4>Join Tutor Community</h4>
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

      <Modal
        show={premiumModal}
        onHide={() => setPremiumModal(false)}
        size="md"
        centered
        aria-labelledby="example-modal-sizes-title-lg"
        dialogClassName="modal-full"
      >
        <div style={{ position: "relative" }}>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => setPremiumModal(false)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "2.5rem",
              zIndex: 1,
              color: "#fff",
            }}
          >
            &times;
          </button>

          <Link href="/profile/profile_verification">
            <div className="promo_image">
              <Image
                src={url + user?.promo?.image}
                alt=""
                layout="fill"
                objectFit="cover"
                className="link"
                priority // Ensures the image loads quickly
              />
            </div>
          </Link>
        </div>
      </Modal>
    </>
  );
}

Profile.Layout = PrivateLayout;
