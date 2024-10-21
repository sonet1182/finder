import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { Form } from "react-bootstrap";
import { FaArrowRight, FaMapMarkedAlt, FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import altImg from "../../assets/images/user.webp";
import { userContext } from "../../Layouts/PrivateLayout";
import publicApi from "../../services/publicApi";
import Nvh from "../Common/Nvh";

function ShortBio({ activeTab, setActiveTab, districtList }) {
  const value = useContext(userContext);
  const pro_data = value.user?.profile_data;

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [university, setUniversity] = useState("");
  const [subject, setSubject] = useState("");
  const [degree, setDegree] = useState("");
  const [medium, setMedium] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [about, setAbout] = useState("");

  const [adPhone, setAdPhone] = useState();
  const [exPhoneOne, setExPhoneOne] = useState();
  const [exPhoneTwo, setExPhoneTwo] = useState();
  const [fatherName, setFatherName] = useState();
  const [motherName, setMotherName] = useState();
  const [fatherPhone, setFatherPhone] = useState();
  const [motherPhone, setMotherPhone] = useState();

  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const handleDistrict = async (e) => {
    setAreas([]);
    setSelectedDistrict(e.target.value);

    const response = await publicApi.get(`api/area-list/${e.target.value}`);
    if (response.status === 200) {
      setAreas(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const fetchArea = async (id) => {
    const response = await publicApi.get(`api/area-list/${id}`);
    if (response.status === 200) {
      setAreas(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const handleArea = async (e) => {
    e.persist();
    setSelectedArea(e.target.value);
  };

  const url = process.env.domain;

  const [src, setSrc] = useState(
    url +
      JSON.parse(localStorage.getItem("user_data"))?.teacher
        ?.teacher_profile_picture
  );


  const [imagedata, setImagedata] = useState("");


  const setIfTruthy = (value, defaultValue = "") =>
    value ? value : defaultValue;

  useEffect(() => {
    const main_data = value.user?.main_data;
    const profile_data = value.user?.profile_data;

    setName(setIfTruthy(main_data?.name));
    setGender(setIfTruthy(profile_data?.teacher_gender));
    setPhone(setIfTruthy(main_data?.phoneNumber));
    setUniversity(setIfTruthy(profile_data?.teacher_university));
    setSubject(setIfTruthy(profile_data?.teacher_subject));
    setDegree(setIfTruthy(profile_data?.teacher_degree));
    setMedium(setIfTruthy(profile_data?.teacher_bk_medium));
    setSelectedDistrict(setIfTruthy(profile_data?.teacher_present_city));
    fetchArea(profile_data?.teacher_present_city);
    setSelectedArea(profile_data?.teacher_present_address);
    setPermanentAddress(profile_data?.teacher_permanent_address);
    setAbout(profile_data?.about_yourself);

    setAdPhone(profile_data?.a_phone_number);

    setExPhoneOne(profile_data?.ex_phone_one);
    setExPhoneTwo(profile_data?.ex_phone_two);
    setFatherName(profile_data?.father_name);
    setMotherName(profile_data?.mother_name);
    setFatherPhone(profile_data?.father_phone);
    setMotherPhone(profile_data?.mother_phone);

    setDistricts(districtList);

  }, [value, districtList]);

  const formData = new FormData();
  formData.append("teacher_name", name);
  formData.append("a_phone_number", phone);
  formData.append("teacher_university", university);
  formData.append("teacher_subject", subject);
  formData.append("teacher_degree", degree);
  formData.append("teacher_gender", gender);
  formData.append("teacher_bk_medium", medium);
  formData.append("teacher_present_city", selectedDistrict);
  formData.append("teacher_present_address", selectedArea);
  formData.append("teacher_permanent_address", permanentAddress);
  formData.append("about_yourself", about);
  formData.append("image", imagedata);

  formData.append("ad_phone", adPhone);
  formData.append("ex_phone_one", exPhoneOne);
  formData.append("ex_phone_two", exPhoneTwo);
  formData.append("father_name", fatherName);
  formData.append("father_phone", fatherPhone);
  formData.append("mother_name", motherName);
  formData.append("mother_phone", motherPhone);

  const formSubmit = (e) => {
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("api/tutor/update_personal_info", formData).then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
          });

          value.setTrigger(!value.trigger);
          setActiveTab("docs");
        } else {
          alert("Sorry");
        }
      });
    });
  };

  return (
    <>
      <div className="show">
        <h3 className="mt-10 mb-10 page-title">Personal Info</h3>
        <div className="font-md color-text-paragraph-2">
          Update your profile
        </div>

        <div className="mt-10">
          <div className="card p-3 mb-2 shadow">
            <div className="row">
              

              <div className="col-md-12 row">
                <div className="form-group col-md-4">
                  <label htmlFor="inputPhone">
                    E-Mail <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="inputPhone"
                    value={value.user?.main_data?.email} 
                    disabled
                  />
                </div>

                <div className="form-group col-md-4">
                  <label htmlFor="inputPhone">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control"
                    id="inputPhone"
                    value={value.user?.main_data?.phoneNumber}
                    disabled
                  />
                </div>

                <div className="form-group col-md-4">
                  <label htmlFor="inputPhone">Additional Phone Number</label>
                  <input
                    type="text"
                    name="ad_phoneNumber"
                    className="form-control"
                    placeholder="ex: 01........."
                    id="inputPhone"
                    onChange={(e) => setAdPhone(e.target.value)}
                    value={adPhone}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="inputName">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="inputName"
                    value={name}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="inputPhone">Gender :</label>
                  <div className="">
                    <Form.Select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      name="gender"
                      className=""
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </div>
                </div>
              </div>
            </div>
          </div>


   


          <div className="card p-3 shadow mb-2">
            <div className="row">
              <div className="col-md-12">
                <h5 className="">
                  <FaMapMarkedAlt /> Your Current Location
                </h5>
                {/* <hr></hr> */}
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputPhone">Current City :</label>
                <div className="">
                  <Form.Select
                    name="districts"
                    className="districts single-select"
                    onChange={handleDistrict}
                    value={selectedDistrict}
                  >
                    <option className="" value="" disabled selected>
                      Select District
                    </option>
                    {districts.map((district, i) => (
                      <option key={i} value={district.id}>
                        {district.districtName}
                      </option>
                    ))}
                    
                  </Form.Select>
                </div>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputPhone">Current Area :</label>
                <div className="">
                  <Form.Select
                    name="area"
                    className="area single-select"
                    onChange={handleArea}
                    value={selectedArea}
                  >
                    <option value="">Select Area</option>
                    {areas.map((area, i) => (
                      <option key={i} value={area.areaName}>
                        {area.areaName}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-3 shadow mb-2">
            <div className="row">
              <div className="col-md-12">
                <h5 className="">
                  <FaMapMarkedAlt /> Your Permanent Location
                </h5>
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="inputPhone">Permanent Location :</label>
                <textarea
                  rows="2"
                  readOnly={pro_data?.teacher_permanent_address && pro_data?.teacher_permanent_address != "null"}
                  onChange={(e) => setPermanentAddress(e.target.value)}
                  name="teacher_permanent_address"
                  className="form-control"
                  value={permanentAddress}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="card p-3 shadow mb-2">
            <div className="row">
              <div className="col-md-12">
                <h5 className="">Parental Info</h5>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputPhone">Father&apos;s Name :</label>
                <input
                  type="text"
                  name="father_name"
                  className="form-control"
                  placeholder="ex: Kamal Hossain"
                  id="inputPhone"
                  readOnly={pro_data?.father_name && pro_data?.father_name != "null"}
                  onChange={(e) => setFatherName(e.target.value)}
                  value={Nvh(fatherName)}
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputPhone">Father&apos;s Phone Number :</label>
                <input
                  type="text"
                  name="father_phone"
                  className="form-control"
                  placeholder="ex: 01........."
                  id="inputPhone"
                  readOnly={pro_data?.father_phone && pro_data?.father_phone != "null"}
                  onChange={(e) => setFatherPhone(e.target.value)}
                  value={Nvh(fatherPhone)}
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputPhone">Mother&apos;s Name :</label>
                <input
                  type="text"
                  name="mother_name"
                  className="form-control"
                  placeholder="ex: Jahanara Kamal"
                  id="inputPhone"
                  readOnly={pro_data?.mother_name && pro_data?.mother_name != "null"}
                  onChange={(e) => setMotherName(e.target.value)}
                  value={Nvh(motherName)}
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputPhone">Mother&apos;s Phone Number :</label>
                <input
                  type="text"
                  name="mother_phone"
                  className="form-control"
                  placeholder="ex: 01........."
                  id="inputPhone"
                  readOnly={pro_data?.mother_phone && pro_data?.mother_phone != "null"}
                  onChange={(e) => setMotherPhone(e.target.value)}
                  value={Nvh(motherPhone)}
                />
              </div>
            </div>
          </div>

          <div className="card p-3 shadow mb-2">
            <div className="row">
              <div className="col-md-12">
                <h5 className="">Extra Info</h5>
                {/* <hr></hr> */}
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputPhone">
                  Local Guardian Number (On Emergency):
                </label>
                <input
                  type="text"
                  name="em_phone_one"
                  className="form-control"
                  placeholder="ex: 01........."
                  id="inputPhone"
                  onChange={(e) => setExPhoneOne(e.target.value)}
                  readOnly={pro_data?.ex_phone_two && pro_data?.ex_phone_two != "null"}
                  value={Nvh(exPhoneOne)}
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputPhone">Guardian Relationship :</label>
                <input
                  type="text"
                  name="em_phone_two"
                  className="form-control"
                  id="inputPhone"
                  placeholder="ex: Uncle"
                  readOnly={pro_data?.ex_phone_two && pro_data?.ex_phone_two != "null"}
                  onChange={(e) => setExPhoneTwo(e.target.value)}
                  value={Nvh(exPhoneTwo)}
                />
              </div>

              <div className="form-group col-md-12">
                <label htmlFor="inputPhone">About Yourself :</label>
                <textarea
                  rows="2"
                  readOnly={pro_data?.about_yourself && pro_data?.about_yourself != "null"}
                  onChange={(e) => setAbout(e.target.value)}
                  name="about_yourself"
                  className="form-control"
                  value={Nvh(about)}
                ></textarea>
              </div>
            </div>
          </div>
         




          <div className="form-group text-center">
            <button
              onClick={formSubmit}
              className="btn btn-1 px-5 gradient_bg text-light"
            >
              Next <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShortBio;
