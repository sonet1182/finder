import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta/Meta";
import privateApi from "../../services/privateApi";
import PrivateLayout from "../../Layouts/PrivateLayout";
import SideNavbar from "../../components/ProfilePage/SideNavbar";
import Link from "next/link";
import verifyIcon from "../../assets/vector/store-verified-shopping-svgrepo-com.svg";
import pendingIcon from "../../assets/vector/sand-clock-svgrepo-com.svg";
import premiumIcon from "../../assets/vector/window-premium-svgrepo-com.svg";
import proPercentage from "../../assets/vector/profile-user-svgrepo-com.svg";
import appliedIcon from "../../assets/vector/credit-card-credit-svgrepo-com.svg";
import AssignedIcon from "../../assets/vector/batch-services-svgrepo-com.svg";
import confirmIcon from "../../assets/vector/confirm-svgrepo-com.svg";
import cancelIcon from "../../assets/vector/cancel-svgrepo-com (1).svg";
import Image from "next/image";

export default function ApplyStatus() {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState([]);

  var time = new Date().getHours();
  var greeting =
    "Good " + (time < 12 ? "Morning" : time < 18 ? "Afternoon" : "Evening");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async (e) => {
    const response = await privateApi.get("api/tutor/dashboard_info");
    if (response.status === 200) {
      setUser(response.data.data);
      setLoader(false);
    } else {
      console.log("Server Error");
    }
  };

  return (
    <>
      <Meta title="Profile | Khuje Now" />

        <h3 className="mt-10 mb-10 page-title">Apply Status</h3>


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
    </>
  );
}

ApplyStatus.Layout = PrivateLayout;
