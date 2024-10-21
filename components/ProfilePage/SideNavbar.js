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
  FaCheck,
  FaCog,
  FaDashcube,
  FaHandPaper,
  FaMoneyBillAlt,
  FaPencilAlt,
  FaPowerOff,
} from "react-icons/fa";
import { toast } from "react-toastify";
import altImg from "../../assets/images/user.webp";
import { userContext } from "../../Layouts/PrivateLayout";
import { appContext } from "../../pages/_app";
import { destroyToken, saveData, saveData2 } from "../../services/auth/token";

export default function SideNavbar() {
  const value2 = useContext(appContext);
  const value = useContext(userContext);

  const url = process.env.domain;

  const [src, setSrc] = useState(
    url +
      JSON.parse(localStorage.getItem("user_data"))?.teacher
        ?.teacher_profile_picture
  );

  const [userName, setUserName] = useState(
    JSON.parse(localStorage.getItem("user_data"))?.name
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("user_data"))?.id
  );

  const router = useRouter();
  const currentRoute = router.pathname;
  const [selected, setSelected] = useState("/profile");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setSelected(currentRoute);
  }, [currentRoute]);

  const filePro = useRef();

  const [imagedata, setImagedata] = useState("");

  const handleChange = (file) => {
    setSrc(URL.createObjectURL(file[0]));
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
        </div>

        <h6 className="text-center">{userName}</h6>
        <h6 className="text-center">(TS-{userId})</h6>

        <Link href="/profile">
          <div
            onClick={() => setSelected("/profile")}
            className={
              selected == "/profile"
                ? "list-group-item list-group-item-action active-sidenav"
                : "list-group-item list-group-item-action"
            }
          >
            <FaDashcube /> Dashboard
          </div>
        </Link>

        <Link href="/profile/job_board">
          <div
            onClick={() => setSelected("/profile/job_board")}
            className={
              selected == "/profile/job_board"
                ? "list-group-item list-group-item-action active-sidenav"
                : "list-group-item list-group-item-action"
            }
          >
            <FaDashcube /> Job Board
          </div>
        </Link>

        <Link href="/profile/notifications">
          <div
            onClick={() => setSelected("/profile/notifications")}
            className={
              selected == "/profile/notifications"
                ? "list-group-item list-group-item-action active-sidenav"
                : "list-group-item list-group-item-action"
            }
          >
            <FaBell /> Notification
          </div>
        </Link>

        <Link passHref href="/profile/update">
          <div
            onClick={() => setSelected("/profile/update")}
            className={
              selected == "/profile/update"
                ? "list-group-item list-group-item-action active-sidenav"
                : "list-group-item list-group-item-action"
            }
          >
            <FaPencilAlt /> Update Profile
          </div>
        </Link>

        <Link passHref href="/profile/payments">
          <div
            onClick={() => setSelected("/profile/payments")}
            className={
              router.pathname.startsWith("/profile/payments")
                ? "list-group-item list-group-item-action active-sidenav"
                : "list-group-item list-group-item-action"
            }
          >
            <FaMoneyBillAlt /> Payment Section
          </div>
        </Link>

        <Link passHref href="/profile/apply_status">
          <di
            onClick={() => setSelected("/profile/apply_status")}
            className={
              selected == "/profile/apply_status"
                ? "list-group-item list-group-item-action active-sidenav"
                : "list-group-item list-group-item-action"
            }
          >
            <FaHandPaper /> My Apply Status
          </di>
        </Link>

        <Link passHref href="/profile/profile_verification">
          <div
            onClick={() => setSelected("/profile/profile_verification")}
            className={
              selected == "/profile/profile_verification"
                ? "list-group-item list-group-item-action active-sidenav"
                : "list-group-item list-group-item-action"
            }
          >
            <FaCheck /> Profile Verification Request
          </div>
        </Link>

        <Link passHref href="/profile/security">
          <div
            onClick={() => setSelected("/profile/security")}
            className={
              selected == "/profile/security"
                ? "list-group-item list-group-item-action active-sidenav"
                : "list-group-item list-group-item-action"
            }
          >
            <FaCog /> Security
          </div>
        </Link>

        <Link passHref href="/profile/security">
          <div
            onClick={logoutController}
            className="list-group-item list-group-item-action"
          >
            <FaPowerOff className="text-danger" /> Logout
          </div>
        </Link>
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
