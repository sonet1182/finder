import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import Meta from "../../components/Meta/Meta";
import publicApi from "../../services/publicApi";
import { useEffect } from "react";
import swal from "sweetalert";
import ShebaUddoktaLayout from "./ShebaUddoktaLayout";
import { appContext } from "../_app";

function GenerateLead() {
  const value = useContext(appContext);

  const [errors, setErrors] = useState();

  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]);

  const [mediums, setMediums] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState("");

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const newArray = [];

  const createCustomArray = (old_array) => {
    old_array.forEach(function (item) {
      newArray.push({ label: item.areaName, value: item.areaName });
    });
  };

  const handleDistrict = async (e) => {
    e.persist();

    setAreas([]);
    setSelectedArea([]);

    setSelectedDistrict(e.target.value);

    const response = await publicApi.get(`api/area-list/${e.target.value}`);
    if (response.status === 200) {
      // createCustomArray(response.data.data);
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
    getMediums();
    getDistricts();
  }, []);

  const getMediums = async (e) => {
    const response = await publicApi.get("api/medium-list");
    if (response.status === 200) {
      setMediums(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const handleMedium = async (e) => {
    e.persist();

    setSelectedMedium(e.target.value);
    const response = await publicApi.get(`api/class-list/${e.target.value}`);
    if (response.status === 200) {
      setClasses(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const handleClass = async (e) => {
    e.persist();
    setSelectedClass(e.target.value);
  };

  const submitHandler = async (e) => {
    setErrors();
    e.preventDefault();

    const data = {
      s_fullName: studentName,
      s_phoneNumber: studentPhone,
      s_districts: selectedDistrict,
      s_area: selectedArea,
      s_medium: selectedMedium,
      s_class: selectedClass,
    };

    const response = await publicApi.post(`api/partner/lead_generate`, data);
    if (response.data.status == 200) {
      swal("Welcome",response.data.message,"success");

      setStudentName('');
      setStudentPhone('');
      setSelectedArea([]);
      setSelectedDistrict([]);
      setMediums([]);
      setClasses([]);

    } else {
      setErrors(response.data.message);
      swal("Welcome",response.data.message,"error");
    }
  };

  return (
    <>
      <Meta title="Tutor Request | Khuje Now" />
      <main className="name">
        <section className="section-box mt-20 mb-50">
          <div className="container">
            <div className="">
              <div className="mb-40">
              <h3 className="mt-10 mb-10 page-title">Generate New Lead</h3>

                {errors?.s_fullName && <div className="alert alert-danger">{errors.s_fullName}</div>}
                {errors?.s_phoneNumber && <div className="alert alert-danger">{errors.s_phoneNumber}</div>}
                {errors?.s_districts && <div className="alert alert-danger">{errors.s_districts}</div>}
                {errors?.s_area && <div className="alert alert-danger">{errors.s_area}</div>}


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
                          Guardian/Student Name <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="name"
                          placeholder="Enter your name"
                          type="text"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                        Guardian/Student Phone <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="phone"
                          placeholder="Phone"
                          type="text"
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          Select Medium <span className="required">*</span>
                        </label>
                        <Form.Select
                          name="medium"
                          className="form-control medium single-select"
                          onChange={handleMedium}
                          value={selectedMedium}
                        >
                          <option value="">Select Medium</option>
                          {mediums.map((medium, i) => (
                            <option key={i} value={medium.id}>
                              {medium.mediumName}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          Select Class <span className="required">*</span>
                        </label>
                        <Form.Select
                          name="class"
                          className="form-control class single-select"
                          onChange={handleClass}
                          value={selectedClass}
                        >
                          <option value="">Choose One</option>
                          {classes.map((s_class, i) => (
                            <option key={i} value={s_class.className}>
                              {s_class.className}
                            </option>
                          ))}
                        </Form.Select>
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
                            <option key={i} value={area.areaName}>
                              {area.areaName}
                            </option>
                          ))}
                          ;
                        </Form.Select>
                      </div>
                    </div>
                    
                    <div className="col-md-12">
                      <button
                        className="submit btn btn-send-message px-4 mt-5"
                        type="submit"
                      >
                        Submit
                      </button>
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

GenerateLead.Layout = ShebaUddoktaLayout;

export default GenerateLead;
