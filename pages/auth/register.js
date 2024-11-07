import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { appContext } from "../_app";
import { FaCheck, FaFemale, FaMale, FaSpinner } from "react-icons/fa";
import { saveData, saveToken } from "../../services/auth/token";
import { Form } from "react-bootstrap";
import AuthLayout from "../../Layouts/AuthLayout";
import sideImg from "../../assets/vector/Mobile login-bro.svg";
import Image from "next/image";
import Checkbox from "react-custom-checkbox";
import publicApi from "../../services/publicApi";
import ReactSelect from "react-select";
import teacherImg from "../../assets/vector/teacher.png";
import studentImg from "../../assets/vector/student.png";

function Register() {
  const router = useRouter();
  const value = useContext(appContext);
  const [loading, setLoading] = useState(false);
  const [confirmPassAlert, setConfirmPassAlert] = useState(false);
  const [customStyle, setCustomStyle] = useState(false);
  const [checked, setChecked] = useState("tutor");

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]);

  const newArray = [];

  const createCustomArray = (old_array) => {
    old_array.forEach(function (item) {
      newArray.push({ label: item.areaName, value: item.areaName });
    });
  };

  const getDistricts = async (e) => {
    const response = await publicApi.get("api/district-list");
    if (response.status === 200) {
      setDistricts(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    getDistricts();
  }, []);

  const handleDistrict = async (e) => {
    e.persist();

    setAreas([]);
    setSelectedArea([]);
    setSelectedDistrict(e.target.value);

    const response = await publicApi.get(`api/area-list/${e.target.value}`);
    if (response.status === 200) {
      createCustomArray(response.data.data);
      setAreas(newArray);
    } else {
      console.log("Server Error");
    }
  };

  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirm_password: "",
    present_address: "",
    error_list: [],
  });

  const handleInput = (e) => {
    setCustomStyle(true);
    const { name, value } = e.target;
    setRegister((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const registerSubmit = async (e) => {
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
        user_type: checked,
        name: registerInput.name,
        email: registerInput.email,
        phone: registerInput.phone,
        gender: registerInput.gender,
        present_city: selectedDistrict,
        present_address: registerInput.present_address,
        password: registerInput.password,
        password_confirmation: registerInput.confirm_password,
        district: selectedDistrict,
        areas: selectedArea,
      };

      if (registerInput.password !== registerInput.confirm_password) {
        setConfirmPassAlert(true);
        setRegister((prev) => {
          return { ...prev, password: "", confirm_password: "" };
        });
        setLoading(false);
      } else {
        setConfirmPassAlert(false);

        if (checked === "tutor") {
          const response = await publicApi.post("api/register258", data);

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

            if (response.data.user_type == "tutor") {
              router.push("/profile/update");
            } else if (response.data.user_type == "student") {
              alert(response.data.user_type);
            }
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
            setRegister({
              ...registerInput,
              error_list: response.data.validation_errors,
            });
          }
        } else if (checked === "student") {
          const response = await publicApi.post("api/stu_register", data);

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
          } else {
            setLoading(false);
            setRegister({
              ...registerInput,
              error_list: response.data.validation_errors,
            });
          }
        }
      }
    }
  };

  const handleCheckbox = (value) => {
    setChecked(value);
  };

  const formSection = (
    <Form onSubmit={registerSubmit} className="mt-20">
      {checked == "tutor" ? (
        <>
          <div className="form-group row">
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label" htmlFor="input-1">
                  নাম <span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleInput}
                  value={registerInput.name}
                  placeholder="Name..."
                />
                <p className="text-danger ">
                  {registerInput?.error_list?.name}
                </p>
              </div>
            </div>

   

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="input-2">
                  ইমেইল <span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleInput}
                  value={registerInput.email}
                  placeholder="ex: user@gmail.com"
                />
                <p className="text-danger ">
                  {registerInput?.error_list?.email}
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="input-2">
                  ফোন <span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  id="phone"
                  name="phone"
                  placeholder="ex: 01........"
                  maxLength="11"
                  pattern="0+1+[0-9]{9,}"
                  title="Enter 11 Digit Phone Number (01...)"
                  type="text"
                  onChange={handleInput}
                  value={registerInput.phone}
                />
                <p className="text-danger ">
                  {registerInput?.error_list?.phone}
                </p>
              </div>
            </div>

            {/* <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="input-4">
                  Tuition District <span className="required">*</span>
                </label>
                <Form.Select
                  name="districts"
                  className=""
                  onChange={handleDistrict}
                >
                  <option className="" value="" disabled selected>
                    Select District
                  </option>
                  {districts.map((district, i) => (
                    <option key={i} value={district.id}>
                      {district.districtName}
                    </option>
                  ))}
                  ;
                </Form.Select>
                <p className="text-danger ">
                  {registerInput?.error_list?.district}
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="input-4">
                  Your Location <span className="required">*</span>
                </label>
                <Form.Select
                  name="present_address"
                  className=""
                  onChange={handleInput}
                >
                  <option className="" value="" disabled selected>
                    Select Area
                  </option>
                  {areas.map((area, i) => (
                    <option key={i} value={area.value}>
                      {area.value}
                    </option>
                  ))}
                  ;
                </Form.Select>
                <p className="text-danger ">
                  {registerInput?.error_list?.present_address}
                </p>
                <small id="emailHelp" className="form-text text-muted">
                  Set your current location.
                </small>
              </div>
            </div>

            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label" htmlFor="input-5">
                  Preferred Tuition Area <span className="required">*</span>
                </label>

                <ReactSelect
                  options={areas}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  onChange={setSelectedArea}
                  allowSelectAll={true}
                  value={selectedArea}
                />

                <p className="text-danger ">
                  {registerInput?.error_list?.areas}
                </p>

                <small id="emailHelp" className="form-text text-muted">
                  Set your preferred tuition area.
                </small>
              </div>
            </div> */}
          </div>

          <div className="form-group row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="input-4">
                  পাসওয়ার্ড <span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleInput}
                  value={registerInput.password}
                  placeholder="Password"
                />
                <p className="text-danger ">
                  {registerInput?.error_list?.password}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="input-5">
                 পুনঃ পাসওয়ার্ড দিন <span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  id="rePassword"
                  type="password"
                  onChange={handleInput}
                  name="confirm_password"
                  value={registerInput.confirm_password}
                  onClick={() => {
                    setCustomStyle(true);
                  }}
                  placeholder="Re-enter Password..."
                />
                {confirmPassAlert ? (
                  <p className="text-danger">Password Mismatched!</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="form-group row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="input-2">
                  ্নাম <span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  onChange={handleInput}
                  value={registerInput.name}
                  placeholder="Name..."
                />
                <p className="text-danger ">
                  {registerInput?.error_list?.name}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="input-2">
                  ফোন <span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  id="phone"
                  type="text"
                  name="phone"
                  onChange={handleInput}
                  value={registerInput.phone}
                  placeholder="Phone..."
                />
                <p className="text-danger ">
                  {registerInput?.error_list?.phone}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="input-4">
                  পাসওয়ার্ড <span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleInput}
                  value={registerInput.password}
                  placeholder="Password"
                />
                <p className="text-danger ">
                  {registerInput?.error_list?.password}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label" htmlFor="input-5">
                  Re-Password <span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  id="rePassword"
                  type="password"
                  onChange={handleInput}
                  name="confirm_password"
                  value={registerInput.confirm_password}
                  onClick={() => {
                    setCustomStyle(true);
                  }}
                  placeholder="Re-enter Password..."
                />
                {confirmPassAlert ? (
                  <p className="text-danger">পাসওয়ার্ড ভুল!</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="form-group">
        {loading ? (
          <button className="btn-brand-1 hover-up w-100" type="submit" disabled>
            <FaSpinner icon="spinner" className="spinner" /> &nbsp; Loading...
          </button>
        ) : (
          <button className="btn-brand-1 hover-up w-100" type="submit">
            রেজিস্টার করুন
          </button>
        )}
      </div>
      <div className="text-muted text-center">
        ইতিমধ্যে একাউন্ট আছে?{" "}
        <Link href="/auth/login">
          <a href="page-signin.html">সাইন ইন করুন</a>
        </Link>
      </div>
    </Form>
  );

  return (
    <section className="section-box">
      <div className="container mb-hide">
        <div className="row">
          <div className="col-md-6 item-center">
            <div className="shape-1 mt-50">
              <Image src={sideImg} alt="svg" />
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="card px-5 py-3 mb-3 form-find mt-10 wow animate__animated animate__fadeIn "
              data-wow-delay=".2s"
            >
              <h4 className="headline text-center py-3">রেজিস্টার</h4>

              {formSection}
            </div>
          </div>
        </div>
      </div>

      <div className="container pc-hide">
        <div className="row">
          <div className="col-md-6">
            <div
              className=" py-3 form-find mt-20 wow animate__animated animate__fadeIn "
              data-wow-delay=".2s"
            >
              <h4 className="headline text-center">Register</h4>

              <div
                className="row my-2"
                style={{ padding: "8px 0px", background: "#e0e6f6" }}
              >
                <div className="col-6 py-2">
                  <div
                    onClick={() => handleCheckbox("tutor")}
                    className={
                      checked == "tutor" ? `custom-checkbox` : `custom-checkbox`
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

                <div className="col-6 py-2">
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

              {formSection}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Register.Layout = AuthLayout;

export default Register;
