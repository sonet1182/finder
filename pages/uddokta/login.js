import React, { useContext, useState } from "react";
import MasterLayout from "../../Layouts/MasterLayout";
import Meta from "../../components/Meta/Meta";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { saveData, saveToken } from "../../services/auth/token";
import { appContext } from "../_app";

function AffiliateLogin() {
  const router = useRouter();
  const value = useContext(appContext);
  const [loading, setLoading] = useState(false);


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

      setLoading(true);

      const data = {
        email: loginInput.email,
        password: loginInput.password,
      };

      axios.get("/sanctum/csrf-cookie").then((res) => {
        axios.post(`/api/aff_login`, data).then((response) => {
          if (response.data.status === 200) {
            value.setUserData(response.data.data);
            saveToken(response.data.api_token);
            saveData(JSON.stringify(response.data.data), response.data.notification, response.data.user_type);
            setLoading(false);
            toast.success("Logged in Successfully!", {
              position: "top-right",
              autoClose: 500,
              hideProgressBar: true,
              closeOnClick: true,
            });
            router.push("/uddokta/home");
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
    
  };

  return (
    <>
      <Meta title="Tutor Request | Khuje Now" />
      <main className="name">
        <section className="section-box mt-20 mb-20">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto card p-4 shadow">
                <h3 className="mt-5 mb-10 text-center text-purple">
                  Login as Affiliate Partner
                </h3>

                <form
                  className="mt-20"
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
                    <Link href="/auth/forget_password" className="text-muted">
                      Forgot Password
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
                          Login
                        </h6>
                      </button>
                    )}
                  </div>

                  <div className="text-center">
                    <Link href="/uddokta/register" className="text-center">
                      Click here to Uddokta Sign Up
                    </Link>
                  </div>
                </form>
                <p className="form-messege"></p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

AffiliateLogin.Layout = MasterLayout;

export default AffiliateLogin;
