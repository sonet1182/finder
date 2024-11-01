import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Modal, Button } from "react-bootstrap";
import logo from "../assets/images/logo/logo.png";
import bell from "../assets/vector/bell-part-2-svgrepo-com.svg";
import userIcon from "../assets/vector/profile-user-svgrepo-com.svg";
import { appContext } from "../pages/_app";
import axios from "axios";
import { destroyToken, saveData } from "../services/auth/token";
import {
  FaBell,
  FaCheck,
  FaCog,
  FaDashcube,
  FaHandPaper,
  FaMoneyBillAlt,
  FaPencilAlt,
  FaUser,
  FaUserAlt,
  FaBars,
  FaSignInAlt,
  FaSignOutAlt,
  FaCamera,
} from "react-icons/fa";

import altImg from "../assets/images/user.webp";
import { toast } from "react-toastify";
import FormData from "form-data";

const Navbar2 = () => {
  const router = useRouter();
  const value = useContext(appContext);
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);
  const currentRoute = router.pathname;

  const logoutController = (e) => {
    e.preventDefault();
    destroyToken();
    value.setUserData([]);
    router.push("/");

    if (value.userType == "partner") {
      axios.post(`api/partner/logout`).then((res) => {
        if (res.status) {
          value.setUserData([]);
          destroyToken();
          router.push("/");
        } else {
          alert("not ok");
        }
      });
    } else {
      axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.post(`api/logout`).then((res) => {
          if (res.status) {
            value.setUserData([]);
            destroyToken();
            router.push("/");
          } else {
            alert("not ok");
          }
        });
      });
    }
  };

  const tutorSearchHandler = async (e) => {
    router.push({
      pathname: `/tutor_list/`,
      query: {
        type: "premium",
        district: "",
        area: "",
        medium: "",
        class: "",
        gender: "",
      },
    });
  };

  const jobListhHandler = async (e) => {
    localStorage.setItem("job_page", 1);
    router.push({
      pathname: `/tuition-list`,
    });
  };

  const url = process.env.domain;
  const [src, setSrc] = useState();

  useEffect(() => {
    setSrc(url + value.userData?.teacher?.teacher_profile_picture);
  }, [value]);

  const filePro = useRef();
  const [imagedata, setImagedata] = useState("");

  const handleChange = (file) => {
    setSrc(URL.createObjectURL(file[0]));
    setToggle(false);
    setShow(true);
    setImagedata(file[0]);
  };

  const formData = new FormData();
  formData.append("image", imagedata);

  const formSubmit = (e) => {
    setShow(false);
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("api/tutor/update_profile_photo", formData).then((res) => {
        if (res.status === 200) {
          setToggle(true);
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
          });

          saveData(JSON.stringify(res.data.data), res.data.notification);
        } else {
          alert("Sorry");
        }
      });
    });
  };

  return (
    <>
      <nav className="header navbar navbar-expand-lg bg-light shadow-sm navbar_bg">
        <div className="container">
          <Link passHref href="/">
            <Image
              className="logo-nav"
              width={180}
              height={58}
              src={logo}
              alt="logo"
            />
          </Link>

          <button
            className="navbar-toggler pc-hide"
            onClick={() => setToggle(!toggle)}
          >
            <FaBars className="text-light" />
          </button>

          <div id={toggle ? `mySidenav` : ''} className="sidenav">
            <a
              className="closebtn mt-3 text-light"
              onClick={() => setToggle(!toggle)}
            >
              &times;
            </a>

            <div className="mt-5">
              <a className="list-group-item list-group-item-action text-center">
                <div
                  className="wrapper mt-10 mb-40 box-info-profie"
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
                    <Image
                      className="img-fluid avater-img-src"
                      src={src}
                      height={180}
                      width={180}
                      alt="photo"
                      onError={(e) => setSrc(altImg)}
                    />
                  </div>
                  <div className="text text-light text-center">
                    <FaCamera />
                  </div>

                  <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    size="md"
                    centered
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Body className="text-center py-5">
                      <h3 className="pb-5">
                        Are you sure to update Profile Photo？
                      </h3>

                      <div className="mt-3">
                        <button
                          className="btn btn-danger mx-1 px-5"
                          onClick={() => setShow(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success mx-1 px-5"
                          onClick={formSubmit}
                        >
                          Confirm
                        </button>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>

                <h6 className="text-center">{value.userData?.name}</h6>
                <h6 className="text-center">(TS-{value.userData?.id})</h6>
              </a>

              <Link passHref href="/profile">
                <a
                  onClick={() => setToggle(false)}
                  className="list-group-item list-group-item-action"
                >
                  <FaDashcube /> Dashboard
                </a>
              </Link>

              <Link passHref href="/profile/job_board">
                <a
                  onClick={() => setToggle(false)}
                  className="list-group-item list-group-item-action"
                >
                  <FaDashcube /> Job Board
                </a>
              </Link>

              <Link href="/profile/notifications">
                <a
                  onClick={() => setToggle(false)}
                  className="list-group-item list-group-item-action"
                >
                  <FaBell /> Notification
                </a>
              </Link>

              <Link href="/profile/view">
                <a
                  onClick={() => setToggle(false)}
                  className="list-group-item list-group-item-action"
                >
                  <FaUser /> View Profile
                </a>
              </Link>

              <Link passHref href="/profile/update">
                <a
                  onClick={() => setToggle(false)}
                  className="list-group-item list-group-item-action"
                >
                  <FaPencilAlt /> Update Profile
                </a>
              </Link>

              <Link passHref href="/profile/payments">
                <a
                  onClick={() => setToggle(false)}
                  className="list-group-item list-group-item-action"
                >
                  <FaMoneyBillAlt /> Payment Section
                </a>
              </Link>

              <Link passHref href="/profile/apply_status">
                <a
                  onClick={() => setToggle(false)}
                  className="list-group-item list-group-item-action"
                >
                  <FaCheck /> <FaHandPaper /> My Status
                </a>
              </Link>

              <Link passHref href="/profile/profile_verification">
                <a
                  onClick={() => setToggle(false)}
                  className="list-group-item list-group-item-action"
                >
                  <FaCheck /> Profile Verification Request
                </a>
              </Link>

              <Link passHref href="/profile/security">
                <a
                  onClick={() => setToggle(false)}
                  className="list-group-item list-group-item-action"
                >
                  <FaCog /> Security
                </a>
              </Link>

              <a
                onClick={logoutController}
                className="list-group-item list-group-item-action link"
              >
                <FaSignOutAlt /> Logout
              </a>
            </div>
          </div>

          <button
            className="navbar-toggler mb-hide"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FaBars className="text-light" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 main-menu">
              <li className="nav-item">
                <Link passHref href="/tuition-list">
                  <a
                    className={`nav-link ${
                      currentRoute === "/tuition-list" ? "active" : ""
                    }`}
                  >
                    TUITION JOBS
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <span className="link" onClick={tutorSearchHandler}>
                  <a
                    className={`nav-link ${
                      router.pathname === "/tutor_list" ? "active" : ""
                    }`}
                  >
                    PREMIUM TUTORS
                  </a>
                </span>
              </li>

              <li className="nav-item">
                <span className="link" onClick={jobListhHandler}>
                  <a
                    className={`nav-link ${
                      router.pathname === "/request-for-tutor" ? "active" : ""
                    }`}
                  >
                    TUTOR REQUEST
                  </a>
                </span>
              </li>

              <li className="nav-item">
                <a
                  onClick={() => setToggle(false)}
                  className="nav-link"
                  href="https://khujenow.com/"
                >
                  COURSES
                </a>
              </li>
            </ul>

            <ul className="d-flex navbar-nav mb-2 mb-lg-0">
              {value.userData?.name ? (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {value.userData.name}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      {value.userType == "partner" ? (
                        <li>
                          <Link passHref href="/uddokta/home">
                            <a
                              onClick={() => setToggle(false)}
                              className="dropdown-item"
                            >
                              <FaUserAlt /> Profile
                            </a>
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link passHref href="/profile">
                            <a
                              onClick={() => setToggle(false)}
                              className="dropdown-item"
                            >
                              <FaUserAlt /> Profile
                            </a>
                          </Link>
                        </li>
                      )}

                      <li onClick={logoutController} className="link">
                        <a
                          onClick={() => setToggle(false)}
                          className="dropdown-item"
                        >
                          <FaSignOutAlt /> Logout
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item pt-5 mr-5 link">
                    <Link href="/profile/notifications">
                      <div className="notification-icon">
                        <Image
                          src={bell}
                          alt="Notification Icon"
                          height={30}
                          width={30}
                        />
                        {localStorage.getItem("notification") > 0 && (
                          <div className="notification-icon__badge">
                            {localStorage.getItem("notification")}
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link passHref href="/auth/register">
                      <a type="button" className="btn mx-2 hover-up">
                        <FaSignOutAlt /> Register
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link passHref href="/auth/login">
                      <span className="btn btn-default2 hover-up link">
                        <FaSignInAlt /> Login
                      </span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar2;
