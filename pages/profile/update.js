import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta/Meta";
import EducationTab from "../../components/ProfilePage/EducationTab";
import ShortBio from "../../components/ProfilePage/ShortBio";
import PrivateLayout from "../../Layouts/PrivateLayout";
import privateApi from "../../services/privateApi";
import userIcon from "../../assets/icons/user.svg";
import eduIcon from "../../assets/icons/education.svg";
import tutorIcon from "../../assets/icons/teacher.svg";
import docIcon from "../../assets/icons/documents.svg";

import Image from "next/image";
import TuitionTab from "../../components/ProfilePage/TuitionTab";
import DocumentTab from "../../components/ProfilePage/DocumentTab";
import publicApi from "../../services/publicApi";

export default function Update() {
  const [user, setUser] = useState([]);
  const [activeTab, setActiveTab] = useState("edu");
  const [districts, setDistricts] = useState([]);
  const [instituteTypes, setInstituteTypes] = useState([]);
  const [studyTypes, setStudyTypes] = useState([]);

  const getUserData = async () => {
    const response = await privateApi.get("api/tutor/user_info");
    if (response.status === 200) {
      setUser(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const getDistricts = async () => {
    const response = await publicApi.get("api/district-list");
    if (response.status === 200) {
      setDistricts(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const getInstituteTypes = async () => {
    const response = await publicApi.get("api/institute-type-list");
    if (response.status === 200) {
      setInstituteTypes(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const getStudyTypes = async () => {
    const response = await publicApi.get("api/study-type-list");
    if (response.status === 200) {
      setStudyTypes(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    getUserData();
    getDistricts();
    getInstituteTypes();
    getStudyTypes();
  }, []);

  return (
    <>
      <Meta title="Profile Update | Khuje Now" />

      <div>
        <div className="row text-center">
          <div
            onClick={() => setActiveTab("edu")}
            className={`col-3 card link profile-update-tab ${
              activeTab == "edu" && "pt-active"
            }`}
          >
            <Image alt="image" src={eduIcon} height={50} width={50} />
            Educational-info
          </div>

          <div
            onClick={() => setActiveTab("tutor")}
            className={`col-3 card link profile-update-tab ${
              activeTab == "tutor" && "pt-active"
            }`}
          >
            <Image alt="image" src={tutorIcon} height={50} width={50} />
            Tuition-info
          </div>

          <div
            onClick={() => setActiveTab("personal")}
            className={`col-3 card link profile-update-tab ${
              activeTab == "personal" && "pt-active"
            }`}
          >
            <Image alt="image" src={userIcon} height={50} width={50} />
            Personal-info
          </div>
          <div
            onClick={() => setActiveTab("docs")}
            className={`col-3 card link profile-update-tab ${
              activeTab == "docs" && "pt-active"
            }`}
          >
            <Image alt="image" src={docIcon} height={50} width={50} />
            Documents-info
          </div>
        </div>
      </div>

      <div>
        {activeTab == "edu" ? (
          <EducationTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userInfo={user}
            setUser={setUser}
            instituteTypeList={instituteTypes}
            studyTypeList={studyTypes}
          />
        ) : activeTab == "personal" ? (
          <ShortBio
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userInfo={user}
            setUser={setUser}
            districtList={districts}
          />
        ) : activeTab == "tutor" ? (
          <TuitionTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userInfo={user}
            setUser={setUser}
            districtList={districts}
          />
        ) : activeTab == "docs" ? (
          <DocumentTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userInfo={user}
            setUser={setUser}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

Update.Layout = PrivateLayout;
