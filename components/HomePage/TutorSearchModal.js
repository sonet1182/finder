import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { appContext } from "../../pages/_app";
import publicApi from "../../services/publicApi";

function TutorSearchModal() {
  const value = useContext(appContext);
  const router = useRouter();

  const [showAreas, setShowAreas] = useState(false);
  const [showMedium, setShowMedium] = useState(false);
  const [showClasses, setShowClasses] = useState(false);

  const [districts, setDistricts] = useState(value.districts);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");

  const [mediums, setMediums] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState("");

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const handleDistrict = async (e) => {
    e.persist();
    setShowAreas(true);
    setAreas([]);
    setSelectedDistrict(e.target.value);

    const response = await publicApi.get(`api/area-list/${e.target.value}`);
    if (response.status === 200) {
      setAreas(response.data.data);
    } else {
      console.log("Server Error");
    }
  };
  const handleArea = async (e) => {
    e.persist();
    setSelectedArea(e.target.value);
    setShowMedium(true);
  };

  const handleMedium = async (e) => {
    e.persist();

    setShowClasses(true);

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

  useEffect(() => {
    getMediums();
  }, []);

  const getMediums = async (e) => {
    const response = await publicApi.get("api/medium-list");
    if (response.status === 200) {
      setMediums(response.data.data);
      console.log(response.data.data);
    } else {
      console.log("Server Error");
    }
  };


  const tutorSearchHandler = async (e) => {
    router.push({
      pathname: `/tutor_list/`,
      query: {
        type: "all",
        district: selectedDistrict ? selectedDistrict : "",
        area: selectedArea ? selectedArea : "",
        medium: selectedMedium ? selectedMedium : "",
        class: selectedClass ? selectedClass : "",
        gender: "",
      },
    });
  };

  return (
    <div>
      <h4 className="text-center">Search Tutor</h4>
      <Form className="text-center py-4">
        <div className="form-row row">
          <div className="form-group col-md-12">
            <Form.Select
              name="districts"
              className="form-control districts single-select"
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
          </div>

          {showAreas && (
            <div name="area" className="form-group col-md-12">
              <div className="selectArea">
                <Form.Select
                  name="area"
                  className="form-control area single-select"
                  onChange={handleArea}
                >
                  <option value="">Select Area</option>
                  {areas.map((area, i) => (
                    <option key={i} value={area.id}>
                      {area.areaName}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
          )}

          {showMedium && (
            <div className="form-group col-md-12">
              <Form.Select
                name="medium"
                className="form-control medium single-select"
                onChange={handleMedium}
              >
                <option value="">Select Medium</option>
                {mediums.map((medium, i) => (
                  <option key={i} value={medium.id}>
                    {medium.mediumName}
                  </option>
                ))}
              </Form.Select>
            </div>
          )}

          {showClasses && (
            <div name="class" className="form-group col-md-12">
              <div className="selectClass">
                <Form.Select
                  name="class"
                  className="form-control class single-select"
                  onChange={handleClass}
                >
                  <option value="">Select Class</option>
                  {classes.map((s_class, i) => (
                    <option key={i} value={s_class.id}>
                      {s_class.className}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
          )}

          {/* <div name="subject" className="form-group col-md-12">
            <div className="selectSubject">
              <Form.Select
                name="subject"
                className="form-control subject single-select"
              >
                <option value="">Select Subject</option>
              </Form.Select>
            </div>
          </div>

          <div className="form-group col-md-12">
            <Form.Select name="gender" className="form-control single-select">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </div> */}
        </div>

        <Button onClick={tutorSearchHandler} className="btn btn-1 btn-default">
          Search For Tutor
        </Button>

      </Form>
    </div>
  );
}

export default TutorSearchModal;
