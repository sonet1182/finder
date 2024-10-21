import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { appContext } from "../_app";
import { FaCheck, FaSpinner } from "react-icons/fa";
import AuthLayout from "../../Layouts/AuthLayout";
import { saveData, saveToken } from "../../services/auth/token";

function RecoverPassword() {
  const router = useRouter();
  const [otpInput, setOtpInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [otpError, setOtpError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const value = useContext(appContext);


  const [loginInput, setLogin] = useState({
    otp: "",
    password: "",
    rePassword: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setOtpError("");
    setLogin({
      ...loginInput,
      [e.target.name]: e.target.value,
      error_list: [],
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    if (
      loginInput.password != "" &&
      loginInput.password != loginInput.rePassword
    ) {
      setRePasswordError("Password Mismatched!");
    } else {
      setLoading(true);

      const data = {
        phone: user.phoneNumber,
        password: loginInput.password,
      };

      axios.get("/sanctum/csrf-cookie").then((res) => {
        axios.post(`/api/reset_password`, data).then((response) => {
          if (response.data.status === 200) {
            setLoading(false);
            toast.success("Your password is updated Successfully!", {
              position: "top-right",
              autoClose: 500,
              hideProgressBar: true,
              closeOnClick: true,
            });

            saveToken(response.data.api_token);
            saveData(JSON.stringify(response.data.data), response.data.notification, response.data.user_type);

            value.setUserData(response.data.data);
            // value?.setNotification(response.data.notification);

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

  const otpSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if(loginInput.otp != "" && loginInput.otp == user.otp)
    {
      toast.success("OTP Matched Successfully!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
      });
      setOtpInput(false);
      setLoading(false);
    }else{
      setLogin({
        ...loginInput,
        otp: "",
      });
      setOtpError("Your OTP is invalid!");
      setLoading(false);
    }
  }

  useEffect(() => {
    setUser(router.query);
  }, [router.query]);

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
                  <h5 className="text-center">
                    An otp has been send to {user.phoneNumber}
                  </h5>
                </div>

                {otpInput ? (
                  <form
                    className="login-register text-start mt-20"
                    onSubmit={otpSubmit}
                  >
                    <div className="form-group">
                      <label className="form-label text-center" htmlFor="input-1">
                        <div className="text-center">Enter 4 digit OTP Here <span className="required">*</span></div>
                      </label>

                      <input
                        type="text"
                        className="form-control text-center"
                        name="otp"
                        maxLength = "4" 
                        onChange={handleInput}
                        value={loginInput.otp}
                      />
                      <b className="text-danger">{otpError}</b>
                    </div>

                    
                    <div className="form-group">
                      {loading ? (
                        <button
                          className=" btn-brand-1 hover-up w-100"
                          disabled
                          type="submit"
                        >
                          <FaSpinner icon="spinner" className="spinner" />{" "}
                          &nbsp; Loading...
                        </button>
                      ) : (
                        <button
                          className=" btn-brand-1 hover-up w-100"
                          type="submit"
                        >
                          <h6 className="text-light">Submit</h6>
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  <form
                    className="login-register text-start mt-20"
                    onSubmit={loginSubmit}
                  >
                    <div className="form-group">
                      <label className="form-label" htmlFor="input-1">
                        Enter New Password <span className="required">*</span>
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

                    <div className="form-group">
                      <label className="form-label" htmlFor="input-1">
                        Re-enter New Password{" "}
                        <span className="required">*</span>
                      </label>

                      <input
                        type="password"
                        className="form-control"
                        name="rePassword"
                        onChange={handleInput}
                        value={loginInput.rePassword}
                      />

                      <b className="text-danger ">{rePasswordError}</b>
                    </div>

                    <div className="form-group">
                      {loading ? (
                        <button
                          className=" btn-brand-1 hover-up w-100"
                          disabled
                          type="submit"
                        >
                          <FaSpinner icon="spinner" className="spinner" />{" "}
                          &nbsp; Loading...
                        </button>
                      ) : (
                        <button
                          className=" btn-brand-1 hover-up w-100"
                          type="submit"
                        >
                          <h6 className="text-light">Submit</h6>
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

RecoverPassword.Layout = AuthLayout;

export default RecoverPassword;
