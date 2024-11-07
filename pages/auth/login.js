import axios from "axios";
import Link from "next/link";
import React from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { appContext } from "../_app";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { saveData, saveToken } from "../../services/auth/token";
import sideImg from "../../assets/vector/Computer login-amico.svg";
import teacherImg from "../../assets/vector/teacher.png";
import studentImg from "../../assets/vector/student.png";
import Image from "next/image";
import Checkbox from "react-custom-checkbox";

function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState("");
  const value = useContext(appContext);

  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({
      ...loginInput,
      [e.target.name]: e.target.value,
      error_list: [],
    });
  };

  const tutorLogin = (data) => {
    axios.post(`/api/login`, data).then((response) => {
      if (response.data.status === 200) {
        saveToken(response.data.api_token);
        saveData(
          JSON.stringify(response.data.data),
          response.data.notification,
          response.data.user_type
        );

        value.setUserData(response.data.data);
        setLoading(false);

        toast.success("Logged in Successfully!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
        });
        router.push("/profile");
      } else if (response.data.status === 401) {
        setLoading(false);
        toast.warning(response.data.message, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
        });
      } else {
        setLoading(false);
        toast.error("Something Error Happened!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
        });
        setLogin({
          ...loginInput,
          error_list: response.data.validation_errors,
        });
      }
    });
  };

  const studentLogin = (data) => {
    axios.post(`/api/stu_login`, data).then((response) => {
      if (response.data.status === 200) {
        saveToken(response.data.api_token);
        saveData(
          JSON.stringify(response.data.data),
          response.data.notification,
          response.data.user_type
        );

        value.setUserData(response.data.data);
        setLoading(false);

        toast.success("Logged in Successfully!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
        });
        router.push("/student/profile");
      } else if (response.data.status === 401) {
        setLoading(false);
        toast.warning(response.data.message, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
        });
      } else {
        setLoading(false);
        toast.error("Something Error Happened!", {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
        });
        setLogin({
          ...loginInput,
          error_list: response.data.validation_errors,
        });
      }
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    if (checked == "") {
      toast.error("Please Select User Type", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
      });
    } else {
      setLoading(true);

      const data = {
        email: loginInput.email,
        password: loginInput.password,
      };

      if (checked == "tutor") {
        tutorLogin(data);
      } else if (checked == "student") {
        studentLogin(data);
      }
    }
  };

  const handleCheckbox = (value) => {
    {
      checked == value ? setChecked("") : setChecked(value);
    }
  };

  return (
    <>
      <section className="section-box">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-hide">
              <div className="text-center d-lg-block shape-1 mt-50">
                <Image src={sideImg} alt="svg" />
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="card px-4 py-3 form-find mt-10 mb-10 wow animate__animated animate__fadeIn "
                data-wow-delay=".2s"
              >
                <div className="text-center headline py-3">
                  <h3>Khuje Now - তে আপনাকে স্বাগতম</h3>
                  <h5>আপনার একাউন্ট পরিচালনা করতে লগ ইন করুন</h5>
                </div>

                {/* <h4 className="headline text-center py-3">লগ ইন</h4> */}

                <form className="mt-20" onSubmit={loginSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="input-1">
                      ইমেইল / ফোন *
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      onChange={handleInput}
                      value={loginInput.email}
                    />
                    <b className="text-danger ">
                      {loginInput.error_list?.email}
                    </b>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="input-4">
                      পাসওয়ার্ড *
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={handleInput}
                      value={loginInput.password}
                    />
                    <b className="text-danger ">
                      {loginInput.error_list?.password}
                    </b>
                  </div>
                  <div className="login_footer form-group d-flex justify-content-between">
                    <label className="cb-container">
                      <input type="checkbox" />
                      <span className="text-small">মনে রাখুন</span>
                      <span className="checkmark"></span>
                    </label>
                    <Link href="/auth/forget_password" className="text-muted">
                      পাসওয়ার্ড ভুলে গেলে এখানে ক্লিক করুন
                    </Link>
                  </div>

                  <div className="form-group">
                    {loading ? (
                      <button
                        className=" btn-brand-1 hover-up w-100"
                        disabled
                        type="submit"
                      >
                        <FaSpinner icon="spinner" className="spinner" /> &nbsp;
                        Loading...
                      </button>
                    ) : (
                      <button
                        className=" btn-brand-1 hover-up w-100"
                        type="submit"
                      >
                        <h6 className="text-light">
                          সাবমিট
                        </h6>
                      </button>
                    )}
                  </div>

                  <div className="text-center">
                    <Link href="/auth/register" className="text-center text-primary">
                      রেজিস্টার করতে এখানে ক্লিক করুন
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Login.Layout = AuthLayout;

export default Login;
