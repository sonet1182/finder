import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import publicApi from "../../../services/publicApi";
import MasterLayout from "../../../Layouts/MasterLayout";
import { FaPaperPlane } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import PostCard from "../../../components/PostDetailsComponent/PostCard";
import PostSuggestion from "../../../components/PostDetailsComponent/PostSuggestion";

function TuitionDetails(req) {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [tuition, setTuition] = useState([]);
  const [appAble, setAppAble] = useState(false);
  const [accProgress, setAccProgress] = useState(null);
  const [applied, setApplied] = useState(null);

  const url = process.env.domain;
  const [src, setSrc] = useState("");

  const fetchTutorData = async (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const response = await publicApi.get(`api/tuition_details/${id}`);

    if (response.status === 200) {
      setTuition(response.data.data);
      setAccProgress(response.data.acc_progress);
      setApplied(response.data.tuition_request);
      setLoading(true);
    } else {
      console.log("Server Error");
    }
  };

  const tuitionApply = async (e) => {
    const data = {
      student_id: tuition?.id,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("api/tutor/tuition_apply", data).then((res) => {
        if (res.status === 200) {
          if (res.data.status == "success") {
            setAppAble(3);
            toast.success(res.data.message, {
              position: "top-right",
              autoClose: 6000,
              closeOnClick: true,
            });
          } else if (res.data.status == "sorry") {
            toast.error(res.data.message, {
              position: "top-right",
              autoClose: 6000,
              closeOnClick: true,
            });
          } else if (res.data.status == "already") {
            toast.info(res.data.message, {
              position: "top-right",
              autoClose: 6000,
              closeOnClick: true,
            });
          }
        } else {
          toast.error("Server Problem !", {
            position: "top-right",
            autoClose: 6000,
            closeOnClick: true,
          });
        }
      });
    });
  };

  useEffect(() => {
    fetchTutorData(id);
    if (accProgress != null) {
      if (accProgress >= 80) {
        if (applied) {
          setAppAble(3);
        } else {
          setAppAble(2);
        }
      } else {
        setAppAble(1);
      }
    } else {
      setAppAble(0);
    }
  }, [id, accProgress, applied]);

  const applyBtn = (
    <>
      {appAble == 0 ? (
        <Link href="/auth/login">
          <button type="submit" className="btn btn-outline-primary mb-2 w-100">
            <FaPaperPlane /> Login then apply this job
          </button>
        </Link>
      ) : appAble == 1 ? (
        <>
          <h6 className="text-danger text-center">
            Account Progress 80% is Required!
          </h6>

          <Link href={"/profile/update"}>
            <button className="btn btn-outline-info mb-2 w-100">
              Upgrade Account
            </button>
          </Link>
        </>
      ) : appAble == 2 ? (
        <div className="w-100 text-center">
          <a
            onClick={tuitionApply}
            className="animated-button1 text-light link"
            style={{ padding: "5px 30px" }}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Apply Now
          </a>
        </div>
      ) : appAble == 3 ? (
        <button className="btn btn-outline-success mb-2 w-100" disabled>
          Already Applied
        </button>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <>
      <PostCard />
      <PostSuggestion/>
    </>
  );
}

TuitionDetails.Layout = MasterLayout;

export default TuitionDetails;
