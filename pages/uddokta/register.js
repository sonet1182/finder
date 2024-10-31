import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import MasterLayout from "../../Layouts/MasterLayout";
import Meta from "../../components/Meta/Meta";
import publicApi from "../../services/publicApi";
import { useEffect } from "react";
import swal from "sweetalert";
import { appContext } from "../_app";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { saveData, saveToken } from "../../services/auth/token";
import { useRouter } from "next/router";

function AffiliateRegister() {
  const value = useContext(appContext);

  const router = useRouter();

  const [errors, setErrors] = useState();

  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]);

  const [loading, setLoading] = useState(false);
  const [confirmPassAlert, setConfirmPassAlert] = useState(false);

  const handleDistrict = async (e) => {
    e.persist();

    setAreas([]);
    setSelectedArea([]);
    setSelectedDistrict(e.target.value);

    const response = await publicApi.get(`api/area-list/${e.target.value}`);
    if (response.status === 200) {
      setAreas(response.data.data);
    } else {
      console.log("Server Error");
    }
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

  const submitHandler = async (e) => {
    setLoading(true);

    setErrors();
    e.preventDefault();

    const data = {
      name: studentName,
      phone: studentPhone,
      district: selectedDistrict,
      area: selectedArea,
      gender: gender,
      email: email,
      password: pass,
    };

    if (pass !== repass) {
      setConfirmPassAlert(true);
      setPass("");
      setRepass("");
      setLoading(false);
    } else {
      setConfirmPassAlert(false);

      const response = await publicApi.post(`api/aff_register`, data);
      if (response.data.status == 200) {
        value.setUserData(response.data.data);
        setLoading(false);
        swal("Welcome", response.data.message, "success");


        setStudentName("");
        setStudentPhone("");
        setEmail("");
        setGender("");
        setPass("");
        setRepass("");
        setSelectedArea([]);
        setSelectedDistrict([]);

        saveToken(response.data.api_token);
        saveData(JSON.stringify(response.data.data), response.data.notification, response.data.user_type);
        router.push("/uddokta/home");

      } else {
        setLoading(false);
        setErrors(response.data.message);
        swal("Welcome", response.data.message, "error");
      }
    }
  };

  return (
    <>
      <Meta title="Tutor Request | Khuje Now" />
      <main className="name">
        <section className="section-box mt-20 mb-20">
          <div className="container">
            <div className="row">
              <div className="col-lg-8  mx-auto card p-4 shadow">
                <h3 className="mt-5 mb-10 text-center">
                  Register as Affiliate Partner
                </h3>

                {errors?.name && (
                  <div className="alert alert-danger">{errors.name}</div>
                )}
                {errors?.phone && (
                  <div className="alert alert-danger">
                    {errors.phone}
                  </div>
                )}
                {errors?.districts && (
                  <div className="alert alert-danger">{errors.districts}</div>
                )}
                {errors?.area && (
                  <div className="alert alert-danger">{errors.area}</div>
                )}

                <form
                  className="contact-form-style mt-30"
                  id="contact-form"
                  onSubmit={submitHandler}
                >
                  <div
                    className="row wow animate__ animate__fadeInUp animated"
                    data-wow-delay=".1s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.1s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          Name <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="name"
                          placeholder="ex: Sakib Rahman"
                          type="text"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          Gender <span className="required">*</span>
                        </label>

                        <Form.Select
                          className="single-select"
                          onChange={(e) => setGender(e.target.value)}
                          value={gender}
                          style={{ paddingTop: "9px", paddingBottom: "9px" }}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Form.Select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          Phone Number <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          id="phone"
                          name="phone"
                          placeholder="ex: 01........"
                          maxLength="11"
                          pattern="0+1+[0-9]{9,}"
                          title="Enter 11 Digit Phone Number (01...)"
                          type="text"
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          Email <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="phone"
                          placeholder="ex: example@gmail.com"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          Select District <span className="required">*</span>
                        </label>
                        <Form.Select
                          name="districts"
                          className="form-control districts single-select"
                          onChange={handleDistrict}
                          value={selectedDistrict}
                        >
                          <option className="" value="" disabled selected>
                            Choose One
                          </option>
                          {districts.map((district, i) => (
                            <option key={i} value={district.id}>
                              {district.districtName}
                            </option>
                          ))}
                          ;
                        </Form.Select>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          Select Area <span className="required">*</span>
                        </label>
                        <Form.Select
                          name="districts"
                          className="form-control districts single-select"
                          onChange={(e) => setSelectedArea(e.target.value)}
                          value={selectedArea}
                        >
                          <option className="" value="" disabled selected>
                            Choose One
                          </option>
                          {areas.map((area, i) => (
                            <option key={i} value={area.id}>
                              {area.areaName}
                            </option>
                          ))}
                          ;
                        </Form.Select>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          Password <span className="required">*</span>
                        </label>
                        <input
                          className="form-control color-text-paragraph-2"
                          name="password"
                          type="password"
                          value={pass}
                          onChange={(e) => setPass(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          Retype Password <span className="required">*</span>
                        </label>
                        <input
                          className="form-control color-text-paragraph-2"
                          name="repassword"
                          type="password"
                          value={repass}
                          onChange={(e) => setRepass(e.target.value)}
                        />
                        {confirmPassAlert ? (
                          <p className="text-danger">Password Mismatched!</p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <label className="">
                        <input
                          className="float-start mr-5 mt-6"
                          type="checkbox"
                          required
                        />{" "}
                        By clicking contact us button, you agree our terms and
                        policy,
                      </label>
                    </div>

                    <div className="form-group mt-10">
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
                          Register
                        </h6>
                      </button>
                    )}
                  </div>

                  <div className="text-center">
                  Already Have an Account? &nbsp;
                    <Link href="/uddokta/login" className="text-center">
                      Click here to login
                    </Link>
                  </div>


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

AffiliateRegister.Layout = MasterLayout;

export default AffiliateRegister;
