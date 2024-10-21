import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/images/logo/logo.png";
import bell from "../assets/vector/bell-part-2-svgrepo-com.svg";
import axios from "axios";
import { useRouter } from "next/router";
import { appContext } from "../pages/_app";
import { destroyToken } from "../services/auth/token";
import {
  FaUserAlt,
  FaBars,
  FaSignInAlt,
  FaSignOutAlt,
  FaEdit,
} from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const userData = useContext(appContext);
  const [value, setValue] = useState([]);
  const [toggle, setToggle] = useState(false);
  const currentRoute = router.pathname;

  const logoutController = (e) => {
    e.preventDefault();
    value.setUserData([]);
    destroyToken();
    router.push("/");

    axios.post(`api/partner/logout`).then((res) => {
      if (res.status) {
        value.setUserData([]);
        destroyToken();
      } else {
        alert("not ok");
      }
    });
  };

  const tutorSearchHandler = async (e) => {
    setToggle(false);
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

  const routingHandler = (link) => {
    setToggle(false);
    router.push(link);
  };

  useEffect(() => {
    setValue(userData);
  }, [userData]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light shadow-sm navbar_bg">
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
            className="navbar-toggler"
            type="button"
            onClick={() => setToggle(!toggle)}
          >
            <FaBars className="text-light" />
          </button>

          <div
            className={`collapse navbar-collapse ${toggle && "show"}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 main-menu">
              <li className="nav-item link">
                <a
                  onClick={() => {
                    routingHandler("/tuition-list");
                    localStorage.setItem("job_page", 1);
                  }}
                  className={`nav-link ${
                    currentRoute === "/tuition-list" ? "active" : ""
                  }`}
                >
                  TUITION JOBS
                </a>
              </li>

              <li className="nav-item link">
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

              <li className="nav-item link">
                <a
                  onClick={() => routingHandler("/request-for-tutor")}
                  className={`nav-link ${
                    router.pathname === "/request-for-tutor" ? "active" : ""
                  }`}
                >
                  TUTOR REQUEST
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="https://course.tutorsheba.com/">
                  COURSES
                </a>
              </li>
            </ul>

            <ul className="d-flex navbar-nav mb-2 mb-lg-0">
              {value?.userData?.name ? (
                <>
                  <li className="nav-item dropdown pt-5">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {value?.userData?.name}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      {value?.userType == "partner" ? (
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
                      ) : value?.userType == "student" ? (
                        <li>
                          <Link passHref href="/student/profile">
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
                      <div className="notification-icon p-2">
                        <Image
                          src={bell}
                          alt="Notification Icon"
                          height={22}
                          width={22}
                        />
                        {localStorage?.getItem("notification") > 0 && (
                          <div className="notification-icon__badge">
                            {localStorage?.getItem("notification")}
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mb-hide">
                    <Link passHref href="/auth/register">
                      <a
                        type="button"
                        className="btn mx-2 hover-up"
                        style={{ border: "1px solid #fff" }}
                      >
                        <FaSignOutAlt /> Register
                      </a>
                    </Link>
                  </li>

                  <li className="nav-item mb-hide">
                    <Link passHref href="/auth/login">
                      <span
                        className="btn btn-default2 hover-up link"
                        style={{ border: "1px solid #fff" }}
                      >
                        <FaSignInAlt /> Login
                      </span>
                    </Link>
                  </li>

                  <li className="nav-item my-3 pc-hide">
                    <span
                      onClick={() => routingHandler("/auth/register")}
                      type="button"
                      className="btn mx-2 hover-up link text-light"
                      style={{ border: "1px solid #fff" }}
                    >
                      <FaEdit /> Register
                    </span>

                    <span
                      onClick={() => routingHandler("/auth/login")}
                      className="btn btn-default2 hover-up link"
                      style={{ border: "1px solid #fff" }}
                    >
                      <FaSignInAlt /> Login
                    </span>
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

export default Navbar;
