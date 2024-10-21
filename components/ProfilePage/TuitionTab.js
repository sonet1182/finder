import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Form } from "react-bootstrap";
import { FaArrowRight, FaTruckLoading } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { userContext } from "../../Layouts/PrivateLayout";
import { appContext } from "../../pages/_app";
import publicApi from "../../services/publicApi";

function TuitionTab({ userInfo, setActiveTab, districtList }) {
  const value = useContext(userContext);
  const value2 = useContext(appContext);

  const user = value?.user?.profile_data;

  const [salaryLists, setSalaryLists] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState(user?.tuition_salary);

  const [experience, setExperience] = useState(user?.tuition_experience);

  const [districts, setDistricts] = useState(value2?.districts);
  const [selectedDistrict, setSelectedDistrict] = useState(user?.district_id);

  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(
    user?.tuition_area
      ? user?.tuition_area?.split(",").map((v) => ({ label: v, value: v }))
      : []
  );

  const [mediums, setMediums] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState(
    user?.tuition_medium
      ? user?.tuition_medium?.split(",").map((v) => ({ label: v, value: 1 }))
      : []
  );

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(
    user?.tuition_class
      ? user?.tuition_class?.split(",").map((v) => ({ label: v, value: 1 }))
      : []
  );

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(
    user?.tuition_subject
      ? user?.tuition_subject?.split(",").map((v) => ({ label: v, value: v }))
      : []
  );

  const [tuitionTypes, setTuitionTypes] = useState([
    { label: "Private Tuition", value: "Private Tuition" },
    { label: "Group Tuition", value: "Group Tuition" },
    { label: "Online Tuition", value: "Online Tuition" },
  ]);
  const [selectedTuitionType, setSelectedTuitionType] = useState(
    user
      ? user?.tuition_style?.split(",").map((v) => ({ label: v, value: v }))
      : []
  );

  const [tuitionShifts, setTuitionShifts] = useState([
    { label: "Morning", value: "Morning" },
    { label: "Afternoon", value: "Afternoon" },
    { label: "Evening", value: "Evening" },
    { label: "After Magrib", value: "After Magrib" },
    { label: "Night", value: "Night" },
  ]);
  const [selectedTuitionShift, setSelectedTuitionShift] = useState(
    user
      ? user?.tuition_shift?.split(",").map((v) => ({ label: v, value: v }))
      : []
  );

  const [tuitionDays, setTuitionDays] = useState([
    { label: "1 Day/Week", value: "1 Day/Week" },
    { label: "2 Day/Week", value: "2 Day/Week" },
    { label: "3 Day/Week", value: "3 Day/Week" },
    { label: "4 Day/Week", value: "4 Day/Week" },
    { label: "5 Day/Week", value: "5 Day/Week" },
    { label: "6 Day/Week", value: "6 Day/Week" },
    { label: "7 Day/Week", value: "7 Day/Week" },
  ]);
  const [selectedTuitionDays, setSelectedTuitionDays] = useState(
    user
      ? user?.tuition_days?.split(",").map((v) => ({ label: v, value: v }))
      : []
  );

  const getSalary = async (e) => {
    const response = await publicApi.get("api/salary-list");
    if (response.status === 200) {
      setSalaryLists(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const newArray = [];
  const mediumArray = [];
  const classArray = [];
  const subjectArray = [];

  const createCustomArray = (old_array) => {
    old_array.forEach(function (item) {
      newArray.push({ label: item.areaName, value: item.areaName });
    });
  };

  const createCustomMediumArray = (old_array) => {
    old_array.forEach(function (item) {
      mediumArray.push({ label: item.mediumName, value: item.id });
    });
  };

  const createCustomClassArray = (old_array) => {
    old_array.forEach(function (item) {
      classArray.push({
        label: item.className + " (" + item.all_media?.mediumName + ")",
        value: item.id,
      });
    });
  };

  const createCustomSubjectArray = (old_array) => {
    old_array.forEach(function (item) {
      subjectArray.push({
        label: item.subjectName + " (" + item.any_classes?.className + ")",
        value: item.subjectName,
      });
    });
  };

  const handleDistrict = async (e) => {
    e.persist();
    setSelectedArea([]);
    setSelectedDistrict(e.target.value);
    fetchArea(e.target.value);
  };

  const fetchArea = async (id) => {
    const response = await publicApi.get(`api/area-list/${id}`);
    if (response.status === 200) {
      createCustomArray(response.data.data);
      setAreas(newArray);
    } else {
      console.log("Server Error");
    }
  }

  const handleMedium = async (array) => {
    const data = {
      array: array,
    };
    const response = await publicApi.post(`api/multi-class-list`, data);
    if (response.status === 200) {
      createCustomClassArray(response.data.data);
      setClasses(classArray);
    } else {
      console.log("Server Error");
    }
  };

  const handleClass = async (array) => {
    const data = {
      array: array,
    };
    const response = await publicApi.post(`api/multi-subject-list`, data);
    if (response.status === 200) {
      createCustomSubjectArray(response.data.data);
      setSubjects(subjectArray);
    } else {
      console.log("Server Error");
    }
  };

  const getMediums = async (e) => {
    const response = await publicApi.get("api/medium-list");
    if (response.status === 200) {
      createCustomMediumArray(response.data.data);
      setMediums(mediumArray);
    } else {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    getMediums();
    getSalary();

    var medArr = selectedMedium.map((v) => v.value);
    handleMedium(medArr);

    var classArr = selectedClass.map((v) => v.value);
    handleClass(classArr);

    fetchArea(user?.district_id);

  }, [selectedMedium, selectedClass, user]);

  const formSubmit = (e) => {
    const data = {
      district_id: selectedDistrict,
      tuition_area: selectedArea.map((v) => v.label),
      tuition_subject: selectedSubject?.map((v) => v.label),
      tuition_medium: selectedMedium?.map((v) => v.label),
      tuition_class: selectedClass?.map((v) => v.label),
      tuition_salary: selectedSalary,
      tuition_experience: experience,
      tuition_days: selectedTuitionDays?.map((v) => v.label),
      tuition_shift: selectedTuitionShift?.map((v) => v.label),
      tuition_style: selectedTuitionType?.map((v) => v.label),
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post("api/tutor/update_tuition_info", data).then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
          });

          value.setTrigger(!value.trigger);
          setActiveTab("personal");
        } else {
          alert("Sorry");
        }
      });
    });
  };

  return (
    <>
      <div className="show col-12">
        <h3 className="mt-10 mb-10 page-title">Tuition Info</h3>
        <div className="font-md color-text-paragraph-2">
          Update your profile
        </div>

        {districts.length > 0 ? (
          <div>
            <div className="row shadow card d-flex">
              <div className="col-md-10 mx-auto p-3">
                <div className="">
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      Select provide tuition districts:{" "}
                      <span className="required">*</span>
                    </label>
                    <div className="col-sm-8">
                      <Form.Select
                        name="district_id"
                        className="districts single-select"
                        onChange={handleDistrict}
                        value={selectedDistrict}
                        required
                      >
                        <option value="">Select Your Districts</option>

                        {districts.map((district, i) => (
                          <option key={i} value={district.id}>
                            {district.districtName}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      Preferred Area for tuition:
                    </label>
                    <div className="col-sm-8">
                      <ReactSelect
                        options={areas}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        onChange={setSelectedArea}
                        allowSelectAll={true}
                        value={selectedArea}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      Preferred Medium:
                    </label>
                    <div className="col-sm-8">
                      <ReactSelect
                        options={mediums}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        onChange={setSelectedMedium}
                        allowSelectAll={true}
                        value={selectedMedium}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      Preferred Classes:
                    </label>
                    <div className="col-sm-8">
                      <ReactSelect
                        options={classes}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        onChange={setSelectedClass}
                        allowSelectAll={true}
                        value={selectedClass}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      Preferred Subjects (1st one will be Major Sub):
                    </label>
                    <div className="col-sm-8">
                      <ReactSelect
                        options={subjects}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        onChange={setSelectedSubject}
                        allowSelectAll={true}
                        value={selectedSubject}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      Days Per Week:
                    </label>
                    <div className="col-sm-8">
                      <ReactSelect
                        options={tuitionDays}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        onChange={setSelectedTuitionDays}
                        allowSelectAll={true}
                        value={selectedTuitionDays}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      Timing Shift:
                    </label>
                    <div className="col-sm-8">
                      <ReactSelect
                        options={tuitionShifts}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        onChange={setSelectedTuitionShift}
                        allowSelectAll={true}
                        value={selectedTuitionShift}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      Expected Salary:
                    </label>
                    <div className="col-sm-8">
                      <Form.Select
                        name="tuition_salary"
                        className="districts single-select"
                        onChange={(e) => setSelectedSalary(e.target.value)}
                        value={selectedSalary}
                      >
                        <option value="">Select One</option>
                        {[...Array(30)].map((x, i) => (
                          <option value={i * 500 + " Tk/Month"} key={i}>
                            {i * 500} Tk/Month
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      Preffered Tutoring Style:{" "}
                      <span className="required">*</span>
                    </label>
                    <div className="col-sm-8">
                      <ReactSelect
                        options={tuitionTypes}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        onChange={setSelectedTuitionType}
                        allowSelectAll={true}
                        value={selectedTuitionType}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-3 col-form-label"
                    >
                      Tuition experience (In Year):{" "}
                      <span className="required">*</span>
                    </label>
                    <div className="col-sm-8">
                      <Form.Select
                        className=""
                        name="exp_year"
                        onChange={(e) => setExperience(e.target.value)}
                        value={experience}
                        required
                      >
                        {[...Array(20)].map((x, i) => (
                          <option value={i} key={i}>
                            {i} year(s)
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={formSubmit}
                      className="btn btn-1 mx-auto px-5 gradient_bg text-light"
                    >
                      Next <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card w-100 vh-50 d-flex item-center py-4 px-3">
            <h2 style={{ opacity: "0.5" }}>Loading...</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default TuitionTab;
