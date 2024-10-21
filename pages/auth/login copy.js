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

      axios.get("/sanctum/csrf-cookie").then((res) => {
        axios.post(`/api/login`, data).then((response) => {
          if (response.data.status === 200) {
            saveToken(response.data.api_token);
            saveData(JSON.stringify(response.data.data));

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
          <div className="row">
            <div className="col-md-6 mb-hide">
              <div className="text-center d-lg-block shape-1 mt-50">
                <Image src={sideImg} alt="svg" />
              </div>
            </div>
            <div className="col-md-6">
              <div
                className=" card px-5 py-3 form-find mt-40 wow animate__animated animate__fadeIn "
                data-wow-delay=".2s"
              >
                <h4 className="headline text-center py-3">Login</h4>

                <div className="row my-3">
                  {/* <div className="col-6">
                    <span onClick={() => handleCheckbox("tutor")} className={checked == "tutor" ? `custom-checkbox neomp2` : `custom-checkbox neomp_up_sm`}>
                       <Checkbox
                        checked={checked == "tutor" ? true : false}
                        value="tutor"
                        icon={
                          <div
                            style={{
                              display: "flex",
                              // flex: 1,
                              color: "#174A41",
                              alignSelf: "stretch",
                            }}
                          >
                            <FaCheck color="#6c2a8c" size={18} />
                          </div>
                        }
                        borderColor="#6c2a8c"
                        // borderRadius={10}
                        size={22}
                        label={<h6>Tutor</h6>}
                      /> 
                    </span>
                  </div>
                  <div className="col-6">
                    <span onClick={() => handleCheckbox("student")} className={checked == "student" ? `custom-checkbox neomp2` : `custom-checkbox neomp_up_sm`}>
                      <Checkbox
                        checked={checked == "student" ? true : false}
                        value="student"
                        icon={
                          <div
                            style={{
                              display: "flex",
                              flex: 1,
                              color: "#174A41",
                              alignSelf: "stretch",
                            }}
                          >
                            <FaCheck color="#6c2a8c" size={18} />
                          </div>
                        }
                        borderColor="#6c2a8c"
                        // borderRadius={10}
                        size={22}
                        label={<h6>Student</h6>}
                      />
                    </span>
                  </div> */}

                  <div className="col-md-6">
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
                        height={60}
                        width={60}
                      />
                      <div className="ml-10 item-center">
                      <Checkbox
                        checked={checked == "tutor" ? true : false}
                        value="tutor"
                        icon={
                          <div
                            style={{
                              display: "flex",
                              // flex: 1,
                              color: "#174A41",
                              alignSelf: "stretch",
                            }}
                          >
                            <FaCheck color="#6c2a8c" size={18} />
                          </div>
                        }
                        borderColor="#6c2a8c"
                        // borderRadius={10}
                        size={22}
                        label={<h6>Tutor</h6>}
                      /> 
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
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
                        alt="student"
                        height={60}
                        width={60}
                      />
                      <div className="ml-10 item-center">
                      <Checkbox
                        checked={checked == "student" ? true : false}
                        value="student"
                        icon={
                          <div
                            style={{
                              // display: "flex",
                              // flex: 1,
                              color: "#174A41",
                              alignSelf: "center",
                            }}
                          >
                            <FaCheck color="#6c2a8c" size={18} />
                          </div>
                        }
                        borderColor="#6c2a8c"
                        // borderRadius={10}
                        size={22}
                        label={<h6 className="text-center">Student</h6>}
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
                      Email or Phone *
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
                      Password *
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
                      <span className="text-small">Remenber me</span>
                      <span className="checkmark"></span>
                    </label>
                    <a className="text-muted" href="page-contact.html">
                      Forgot Password
                    </a>
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
                          Login {checked != "" && `in as a ${checked}`}
                        </h6>
                      </button>
                    )}
                  </div>

                  <h6 className="text-center">
                    <Link href="/auth/register" className="text-center">
                      Click here to Register
                    </Link>
                  </h6>
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
