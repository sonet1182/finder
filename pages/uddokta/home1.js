import { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo/logo.png";
import altImg from "../../assets/images/user.webp";

import appliedIcon from "../../assets/vector/credit-card-credit-svgrepo-com.svg";
import AssignedIcon from "../../assets/vector/batch-services-svgrepo-com.svg";
import confirmIcon from "../../assets/vector/confirm-svgrepo-com.svg";
import cancelIcon from "../../assets/vector/cancel-svgrepo-com (1).svg";

import Link from "next/link";
import Image from "next/image";
import {
  FaBars,
  FaBell,
  FaCamera,
  FaCheck,
  FaCog,
  FaDashcube,
  FaHandPaper,
  FaMoneyBillAlt,
  FaPencilAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Modal } from "react-bootstrap";
import axios from "axios";

export default function AffDashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [show, setShow] = useState(false);

  const url = process.env.domain;

  const [src, setSrc] = useState();

  const logoutController = (e) => {
    e.preventDefault();

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/logout`).then((res) => {
        if (res.status) {
          value.setUserData([]);
          // value?.setNotification(null);
          destroyToken();
          router.push("/");
        } else {
          alert("not ok");
        }
      });
    });

    // destroyToken();
  };

  // useEffect(() => {
  //   setSrc(url + value.userData?.teacher?.teacher_profile_picture);
  // }, [value]);

  const filePro = useRef();

  const [imagedata, setImagedata] = useState("");

  const handleChange = (file) => {
    setSrc(URL.createObjectURL(file[0]));
    setDrawerOpen(false);
    setShow(true);
    setImagedata(file[0]);
  };

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

  const sidebar = (
    <div>
      <div className="mt-5">
        <a className="list-group-item list-group-item-action text-center">
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

          <h6 className="text-center">name</h6>
          <h6 className="text-center">(vfygigu;)</h6>
        </a>

        <Link passHref href="/sheba_uddokta">
          <a
            onClick={() => setDrawerOpen(false)}
            className="list-group-item list-group-item-action"
          >
            <FaDashcube /> Profile
          </a>
        </Link>

        <Link href="/sheba_uddokta/notifications">
          <a
            onClick={() => setDrawerOpen(false)}
            className="list-group-item list-group-item-action"
          >
            <FaBell /> Lead
          </a>
        </Link>

        <Link href="/sheba_uddokta/view">
          <a
            onClick={() => setDrawerOpen(false)}
            className="list-group-item list-group-item-action"
          >
            <FaUser /> Refer
          </a>
        </Link>

        <Link passHref href="/sheba_uddokta/update">
          <a
            onClick={() => setDrawerOpen(false)}
            className="list-group-item list-group-item-action"
          >
            <FaPencilAlt /> Settings
          </a>
        </Link>

        <Link passHref href="/sheba_uddokta/payment_section">
          <a
            onClick={() => setDrawerOpen(false)}
            className="list-group-item list-group-item-action"
          >
            <FaMoneyBillAlt /> Payment Section
          </a>
        </Link>

        <Link passHref href="/sheba_uddokta/security">
          <a
            onClick={() => setDrawerOpen(false)}
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
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light shadow-sm navbar_bg">
        <span
          className="px-4 text-light text-bold pc-hide"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebar"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <FaBars />
        </span>

        <Link passHref href="/sheba_uddokta/home">
          <Image
            className="logo-nav px-2"
            width={180}
            height={58}
            src={logo}
            alt="logo"
          />
        </Link>
      </nav>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="sidebar"
        aria-labelledby="sidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarLabel">
            Sidebar
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">{sidebar}</div>
      </div>

      <div className="px-3">
        <div className="row">
          <div className="col-md-3 mb-hide">{sidebar}</div>
          <div className="col-md-9 col-sm-12 col-xs-12">
            <h5 className="mt-10 mb-10 page-title">Marchant Information</h5>
            <div className="row">
              <div className="col-md-12 py-3">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-3">Email:</div>
                      <div className="col-9">shawn@gmail.com</div>
                      <div className="col-3">Phone:</div>
                      <div className="col-9">01732379393</div>
                      <div className="col-3">Address:</div>
                      <div className="col-9">Mirpur, Dhaka</div>
                      <div className="col-3">Gender:</div>
                      <div className="col-9">Male</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h5 className="mt-10 mb-10 page-title">Payment Information</h5>
            <div className="row">
              <div className="col-md-4 py-3">
                <div className="card h-100">
                  <div className="row card-body">
                    <div className="col-4 item-center text-center">
                      <Image
                        src={appliedIcon}
                        alt="verify"
                        height={80}
                        width={80}
                      />
                    </div>
                    <div className="h-100 col-8">
                      <h6>Total Earnings</h6>

                      <h3>1200</h3>
                    </div>
                  </div>
                  <div className="card-footer text-center bg-light link">
                    <Link href="/profile/applied_jobs">View List</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 py-3">
                <div className="card h-100">
                  <div className="row card-body">
                    <div className="col-4 item-center text-center">
                      <Image
                        src={confirmIcon}
                        alt="verify"
                        height={80}
                        width={80}
                      />
                    </div>
                    <div className="h-100 col-8">
                      <h6>Total Withdraw</h6>

                      <h3>1200</h3>
                    </div>
                  </div>
                  <div className="card-footer text-center bg-light link">
                    <Link href="/profile/applied_jobs">View List</Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 py-3">
                <div className="card h-100">
                  <div className="row card-body">
                    <div className="col-4 item-center text-center">
                      <Image
                        src={AssignedIcon}
                        alt="verify"
                        height={80}
                        width={80}
                      />
                    </div>
                    <div className="h-100 col-8">
                      <h6>Total Pending</h6>

                      <h3>1200</h3>
                    </div>
                  </div>
                  <div className="card-footer text-center bg-light link">
                    <Link href="/profile/applied_jobs">View List</Link>
                  </div>
                </div>
              </div>
            </div>
            <h5 className="mt-10 mb-10 page-title">Credential Information</h5>
            <div className="row">
              <div className="col-md-12 py-3">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-3">Email:</div>
                      <div className="col-9">shawn@gmail.com</div>
                      <div className="col-3">Phone:</div>
                      <div className="col-9">01732379393</div>
                      <div className="col-3">Address:</div>
                      <div className="col-9">Mirpur, Dhaka</div>
                      <div className="col-3">Gender:</div>
                      <div className="col-9">Male</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
