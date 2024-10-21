import axios from "axios";
import FormData from "form-data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
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
import altImg from "../../assets/images/user.webp";
import fbCommunity from "../../assets/vector/tsheba_guardian.jpg";
import { userContext } from "../../Layouts/StudentLayout";
import { destroyToken } from "../../services/auth/token";
import privateApi from "../../services/privateApi";

export default function SideNavbar() {
  const value2 = useContext(userContext);

  const [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem("user_data"))?.name
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("user_data"))?.id
  );

  // const userData = JSON.parse(localStorage.getItem("user_data"));

  const router = useRouter();
  const currentRoute = router.pathname;
  const [show, setShow] = useState(false);

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
    } else {
      alert("Sorry");
    }
  };

  const logoutController = (e) => {
    e.preventDefault();

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/logout`).then((res) => {
        if (res.status) {
          value2.setUserData([]);
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
      <div className="list-group card">
        <div
          className="wrapper mt-10 mb-40 box-info-profie"
          style={{
            display: "flex",
            margin: "auto",
          }}
        >
          <div className="img-box" onClick={(e) => filePro.current.click()}>
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

        <h6 className="text-center">{userName}</h6>
        <h6 className="text-center">(TS-{userId})</h6>

        <Link passHref href="/student/profile">
          <a
            className={`list-group-item list-group-item-action ${
              currentRoute === "/student/profile" ? "active-sidenav" : ""
            }`}
          >
            <FaDashcube /> Dashboard
          </a>
        </Link>

        <Link passHref href="/student/profile/tutor-request">
          <a
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
            className={`list-group-item list-group-item-action ${
              currentRoute === "/student/profile/posted-jobs" ||
              currentRoute.startsWith("/student/profile/posted-jobs/")
                ? "active-sidenav"
                : ""
            }`}
          >
            <FaBell /> Posted Jobs
          </a>
        </Link>

        <Link passHref href="/student/profile/update">
          <a
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

      <div className="card pt-2">
        <Image src={fbCommunity} alt="fb Community" />
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
