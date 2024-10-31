import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import Meta from "../../components/Meta/Meta";
import PrivateLayout from "../../Layouts/PrivateLayout";

export default function ProfileSecurity() {
  const [loading, setLoading] = useState(false);
  const [rePasswordError, setRePasswordError] = useState("");
  const [loginInput, setLogin] = useState({
    oldPassword: "",
    password: "",
    rePassword: "",
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

    if (
      loginInput.password != "" &&
      loginInput.password != loginInput.rePassword
    ) {
      setRePasswordError("Password Mismatched!");
    } else {
      setLoading(true);

      const data = {
        old_password: loginInput.oldPassword,
        new_password: loginInput.password,
      };

      axios.get("/sanctum/csrf-cookie").then((res) => {
        axios.post(`/api/update_password`, data).then((response) => {
          if (response.data.status === 200) {
            setLoading(false);
            setLogin({
              oldPassword: "",
              password: "",
              rePassword: "",
              error_list: [],
            });
            toast.success("Your password is updated Successfully!", {
              position: "top-right",
              autoClose: 500,
              hideProgressBar: true,
              closeOnClick: true,
            });
          } else if (response.data.status === 202) {
            setLoading(false);
            toast.error(response.data.message, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
            });
            setLogin({
              ...loginInput,
              oldPassword: "",
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

  return (
    <>
      <Meta title="Payment Section | Khuje Now" />

      <div className="">
        <div className="bg-info mt-3 py-2 pl-2">
          <h5 className="text-title text-white px-4">Security</h5>
        </div>

        <div className="row justify-content-md-center">
          <div className="col-md-9">
            <div className="card mt-20 mb-10">
              <div className="card-header gradient_bg mb-2">
                <h5 className="text-white">Change Password</h5>
              </div>

              <form className="p-3" onSubmit={loginSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Old password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="oldPassword"
                    placeholder="Old password"
                    onChange={handleInput}
                    value={loginInput.oldPassword}
                  />
                  <b className="text-danger ">
                    {loginInput.error_list?.old_password}
                  </b>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">New password</label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="New password"
                    onChange={handleInput}
                    value={loginInput.password}
                  />
                  <b className="text-danger ">
                    {loginInput.error_list?.new_password}
                  </b>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Confirm password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    name="rePassword"
                    placeholder="confirm password"
                    onChange={handleInput}
                    value={loginInput.rePassword}
                  />
                  <b className="text-danger ">{rePasswordError}</b>
                </div>
                {/* <button className="btn btn-1 gradient_bg pull-right text-light px-5">
                  Submit
                </button> */}

                {loading ? (
                  <button
                    className="btn btn-1 gradient_bg pull-right text-light px-5"
                    disabled
                    type="submit"
                  >
                    <FaSpinner icon="spinner" className="spinner" /> &nbsp;
                    Loading...
                  </button>
                ) : (
                  <button
                    className="btn btn-1 gradient_bg pull-right text-light px-5"
                    type="submit"
                  >
                    <h6 className="text-light">Submit</h6>
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ProfileSecurity.Layout = PrivateLayout;
