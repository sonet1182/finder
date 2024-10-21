import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { userContext } from "../../Layouts/PrivateLayout";
import ReactSelect from "react-select";
import publicApi from "../../services/publicApi";
import Nvh from "../Common/Nvh";

function EdicationTab({
  setActiveTab,
  instituteTypeList,
  studyTypeList,
}) {
  const userData = useContext(userContext); //User data fetch from context_api
  const value = userData?.user?.profile_data;
  const value1 = userData;

  const [sscYear, setSscYear] = useState();
  const [sscInstitute, setSscInstitute] = useState();
  const [sscGroup, setSscGroup] = useState();
  const [sscGpa, setSscGpa] = useState();
  const [sscCurriculam, setSscCurriculam] = useState();

  const [hscYear, setHscYear] = useState();
  const [hscInstitute, setHscInstitute] = useState();
  const [hscGroup, setHscGroup] = useState();
  const [hscGpa, setHscGpa] = useState();
  const [hscCurriculam, setHscCurriculam] = useState();

  const [honoursYear, setHonoursYear] = useState();
  const [instituteTypes, setInstituteTypes] = useState(instituteTypeList);
  const [studyTypes, setStudyTypes] = useState(studyTypeList);
  const [departments, setDepartments] = useState([]);
  const [honoursGpa, setHonoursGpa] = useState();

  const [honoursCurriculam, setHonoursCurriculam] = useState();
  const [selectedInstiType, setSelectedInstiType] = useState();
  const [selectedstudyType, setSelectedstudyType] = useState();

  const [selectedDpt, setSelectedDpt] = useState({
    label: value?.honours_subject,
    value: value?.honours_subject,
  });

  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState({
    label: value?.honours_institute,
    value: value?.honours_institute,
  });
  const [instituteName, setInstituteName] = useState("");

  const handleUniversityChange = (selectedOption) => {
    setSelectedUniversity(selectedOption);
    if (selectedOption && selectedOption.value === "others") {
      setInstituteName("");
    }
  };
  const handleInstituteNameChange = (event) => {
    setInstituteName(event.target.value);
  };

  useEffect(() => {
    setInstituteTypes(instituteTypeList);
    setStudyTypes(studyTypeList);
    instiTypeHandler(value?.honours_insti_type);

    setSscYear(value?.ssc_year);
    setSscInstitute(value?.ssc_institute);
    setSscGroup(value?.ssc_group);
    setSscGpa(value?.ssc_gpa);
    setSscCurriculam(value?.ssc_curriculam);

    setHscYear(value?.hsc_year);
    setHscInstitute(value?.hsc_institute);
    setHscGroup(value?.hsc_group);
    setHscGpa(value?.hsc_gpa);
    setHscCurriculam(value?.hsc_curriculam);

    setHonoursYear(value?.honours_year);
    setHonoursGpa(value?.honours_gpa);
    setHonoursCurriculam(value?.honours_curriculam);
    setSelectedstudyType(value?.honours_study_type);

    setSelectedDpt({
      label: value?.honours_subject,
      value: value?.honours_subject,
    });

    setSelectedUniversity({
      label: value?.honours_institute,
      value: value?.honours_institute,
    });


  }, [value, instituteTypeList, studyTypeList]);

  const formData = new FormData();
  formData.append("ssc_year", sscYear);
  formData.append("ssc_institute", sscInstitute);
  formData.append("ssc_group", sscGroup);
  formData.append("ssc_gpa", sscGpa);
  formData.append("ssc_curriculam", sscCurriculam);

  formData.append("hsc_year", hscYear);
  formData.append("hsc_institute", hscInstitute);
  formData.append("hsc_group", hscGroup);
  formData.append("hsc_gpa", hscGpa);
  formData.append("hsc_curriculam", hscCurriculam);

  formData.append("insti_type", selectedInstiType);
  formData.append("study_type", selectedstudyType);
  formData.append(
    "honours_institute",
    instituteName == "" ? selectedUniversity.value : instituteName
  );
  formData.append("honours_subject", selectedDpt.value);
  formData.append("honours_year", honoursYear);
  formData.append("honours_gpa", honoursGpa);
  formData.append("honours_curriculam", honoursCurriculam);

  const formSubmit = async (e) => {
    const response = await publicApi.post(
      "api/tutor/update_educational_info",
      formData
    );

    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
      });

      value1?.setTrigger(!value1?.trigger);
      setActiveTab("tutor");
    } else {
      console.log("Server Error");
    }
  };

  const uniArray = [];
  const dptArray = [];

  const createCustomUniArray = (old_array) => {
    uniArray.push({ label: "Others", value: "others" }); // Add this line
    old_array.forEach(function (item) {
      uniArray.push({ label: item.university, value: item.university });
    });
  };

  const createCustomDptArray = (old_array) => {
    old_array.forEach(function (item) {
      dptArray.push({ label: item.name, value: item.name });
    });
  };

  const instiTypeHandler = async (insti_id) => {
    setUniversities([]);
    setSelectedInstiType(insti_id);

    const response = await publicApi.get(`api/university-list/${insti_id}`);
    if (response.status === 200) {
      createCustomUniArray(response.data.data);
      setUniversities(uniArray ? uniArray : []);
    } else {
      console.log("Server Error");
    }
  };

  const studyTypeHandler = async (e) => {
    e.persist();
    setDepartments([]);
    setSelectedstudyType(e.target.value);

    const response = await publicApi.get(`api/dept-list/${e.target.value}`);
    if (response.status === 200) {
      createCustomDptArray(response.data.data);
      setDepartments(dptArray ? dptArray : []);
    } else {
      console.log("Server Error");
    }
  };

  return (
    <>
      <div className="show col-12">
        <h3 className="mt-10 mb-10 page-title">Educational Info</h3>
        <div className="font-md color-text-paragraph-2">
          Update your profile
        </div>

        <div>
          <div>
            <div className="shadow card p-3 mb-2">
              <h6 className="text-center">
                Secondary / SSC / O-level / Dakhil
              </h6>
              <div className="row justify-content-center">
                <div className="col-md-9">
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Institute
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="ssc_institute"
                        placeholder="ex: Saint Joseph Higher Secondary School"
                        onChange={(e) => setSscInstitute(e.target.value)}
                        value={Nvh(sscInstitute)}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Curriculum
                    </label>
                    <div className="col-sm-10">
                      <Form.Select
                        className=""
                        name="ssc_curriculam"
                        onChange={(e) => setSscCurriculam(e.target.value)}
                        value={sscCurriculam}
                      >
                        <option value="">Select One</option>
                        <option value="Bangla Version">Bangla Version</option>
                        <option value="English Version">English Version</option>
                        <option value="Ed-Excel">Ed-Excel</option>
                        <option value="Cambridge">Cambridge</option>
                        <option value="IB">IB</option>
                        <option value="Madrasa">Madrasa</option>
                        <option value="Vocational">Vocational</option>
                        <option value="Others">Others</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Group
                    </label>
                    <div className="col-sm-10">
                      <Form.Select
                        className=""
                        onChange={(e) => setSscGroup(e.target.value)}
                        name="ssc_group"
                        value={Nvh(sscGroup)}
                      >
                        <option value="">Select One</option>
                        <option value="Science">Science</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Arts">Arts</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Passing Year
                    </label>
                    <div className="col-sm-10">
                      <Form.Select
                        className=""
                        name="ssc_year"
                        onChange={(e) => setSscYear(e.target.value)}
                        value={sscYear}
                      >
                        {[...Array(50)].map((x, i) => (
                          <option value={new Date().getFullYear() - i} key={i}>
                            {new Date().getFullYear() - i}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Result
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="ssc_gpa"
                        placeholder="ex: 5.00"
                        onChange={(e) => setSscGpa(e.target.value)}
                        value={Nvh(sscGpa)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shadow card p-3 mb-2">
              <h6 className="text-center">
                Higher Secondary / HSC / A level / Alim
              </h6>
              <div className="row justify-content-center">
                <div className="col-md-9">
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Institute
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="hsc_institute"
                        placeholder="ex: Notre Dame College, Dhaka"
                        onChange={(e) => setHscInstitute(e.target.value)}
                        value={Nvh(hscInstitute)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Curriculum
                    </label>
                    <div className="col-sm-10">
                      <Form.Select
                        className=""
                        name="hsc_curriculam"
                        onChange={(e) => setHscCurriculam(e.target.value)}
                        value={hscCurriculam}
                      >
                        <option value="">Select One</option>
                        <option value="Bangla Version">Bangla Version</option>
                        <option value="English Version">English Version</option>
                        <option value="Ed-Excel">Ed-Excel</option>
                        <option value="Cambridge">Cambridge</option>
                        <option value="IB">IB</option>
                        <option value="Madrasa">Madrasa</option>
                        <option value="Vocational">Vocational</option>
                        <option value="Others">Others</option>
                      </Form.Select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Group
                    </label>
                    <div className="col-sm-10">
                      <Form.Select
                        className=""
                        name="hsc_group"
                        onChange={(e) => setHscGroup(e.target.value)}
                        value={Nvh(hscGroup)}
                      >
                        <option value="">Select One</option>
                        <option value="Science">Science</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Arts">Arts</option>
                      </Form.Select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Passing Year
                    </label>
                    <div className="col-sm-10">
                      <Form.Select
                        className=""
                        name="hsc_year"
                        onChange={(e) => setHscYear(e.target.value)}
                        value={hscYear}
                      >
                        {[...Array(50)].map((x, i) => (
                          <option value={new Date().getFullYear() - i} key={i}>
                            {new Date().getFullYear() - i}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Result
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="hsc_gpa"
                        placeholder="ex: 5.00"
                        onChange={(e) => setHscGpa(e.target.value)}
                        value={Nvh(hscGpa)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shadow card p-3 mb-2">
              <h6 className="text-center">Graduation / Bachelor / Diploma</h6>
              <div className="row justify-content-center">
                <div className="col-md-9">
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Institute Type
                    </label>
                    <div className="col-sm-10">
                      <Form.Select
                        className=""
                        name="honours_year"
                        onChange={(e) => instiTypeHandler(e.target.value)}
                        value={selectedInstiType}
                      >
                        <option value="">Select One</option>
                        {instituteTypes.map((x, i) => (
                          <option value={x.id} key={i}>
                            {x.name}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Institute
                    </label>
                    <div className="col-sm-10">
                      <ReactSelect
                        options={universities}
                        closeMenuOnSelect={true}
                        hideSelectedOptions={false}
                        onChange={handleUniversityChange}
                        allowSelectAll={false}
                        value={selectedUniversity}
                      />
                      {selectedUniversity &&
                        selectedUniversity.value === "others" && (
                          <input
                            type="text"
                            className="mt-2"
                            placeholder="Enter Other Institute Name"
                            onChange={handleInstituteNameChange}
                            value={instituteName}
                          />
                        )}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Study Type
                    </label>
                    <div className="col-sm-10">
                      <Form.Select
                        className=""
                        name="honours_year"
                        onChange={studyTypeHandler}
                        value={selectedstudyType}
                      >
                        <option value="">Select One</option>
                        {studyTypes.map((x, i) => (
                          <option value={x.id} key={i}>
                            {x.name}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Departments
                    </label>
                    <div className="col-sm-10">
                      <ReactSelect
                        options={departments}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        onChange={setSelectedDpt}
                        allowSelectAll={true}
                        value={selectedDpt}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Curriculum
                    </label>
                    <div className="col-sm-10">
                      <Form.Select
                        className=""
                        name="honours_curriculam"
                        onChange={(e) => setHonoursCurriculam(e.target.value)}
                        value={honoursCurriculam}
                      >
                        <option value="">Select One</option>
                        <option value="Bangla Version">Bangla Version</option>
                        <option value="English Version">English Version</option>
                        <option value="Ed-Excel">Ed-Excel</option>
                        <option value="Cambridge">Cambridge</option>
                        <option value="IB">IB</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      Passing Year/ Semester/ Year* (If has)
                    </label>
                    <div className="col-sm-10">
                      <Form.Select
                        className=""
                        name="honours_year"
                        onChange={(e) => setHonoursYear(e.target.value)}
                        value={honoursYear}
                      >
                        <option value="First Year">First Year</option>
                        <option value="Second Year">Second Year</option>
                        <option value="Third Year">Third Year</option>
                        <option value="Fourth Year">Fourth Year</option>
                        <option value="Fifth Year">Fifth Year</option>
                        <option value="Graduation Complete">
                          Graduation Completed
                        </option>
                        {[...Array(50)].map((x, i) => (
                          <option value={new Date().getFullYear() - i} key={i}>
                            {new Date().getFullYear() - i}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="inputPassword"
                      className="col-sm-2 col-form-label"
                    >
                      CGPA / Current CGPA
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        name="honours_gpa"
                        onChange={(e) => setHonoursGpa(e.target.value)}
                        value={Nvh(honoursGpa)}
                      />
                    </div>
                  </div>
                </div>
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
    </>
  );
}

export default EdicationTab;
