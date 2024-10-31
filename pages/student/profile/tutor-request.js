import React, { useEffect, useState } from "react";
import Meta from "../../../components/Meta/Meta";
import StudentLayout from "../../../Layouts/StudentLayout";
import publicApi from "../../../services/publicApi";
import ReactSelect from "react-select";
import swal from "sweetalert";
import { useRouter } from "next/router";

export default function TutorRequest() {
  const router = useRouter();

  const [student, setStudent] = useState({
    name: "",
    number_of_student: "",
    gender: "",
    institute: "",
    district: "",
    area: "",
    location: "",
    medium: "",
    sclass: "",
    subjects: "",
    tutoring_type: "",
    tutor_gender: "",
    days: "",
    time: "",
    salary: "",
    extra_info: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
      error_list: [],
    });
  };

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]);

  const [mediums, setMediums] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState("");

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");

  const [salaries, setSalaries] = useState([]);

  // District Handler
  const getDistricts = async (e) => {
    const response = await publicApi.get("api/district-list");
    if (response.status === 200) {
      setDistricts(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const districtOptions = districts.map((district) => ({
    value: district.id,
    label: district.districtName,
  }));

  const handleDistrict = async (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setStudent({ ...student, district: selectedOption.value });

    setAreas([]);
    setSelectedArea([]);

    const response = await publicApi.get(
      `api/area-list/${selectedOption.value}`
    );
    if (response.status === 200) {
      setAreas(response.data.data);
      console.log("area", response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  // Area Handler
  const areaOptions = areas.map((area) => ({
    value: area.id,
    label: area.areaName,
  }));

  const handleArea = async (selectedOption) => {
    setSelectedArea(selectedOption);
    setStudent({ ...student, area: selectedOption.label });
  };

  // Medium Handler
  const getMediums = async (e) => {
    const response = await publicApi.get("api/medium-list");
    if (response.status === 200) {
      setMediums(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const mediumOptions = mediums.map((meds) => ({
    value: meds.id,
    label: meds.mediumName,
  }));

  const handleMedium = async (selectedOption) => {
    setSelectedMedium(selectedOption);
    setStudent({ ...student, medium: selectedOption.label });

    setClasses([]);
    setSelectedClass([]);

    const response = await publicApi.get(
      `api/class-list/${selectedOption.value}`
    );
    if (response.status === 200) {
      setClasses(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  // Class Handler
  const classOptions = classes.map((cla) => ({
    value: cla.id,
    label: cla.className,
  }));

  const handleClass = async (selectedOption) => {
    setSelectedClass(selectedOption);
    setStudent({ ...student, sclass: selectedOption.label });

    setSubjects([]);
    setSelectedSubject([]);

    const response = await publicApi.get(
      `api/subject-list/${selectedOption.value}`
    );
    if (response.status === 200) {
      setSubjects(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  // Subject Handler
  const subjectOptions = subjects.map((sub) => ({
    value: sub.id,
    label: sub.subjectName,
  }));

  const handleSubject = async (selectedOption) => {
    if (selectedOption.some((option) => option.value === "all")) {
      setSelectedSubject(subjectOptions);
    } else {
      setSelectedSubject(selectedOption);
    }

    const selectedSubjectLabels = selectedOption
      .map((option) => option.label)
      .join(", ");

    setStudent({ ...student, subjects: selectedSubjectLabels });
  };

  const getSalaries = async () => {
    const response = await publicApi.get(`api/salary-list`);
    if (response.status === 200) {
      setSalaries(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    getMediums();
    getDistricts();
    getSalaries();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      s_fullName: student.name,
      s_gender: student.gender,
      s_districts: student.district,
      s_area: student.area,
      s_address: student.location,
      s_medium: student.medium,
      s_class: student.sclass,
      s_college: student.institute,
      t_gender: student.tutor_gender,
      t_days: student.days,
      time: student.time,
      t_salary: student.salary,
      ex_information: student.extra_info,
      s_number: student.number_of_student,
      tutoring_type: student.tutoring_type,
      t_subject: student.subjects,
    };

    const response = await publicApi.post(`api/student/tutor-request`, data);
    if (response.data.status === 200) {
      swal("Welcome", response.data.message, "success");
      router.push("/student/profile/posted-jobs");
    } else {
      swal("Welcome", response.data.message, "error");
    }
  };

  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <>
      <Meta title="Payment Section | Khuje Now" />

      <div className="app-main__outer">
        <div className="row app-main__inner">
          <div className="container my-2">
            <ul className="progressbar">
              <li className={step === 1 ? "active" : ""}>Student Details</li>
              <li className={step === 2 ? "active" : ""}>Tuition Info</li>
              <li className={step === 3 ? "active" : ""}>Tutor Details</li>
            </ul>
          </div>

          <form id="msform">
            {/* Fieldsets */}
            {step === 1 && (
              <fieldset>
                <h3 className="fs-title">Student Details</h3>
                <h3 className="fs-subtitle">Tell about student and location</h3>

                <div className="form-row text-start">
                  <div className="form-group col-md-6">
                    <label htmlFor="s_fullName">Student Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Ex: Sadia Islam"
                      value={student.name}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="s_college">Number of Student</label>
                    <input
                      type="number"
                      name="number_of_student"
                      className="form-control"
                      value={student.number_of_student}
                      onChange={handleInput}
                      placeholder="Ex: 1"
                    />
                  </div>
                </div>

                <div className="form-row text-start">
                  <div className="form-group col-md-6">
                    <label htmlFor="s_gender">Select Student Gender</label>
                    <select
                      name="gender"
                      className="form-control"
                      value={student.gender}
                      onChange={handleInput}
                    >
                      <option>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="institute">Institute</label>
                    <input
                      type="text"
                      name="institute"
                      className="form-control"
                      placeholder="Ex: Viqarunnisa Noon School & College"
                      value={student.institute}
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="form-row text-start">
                  <div className="form-group col-md-6">
                    <label htmlFor="s_districts">Select District</label>

                    <ReactSelect
                      name="s_districts"
                      className="district"
                      options={districtOptions}
                      value={selectedDistrict}
                      onChange={handleDistrict}
                      placeholder="Select District Name"
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="s_area">Select Area</label>
                    <ReactSelect
                      name="s_districts"
                      className="district"
                      options={areaOptions}
                      value={selectedArea}
                      onChange={handleArea}
                      placeholder="Select Area Name"
                    />
                  </div>
                </div>

                <div className="form-group text-start">
                  <label htmlFor="s_address">Location Details</label>
                  <textarea
                    name="location"
                    className="form-control"
                    rows="2"
                    onChange={handleInput}
                    placeholder="Ex: Road-08, House-07, Block-D, Mirpur-06"
                  >
                    {student.location}
                  </textarea>
                </div>

                <button
                  type="button"
                  className="next action-button"
                  onClick={handleNext}
                >
                  Next
                </button>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                <h2 className="fs-title">Tuition Info</h2>
                <h3 className="fs-subtitle">
                  Your preferred tuition related info
                </h3>

                <div className="form-row text-start">
                  <div className="form-group col-md-6">
                    <label htmlFor="s_medium">Select Your Medium</label>
                    <ReactSelect
                      name="s_districts"
                      className="district"
                      options={mediumOptions}
                      value={selectedMedium}
                      onChange={handleMedium}
                      placeholder="Select Medium"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="s_class">Select Student Class</label>
                    <ReactSelect
                      name="s_districts"
                      className="district"
                      options={classOptions}
                      value={selectedClass}
                      onChange={handleClass}
                      placeholder="Select Class"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="t_subject">Select Subject</label>
                    <ReactSelect
                      name="s_districts"
                      className="district"
                      options={subjectOptions}
                      value={selectedSubject}
                      onChange={handleSubject}
                      placeholder="Select Subjects"
                      isMulti
                      hideSelectedOptions={false}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="tutoring_type">Select Tutoring Type</label>
                    <select
                      className="form-control"
                      name="tutoring_type"
                      onChange={handleInput}
                      value={student.tutoring_type}
                    >
                      <option value="">Select One</option>
                      <option value="Home">Home</option>
                      <option value="Online">Online</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  className="previous action-button-previous"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="next action-button"
                  onClick={handleNext}
                >
                  Next
                </button>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset>
                <h2 className="fs-title">TUTOR DETAILS</h2>
                <h3 className="fs-subtitle">Preferred Tutors Type and Time</h3>
                <div className="form-row text-start">
                  <div className="form-group col-md-6">
                    <label htmlFor="tutor_gender">Preferred Teacher Gender</label>
                    <select
                      name="tutor_gender"
                      className="form-control"
                      onChange={handleInput}
                      value={student.tutor_gender}
                    >
                      <option>Select Gender</option>
                      <option value="Any Gender">Any Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="days">Days Per Week</label>
                    <select
                      name="days"
                      className="form-control days"
                      onChange={handleInput}
                      value={student.days}
                    >
                      <option value=" ">Please select your Day</option>
                      <option value="1 Day/Week">1 Day/Week</option>
                      <option value="2 Days/Week">2 Days/Week</option>
                      <option value="3 Days/Week">3 Days/Week</option>
                      <option value="4 Days/Week">4 Days/Week</option>
                      <option value="5 Days/Week">5 Days/Week</option>
                      <option value="6 Days/Week">6 Days/Week</option>
                      <option value="7 Days/Week">7 Days/Week</option>
                    </select>
                  </div>
                </div>

                <div className="form-row text-start">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="time">Tutoring Time</label>
                      <select
                        name="time"
                        className="form-control single-select"
                        value={student.time}
                        onChange={handleInput}
                      >
                        <option value="">Select Tutoring Time</option>
                        <option value="05:00:00"> 05:00 am</option>
                        <option value="06:00:00"> 06:00 am</option>
                        <option value="07:00:00"> 07:00 am</option>
                        <option value="08:00:00"> 08:00 am</option>
                        <option value="09:00:00"> 09:00 am</option>
                        <option value="10:00:00"> 10:00 am</option>
                        <option value="11:00:00"> 11:00 am</option>
                        <option value="12:00:00"> 12:00 pm</option>
                        <option value="13:00:00"> 01:00 pm</option>
                        <option value="14:00:00"> 02:00 pm</option>
                        <option value="15:00:00"> 03:00 pm</option>
                        <option value="16:00:00"> 04:00 pm</option>
                        <option value="17:00:00"> 05:00 pm</option>
                        <option value="18:00:00"> 06:00 pm</option>
                        <option value="19:00:00"> 07:00 pm</option>
                        <option value="20:00:00"> 08:00 pm</option>
                        <option value="21:00:00"> 09:00 pm</option>
                        <option value="22:00:00"> 10:00 pm</option>
                        <option value="23:00:00"> 11:00 pm</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="t_salary">Salary range</label>

                      <select
                        name="salary"
                        className="form-control single-select"
                        value={student.salary}
                        onChange={handleInput}
                      >
                        <option value="">Please select Salary Range</option>

                        {salaries.map((sal, i) => (
                          <option key={i} value={sal.salaryRange}>
                            {sal.salaryRange} Tk/Month
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="ex_info">Extra Information</label>
                  <textarea
                    name="extra_info"
                    className="form-control"
                    rows="3"
                    onChange={handleInput}
                  >
                    {student.extra_info}
                  </textarea>
                </div>
                <button
                  type="button"
                  className="previous action-button-previous"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="submit action-button"
                  onClick={submitHandler}
                >
                  Submit
                </button>
              </fieldset>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

TutorRequest.Layout = StudentLayout;
