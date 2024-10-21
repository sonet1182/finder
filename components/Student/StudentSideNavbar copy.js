import axios from "axios";
import FormData from "form-data";
import Image from "next/image";
import Link from "next/link";
import altImg from "../../assets/images/user.webp";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import { Modal } from "react-bootstrap";
import {
  FaBell,
  FaCamera,
  FaDashcube,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { appContext } from "../../pages/_app";
import { destroyToken, saveData } from "../../services/auth/token";
import logo from "../../assets/images/logo/logo.png";

const NavLink = ({ href, text, selected, onClick, icon: Icon }) => (
  <Link href={href}>
    <div
      onClick={() => onClick(href)}
      className={`list-group-item list-group-item-action ${
        selected === href ? "active-sidenav" : ""
      }`}
    >
      {Icon && <Icon />} {text}
    </div>
  </Link>
);

export default function StudentSideNavbar() {
  const value = useContext(appContext);
  const url = process.env.domain;
  const [src, setSrc] = useState();
  const [toggle, setToggle] = useState(true);

  // const [src, setSrc] = useState(
  //   url +
  //     JSON.parse(localStorage.getItem("user_data"))?.teacher
  //       ?.teacher_profile_picture
  // );

  // const userName = JSON.parse(localStorage.getItem("user_data"))?.name;
  // const userId = JSON.parse(localStorage.getItem("user_data"))?.id;
  const router = useRouter();
  const currentRoute = router.pathname;
  const [selected, setSelected] = useState("/profile");
  const [show, setShow] = useState(false);

  const filePro = useRef();
  const [imagedata, setImagedata] = useState("");
  const handleChange = (file) => {
    // setSrc(URL.createObjectURL(file[0]));
    setShow(true);
    setImagedata(file[0]);
  };

  useEffect(() => {
    setSelected(currentRoute);
  }, [currentRoute]);

  const formData = new FormData();
  formData.append("image", imagedata);

  const formSubmit = (e) => {
    setShow(false);
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("api/tutor/update_profile_photo", formData).then((res) => {
        if (res.status === 200) {
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

  const logoutController = (e) => {
    e.preventDefault();

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
  };


  return (
    <>
      <div className="app-sidebar sidebar-shadow">
        <div className="app-header__logo">
          <div className="logo-src">
            <Link passHref href="/">
              <Image
                className="logo-nav"
                width={180}
                height={58}
                src={logo}
                alt="logo"
              />
            </Link>
          </div>
          <div className="header__pane ml-auto">
            <div>
              <button
                type="button"
                className="hamburger close-sidebar-btn hamburger--elastic"
                data-class="closed-sidebar"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              className="hamburger hamburger--elastic mobile-toggle-nav"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
        <div className="app-header__menu">
          <span>
            <button
              type="button"
              className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
            >
              <span className="btn-icon-wrapper">
                <i className="fa fa-ellipsis-v fa-w-6"></i>
              </span>
            </button>
          </span>
        </div>
        <div className="scrollbar-sidebar">
          <div style={{ marginTop: "55px" }}>
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
              <h6 className="text-center">{value.userData?.phoneNumber}</h6>
              <h6 className="text-center">(Guardian Id-{value.userData?.id})</h6>
            </a>

            <Link passHref href="/student/profile">
              <a
                onClick={() => setToggle(false)}
                className={`list-group-item list-group-item-action ${
                  currentRoute === "/student/profile" ? "active-sidenav" : ""
                }`}
              >
                <FaDashcube /> Dashboard
              </a>
            </Link>

            <Link passHref href="/student/profile/tutor-request">
              <a
                onClick={() => setToggle(false)}
                className={`list-group-item list-group-item-action ${
                  currentRoute === "/student/profile/tutor-request"
                    ? "active-sidenav"
                    : ""
                }`}
              >
                <FaDashcube /> Tutor Request
              </a>
            </Link>

            <Link passHref href="/student/profile/posted-jobs">
              <a
                onClick={() => setToggle(false)}
                className={`list-group-item list-group-item-action ${
                  currentRoute === "/student/profile/posted-jobs"
                    ? "active-sidenav"
                    : ""
                }`}
              >
                <FaBell /> Posted Jobs
              </a>
            </Link>

            <Link passHref href="/student/profile/update">
              <a
                onClick={() => setToggle(false)}
                className={`list-group-item list-group-item-action ${
                  currentRoute === "/student/profile/update" ? "active-sidenav" : ""
                }`}
              >
                <FaUser /> Update Profile
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
      </div>
    </>
  );
}
