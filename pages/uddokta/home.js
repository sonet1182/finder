import React from "react";
import appliedIcon from "../../assets/vector/credit-card-credit-svgrepo-com.svg";
import AssignedIcon from "../../assets/vector/batch-services-svgrepo-com.svg";
import confirmIcon from "../../assets/vector/confirm-svgrepo-com.svg";
import Image from "next/image";
import ShebaUddoktaLayout, { affContext } from "./ShebaUddoktaLayout";
import Link from "next/link";
import { FaPenAlt } from "react-icons/fa";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

function AffHome() {
  const value = useContext(affContext);
  const [user, setUser] = useState(value.user);

  useEffect(() => {
    setUser(value?.user);
    console.log("from context", value?.user);
  }, [value?.user]);

  return (
    <>
      <h5 className="mt-10 mb-10 page-title">
        Uddokta Information
        <span className="float-right">
          <Link href="/uddokta/profile_update">
            <button className="badge bg-success">
              <FaPenAlt /> Edit Profile
            </button>
          </Link>
        </span>
      </h5>
      <div className="row">
        <div className="col-md-12 py-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="row">
                <div className="col-xl-2 col-4">Email:</div>
                <div className="col-xl-10 col-8">
                  <strong>{user?.email}</strong>
                </div>
                <div className="col-xl-2 col-4">Phone:</div>
                <div className="col-xl-10 col-8">
                  <strong>{user?.phoneNumber}</strong>
                </div>
                <div className="col-xl-2 col-4">Address:</div>
                <div className="col-xl-10 col-8">
                  <strong>
                    {user?.areas?.areaName}, {user?.districts?.districtName}
                  </strong>
                </div>
                <div className="col-xl-2 col-4">Gender:</div>
                <div className="col-xl-10 col-8">
                  <strong>{user?.gender}</strong>
                </div>
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
                <Image src={appliedIcon} alt="verify" height={80} width={80} />
              </div>
              <div className="h-100 col-8">
                <h6>Total Earnings</h6>

                <h3>
                  {user?.withdraw || user?.due
                    ? parseInt(user?.withdraw ? user?.withdraw : 0) +
                      parseInt(user?.due ? user?.due : 0)
                    : 0}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 py-3">
          <div className="card h-100">
            <div className="row card-body">
              <div className="col-4 item-center text-center">
                <Image src={confirmIcon} alt="verify" height={80} width={80} />
              </div>
              <div className="h-100 col-8">
                <h6>Total Withdraw</h6>

                <h3>{user?.withdraw ? user?.withdraw : 0}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 py-3">
          <div className="card h-100">
            <div className="row card-body">
              <div className="col-4 item-center text-center">
                <Image src={AssignedIcon} alt="verify" height={80} width={80} />
              </div>
              <div className="h-100 col-8">
                <h6>Total Due</h6>

                <h3>{user?.due ? user?.due : 0}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h5 className="mt-10 mb-10 page-title">Payment Credential Information</h5>
      <div className="row">
        <div className="col-md-12 py-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="row">
                <div className="col-xl-3 col-6">Mobile Banking:</div>
                <div className="col-xl-9 col-6">
                  <strong>{user?.bank_type}</strong>
                </div>
                <div className="col-xl-3 col-6">Account Number:</div>
                <div className="col-xl-9 col-6">
                  <strong>{user?.acc_number}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AffHome;

AffHome.Layout = ShebaUddoktaLayout;
