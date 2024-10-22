import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  FaAddressCard,
  FaBookReader,
  FaChalkboardTeacher,
  FaHome,
  FaUserAlt,
} from "react-icons/fa";

function BottomNavigation() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [selected, setSelected] = useState("/");
  const [userType, setUserType] = useState();

  const profilePathsPatterns = [
    /^\/auth\//,
    /^\/profile(\/|$)/, // Updated pattern to handle both /profile and /profile/
    /^\/student\//,
    /^\/student\/profile\//,
    /^\/tutor\/profile\//,
    /^\/uddokta\//
  ];
  
  const isProfileActive = profilePathsPatterns.some(pattern => pattern.test(selected)) ? "active" : "";
  

  const profileLink =
    userType === "student"
      ? "/student/profile"
      : userType === "tutor"
      ? "/profile"
      : "/auth/login";

  useEffect(() => {
    setSelected(currentRoute);
    const user_type = localStorage.getItem("user_type");
    setUserType(user_type);
  }, [currentRoute]);

  return (
    <div className="bottom_nav pc-hide">
      <div className="navigation">
        <ul>
          <Link href={profileLink}>
            <li
              onClick={() => setSelected("/profile")}
              className={isProfileActive}
            >
              <a>
                <span className="icon">
                  <FaUserAlt />
                </span>
                <span className="text">Profile</span>
              </a>
            </li>
          </Link>

          <Link href="/tuition-list">
            <li
              onClick={() => setSelected("/tuition-list")}
              className={
                selected == "/tuition-list"
                  ? "active"
                  : selected == "/tuition-list/view/[id]"
                  ? "active"
                  : ""
              }
            >
              <a>
                <span className="icon">
                  <FaBookReader />
                </span>
                <span className="text">Jobs</span>
              </a>
            </li>
          </Link>

          <Link href="/">
            <li
              onClick={() => setSelected("/")}
              className={selected == "/" ? "active" : ""}
            >
              <a>
                <span className="icon">
                  <FaHome />
                </span>
                <span className="text">Home</span>
              </a>
            </li>
          </Link>

          <Link href="/tutor_list?type=premium&district=&area=&medium&class=&gender=">
            <li
              onClick={() => setSelected("/tutor_list")}
              className={
                selected == "/tutor_list"
                  ? "active"
                  : selected == "/tutor-details/[id]"
                  ? "active"
                  : ""
              }
            >
              <a>
                <span className="icon">
                  <FaChalkboardTeacher />
                </span>
                <span className="text">Tutor</span>
              </a>
            </li>
          </Link>

          <Link href="/request-for-tutor">
            <li
              onClick={() => setSelected("/request-for-tutor")}
              className={selected == "/request-for-tutor" ? "active" : ""}
            >
              <a>
                <span className="icon">
                  <FaAddressCard />
                </span>
                <span className="text">Request</span>
              </a>
            </li>
          </Link>
          <div className="indicator"></div>
        </ul>
      </div>
    </div>
  );
}

export default BottomNavigation;
