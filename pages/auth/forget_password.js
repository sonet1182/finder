import axios from "axios";
import { useContext, useState } from "react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { appContext } from "../_app";
import { FaCheck, FaSpinner } from "react-icons/fa";
import AuthLayout from "../../Layouts/AuthLayout";
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
    phone: "",
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
        phone: loginInput.phone,
        type: checked,
      };

      axios.get("/sanctum/csrf-cookie").then((res) => {
        axios.post(`/api/reset_password_req`, data).then((response) => {
          if (response.data.status === 200) {
            setLoading(false);
            toast.success(response.data.message, {
              position: "top-right",
              autoClose: 500,
              hideProgressBar: true,
              closeOnClick: true,
            });
            // router.push("/auth/recover_password");
            router.push({
              pathname: "/auth/recover_password",
              query: response.data.data,
            });
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
            setLogin({
              ...loginInput,
              error_list: response.data.validation_errors,
            });
          }
        });
      });
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
          <div className="row d-flex">
            <div className="col-md-6 mx-auto">
              <div
                className="card px-4 py-3 form-find mt-10 mb-10 wow animate__animated animate__fadeIn "
                data-wow-delay=".2s"
              >
                <h4 className="headline text-center py-3">Recover Password</h4>

                <div
                  className="row my-3"
                  style={{ padding: "8px 0px", background: "#e0e6f6" }}
                >
                  <div className="col-6">
                    <div
                      onClick={() => handleCheckbox("tutor")}
                      className={
                        checked == "tutor"
                          ? `custom-checkbox`
                          : `custom-checkbox`
                      }
                    >
                      <Image
                        src={teacherImg}
                        alt="teacher"
                        height={50}
                        width={50}
                      />
                      <div className="ml-10 item-center">
                        <Checkbox
                          checked={checked == "tutor" ? true : false}
                          value="tutor"
                          icon={
                            <div
                              style={{
                                display: "flex",
                                color: "#174A41",
                                alignSelf: "stretch",
                              }}
                            >
                              <FaCheck color="#6c2a8c" size={18} />
                            </div>
                          }
                          borderColor="#6c2a8c"
                          size={22}
                          label={<span>Tutor</span>}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div
                      onClick={() => handleCheckbox("student")}
                      className={
                        checked == "student"
                          ? `custom-checkbox`
                          : `custom-checkbox`
                      }
                    >
                      <Image
                        src={studentImg}
                        alt="teacher"
                        height={50}
                        width={50}
                      />
                      <div className="ml-10 item-center">
                        <Checkbox
                          checked={checked == "student" ? true : false}
                          value="student"
                          icon={
                            <div
                              style={{
                                color: "#174A41",
                                alignSelf: "center",
                              }}
                            >
                              <FaCheck color="#6c2a8c" size={18} />
                            </div>
                          }
                          borderColor="#6c2a8c"
                          size={22}
                          label={<span className="text-center">Student</span>}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <form
                  className="login-register text-start mt-20"
                  onSubmit={loginSubmit}
                >
                  <div className="form-group">
                    <label className="form-label" htmlFor="input-1">
                      Enter Phone *
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      onChange={handleInput}
                      value={loginInput.phone}
                    />

                    <b className="text-danger ">
                      {loginInput.error_list?.phone}
                    </b>
                    <br></br>

                    <small>
                      Enter the phone number by which your account was
                      registered.
                    </small>
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
                          Submit {checked != "" && `in as a ${checked}`}
                        </h6>
                      </button>
                    )}
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
