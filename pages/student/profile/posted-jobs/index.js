import React, { useEffect, useState } from "react";
import PrivateLayout from "../../../../Layouts/StudentLayout";
import publicApi from "../../../../services/publicApi";
import { FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import noDataImg from "../../../../assets/vector/no_data.svg";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

export default function Profile() {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    const response = await publicApi.get(`api/student/posted-jobs`);
    if (response.status === 200) {
      setJobs(response.data.data);
      setLoader(false);
    } else {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const ApprovalBadge = ({ job }) => {
    if (job.confirmed) {
      return <span className="badge badge-pill badge-success">Confirmed</span>;
    } else if (job.assigned.length > 0) {
      return (
        <span className="badge badge-pill bg-midnight-bloom">Assigned</span>
      );
    } else {
      if (job.approval === 0) {
        return <span className="badge badge-pill bg-love-kiss">Pending</span>;
      } else if (job.approval === 1) {
        return (
          <span className="badge badge-pill bg-arielle-smile">Posted</span>
        );
      } else if (job.approval === 4) {
        return <span className="badge badge-pill bg-plum-plate">On Hold</span>;
      } else if (job.approval === 5) {
        return <span className="badge badge-pill badge-dark">Cancel</span>;
      }
    }
  };

  const tableData = (
    <>
      {jobs.map((job, index) => {
        return (
          <tr key={index}>
            <th scope="row">#{job.id}</th>
            <td>
              <h5 style={{ whiteSpace: "nowrap" }}> {job.s_fullName}</h5>
              <div
                className="widget-subheading opacity-7"
                style={{ whiteSpace: "nowrap" }}
              >
                <FaMapMarkerAlt /> {job.s_area}, &nbsp;
                {job.districts?.districtName}
              </div>
            </td>
            <td>{ApprovalBadge({ job })}</td>
            <td className="text-center">
            <Link href={`/student/profile/posted-jobs/view/${job.id}`}
                
              >
                <div className="btn btn-primary btn-sm">Details</div>
              </Link>
            </td>
          </tr>
        );
      })}
    </>
  );

  const noData = (
    <div className="row">
      <div className="col-md-6 py-3 mx-auto">
        <div className="card shadow">
          <div className="card-body">
            <div className="text-center">
              <Image
                src={noDataImg}
                alt="fb Community"
                height={250}
                width={250}
              />
              <h5>No Data Found!</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="app-main__outer">
        <div className="app-main__inner">
          <h3 className="mt-10 mb-10 page-title">Posted Jobs</h3>

          <div className="d-flex">
            <div
              onClick={() => router.push("/student/profile/tutor-request")}
              className="btn btn-sm btn-primary px-4 ml-auto"
            >
              <FaPlus /> Create new job request
            </div>
          </div>

          {loader ? (
            <Skeleton height={270} />
          ) : jobs.length > 0 ? (
            <div className="table-responsive card shadow mt-4">
              <table className="table table-striped table-hover mb-0">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Student Name</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>{tableData}</tbody>
              </table>
            </div>
          ) : (
            noData
          )}
        </div>
      </div>
    </>
  );
}

Profile.Layout = PrivateLayout;
