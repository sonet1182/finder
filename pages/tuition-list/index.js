import React from "react";
import MasterLayout from "../../Layouts/MasterLayout";
import {
  FaAngleDown,
  FaDesktop,
  FaFilter,
  FaHome,
  FaListAlt,
  FaMars,
  FaVenus,
  FaVenusMars,
} from "react-icons/fa";
import { useState } from "react";
import { useEffect, useRef } from "react";
import publicApi from "../../services/publicApi";
import JobCard from "../../components/Job/JobCard";
import JobSkeleton from "../../components/Job/JobSkeleton";
import noDataImg from "../../assets/vector/no_data.svg";
import Pagination from "react-js-pagination";
import { Form } from "react-bootstrap";
import Image from "next/image";
import swal from "sweetalert";

function TuitionList() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState();

  const [query, setQuery] = useState({
    id: "",
    type: "",
    district: "",
    area: "",
    medium: "",
    class: "",
    gender: "",
    start: "",
    end: "",
  });

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");

  const [mediums, setMediums] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState("");

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const [selectedGender, setSelectedGender] = useState("");
  const [id, setId] = useState("");

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [toggle, setToggle] = useState(false);

  const getDistricts = async (e) => {
    const response = await publicApi.get("api/district-list");
    if (response.status === 200) {
      setDistricts(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const fetchJobsHandler = async (pageNumber = page, qty = perPage, que) => {
    setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const response = await publicApi.get(
      `api/tuition-list/${qty}?id=${que.id}&page=${pageNumber}&type=${que.type}&district=${que.district}&area=${que.area}&medium=${que.medium}&class=${que.class}&gender=${que.gender}&start=${que.start}&end=${end}`
    );
    if (response.status === 200) {
      setJobs(response.data.data);
      setToggle(false);
      setLoading(false);
    } else {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    let page_num = null;
    page_num = localStorage.getItem("job_page");
    setPage(page_num);
    fetchJobsHandler(page_num ? page_num : 1, perPage, query);
    getDistricts();
    getMediums();
  }, []);

  const handleDistrict = async (e) => {
    e.persist();
    setAreas([]);
    setSelectedDistrict(e.target.value);

    const response = await publicApi.get(`api/area-list/${e.target.value}`);
    if (response.status === 200) {
      setAreas(response.data.data);
    } else {
      console.log("Server Error");
    }

    fetchJobsHandler(1, perPage, {
      id: id,
      type: query.type,
      district: e.target.value,
      area: selectedArea,
      medium: selectedMedium,
      class: selectedClass,
      gender: selectedGender,
      start: start,
      end: end,
    });
  };

  const handleArea = async (e) => {
    e.persist();
    setSelectedArea(e.target.value);

    fetchJobsHandler(1, perPage, {
      id: id,
      type: query.type,
      district: selectedDistrict,
      area: e.target.value,
      medium: selectedMedium,
      class: selectedClass,
      gender: selectedGender,
      start: start,
      end: end,
    });
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

    fetchJobsHandler(1, perPage, {
      id: id,
      type: query.type,
      district: selectedDistrict,
      area: selectedArea,
      medium: e.target.value,
      class: selectedClass,
      gender: selectedGender,
      start: start,
      end: end,
    });
  };

  const handleClass = async (e) => {
    e.persist();
    setSelectedClass(e.target.value);
    fetchJobsHandler(1, perPage, {
      district: selectedDistrict,
      area: selectedArea,
      medium: selectedMedium,
      class: e.target.value,
      gender: selectedGender,
      start: start,
      end: end,
    });
  };

  const getMediums = async (e) => {
    const response = await publicApi.get("api/medium-list");
    if (response.status === 200) {
      setMediums(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const typeHandler = (type) => {
    setQuery({
      ...query,
      type: type,
    });

    console.log("object", {
      ...query,
      type: type,
    });

    setLoading(true);
    fetchJobsHandler(1, perPage, {
      ...query,
      type: type,
    });
  };

  const genderHandler = (e) => {
    setSelectedGender(e.target.value);

    setLoading(true);
    fetchJobsHandler(1, perPage, {
      id: id,
      type: query.type,
      district: selectedDistrict,
      area: selectedArea,
      medium: selectedMedium,
      class: selectedClass,
      gender: e.target.value,
    });
  };

  const startDateHandler = (e) => {
    const selectedStartDate = e.target.value;
    const today = new Date().toISOString().split("T")[0];

    if (selectedStartDate > today) {
      swal("Alert", "Start date cannot be after today", "error");
      return;
    }

    // Additional check to ensure end date is not before start date
    if (end && selectedStartDate > end) {
      swal("Alert", "Start date cannot be after end date", "error");
      return;
    }

    fetchJobsHandler(1, perPage, {
      id: id,
      type: query.type,
      district: selectedDistrict,
      area: selectedArea,
      medium: selectedMedium,
      class: selectedClass,
      gender: selectedGender,
      start: selectedStartDate,
      end: selectedStartDate,
    });

    setStart(selectedStartDate);
  };

  const endDateHandler = (e) => {
    const selectedEndDate = e.target.value;
    const selectedStartDate = start;
    const today = new Date().toISOString().split("T")[0];

    if (selectedEndDate < selectedStartDate) {
      swal("Alert", "End date cannot be before start date", "error");
      return;
    } else if (selectedEndDate > today) {
      swal("Alert", "End date cannot be after today", "error");
      return;
    }

    fetchJobsHandler(1, perPage, {
      id: id,
      type: query.type,
      district: selectedDistrict,
      area: selectedArea,
      medium: selectedMedium,
      class: selectedClass,
      gender: selectedGender,
      start: selectedStartDate,
      end: selectedEndDate,
    });

    setEnd(selectedEndDate);
  };

  const idHandler = (e) => {
    setLoading(true);

    fetchJobsHandler(1, perPage, {
      id: e.target.value,
      type: query.type,
      district: selectedDistrict,
      area: selectedArea,
      medium: selectedMedium,
      class: selectedClass,
      gender: selectedGender,
      start: start,
      end: end,
    });

    setId(e.target.value);
  };

  const perPageHandler = (total) => {
    setPerPage(total);
    fetchJobsHandler(1, total, {
      id: id,
      type: query.type,
      district: selectedDistrict,
      area: selectedArea,
      medium: selectedMedium,
      class: selectedClass,
      gender: selectedGender,
      start: start,
      end: end,
    });
  };

  const filterBox = (
    <>
      <div className="sidebar-filters">
        <div className="filter-block head-border mb-20">
          <h5>Advance Filter </h5>
        </div>

        <div className="filter-block mb-10">
          <h6 className="medium-heading mb-15">Search By Job Id</h6>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={idHandler}
              placeholder="Enter job id here..."
            />
          </div>
        </div>

        <div className="filter-block mb-10">
          <h6 className="medium-heading mb-15">Search By Date</h6>
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="date"
                  className="form-control mb-2"
                  onChange={startDateHandler}
                />
              </div>

              {/* <div className="pt-2 col-md-2">To</div> */}

              <div className="col-md-6">
              <input
                type="date"
                className="form-control mb-2"
                onChange={endDateHandler}
              />
              </div>

              
            </div>
          </div>
        </div>

        <div className="filter-block mb-10">
          <h6 className="medium-heading mb-15">Tuition Type</h6>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input
                    type="radio"
                    // name="type"
                    value="Home"
                    onChange={() => typeHandler("")}
                    checked={query.type == "" ? "checked" : ""}
                  />
                  <span className="text-small">All Tuition</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">
                  <FaListAlt />
                </span>
              </li>
              <li>
                <label className="cb-container">
                  <input
                    type="radio"
                    // name="type"
                    value="Home"
                    onChange={() => typeHandler("Home")}
                    checked={query.type == "Home" ? "checked" : ""}
                  />
                  <span className="text-small">Home Tuition</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">
                  <FaHome />
                </span>
              </li>
              <li>
                <label className="cb-container">
                  <input
                    type="radio"
                    // name="type"
                    value="Online"
                    onChange={() => typeHandler("Online")}
                    checked={query.type == "Online" ? "checked" : ""}
                  />
                  <span className="text-small">Online Tuition</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">
                  <FaDesktop />
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="filter-block mb-10">
          <h6 className="medium-heading mb-15">Tutor Preferance</h6>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input
                    type="radio"
                    value=""
                    onChange={genderHandler}
                    checked={selectedGender == "" ? "checked" : ""}
                  />
                  <span className="text-small">All</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">
                  <FaVenusMars />
                </span>
              </li>
              <li>
                <label className="cb-container">
                  <input
                    type="radio"
                    value="Male"
                    onChange={genderHandler}
                    checked={selectedGender == "Male" ? "checked" : ""}
                  />
                  <span className="text-small">Male</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">
                  <FaMars />
                </span>
              </li>
              <li>
                <label className="cb-container">
                  <input
                    type="radio"
                    value="Female"
                    onChange={genderHandler}
                    checked={selectedGender == "Female" ? "checked" : ""}
                  />
                  <span className="text-small">Female</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">
                  <FaVenus />
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="filter-block mb-10">
          <div className="form-group select-style select-style-icon">
            <h6 className="medium-heading mb-15">Select District </h6>
            <Form.Select
              name="districts"
              className="districts single-select"
              onChange={handleDistrict}
              value={selectedDistrict}
            >
              <option className="" value="">
                All
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
        <div className="filter-block mb-10">
          <div className="form-group select-style select-style-icon">
            <h6 className="medium-heading mb-15">Select Area</h6>
            <Form.Select
              name="area"
              className="area single-select"
              onChange={handleArea}
              value={selectedArea}
            >
              <option value="">All</option>
              {areas.map((area, i) => (
                <option key={i} value={area.id}>
                  {area.areaName}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className="filter-block mb-10">
          <div className="form-group select-style select-style-icon">
            <h6 className="medium-heading mb-15">Select Medium</h6>
            <Form.Select
              name="medium"
              className="medium single-select"
              onChange={handleMedium}
              value={selectedMedium}
            >
              <option value="">All</option>
              {mediums.map((medium, i) => (
                <option key={i} value={medium.id}>
                  {medium.mediumName}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className="filter-block mb-10">
          <div className="form-group select-style select-style-icon">
            <h6 className="medium-heading mb-15">Select Class</h6>
            <Form.Select
              name="class"
              className="class single-select"
              onChange={handleClass}
              value={selectedClass}
            >
              <option value="">All</option>
              {classes.map((s_class, i) => (
                <option key={i} value={s_class.id}>
                  {s_class.className}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
      </div>
    </>
  );

  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  const handleScroller = () => {
    if (leftColumnRef.current && rightColumnRef.current) {
      leftColumnRef.current.scrollTop = 0;
      rightColumnRef.current.scrollTop = 0;
    }
  };

  return (
    <main className="main">
      <section className="section-box">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-3 col-md-12 col-sm-12 col-12 mb-hide"
              ref={leftColumnRef}
            >
              <div className="sidebar-shadow none-shadow mb-30 sticky-filter">
                {filterBox}
              </div>
            </div>

            <div
              className="col-lg-9 col-md-12 col-sm-12 col-12 float-right"
              ref={rightColumnRef}
            >
              <div className="content-page">
                <div id={toggle ? `mySidenav2` : ""} className="sidenav2">
                  <a
                    className="closebtn mt-1"
                    onClick={() => setToggle(!toggle)}
                  >
                    &times;
                  </a>

                  {filterBox}
                </div>

                <div className="box-filters-job mt-5">
                  <div className="pc-hide pb-5">
                    <div className="row">
                      <div className="col-9">
                        <h5 className="page-title">Tuition Jobs</h5>
                      </div>
                      <div className="col-3 text-end">
                        <button
                          className="btn btn-sm bg-purple"
                          onClick={() => setToggle(!toggle)}
                        >
                          <FaFilter /> Filter
                        </button>
                      </div>
                    </div>
                  </div>

                  <div id={toggle ? `mySidenav2` : ""} className="sidenav2">
                    <div className="p-10">
                      <a
                        className="closebtn mt-1"
                        onClick={() => setToggle(!toggle)}
                      >
                        &times;
                      </a>

                      {filterBox}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <span className="text-small text-showing">
                        Showing
                        <strong>
                          {jobs?.from}-{jobs?.to}
                        </strong>
                        of <strong>{jobs.total} </strong>
                        jobs
                      </span>
                    </div>
                    <div className="col-6 text-end">
                      <div className="display-flex2">
                        <div className="box-border mr-10">
                          <span className="text-sortby">Show:</span>
                          <div className="dropdown dropdown-sort">
                            <button
                              className="btn dropdown-toggle"
                              id="dropdownSort"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              data-bs-display="static"
                            >
                              <span>{perPage}</span>
                              <FaAngleDown />
                            </button>
                            <ul
                              className="dropdown-menu dropdown-menu-light"
                              aria-labelledby="dropdownSort"
                            >
                              <li onClick={() => perPageHandler(5)}>
                                <a
                                  className={`dropdown-item ${
                                    perPage == 5 && "active"
                                  }`}
                                  href="#"
                                >
                                  5
                                </a>
                              </li>
                              <li onClick={() => perPageHandler(10)}>
                                <a
                                  className={`dropdown-item ${
                                    perPage == 10 && "active"
                                  }`}
                                  href="#"
                                >
                                  10
                                </a>
                              </li>
                              <li onClick={() => perPageHandler(15)}>
                                <a
                                  className={`dropdown-item ${
                                    perPage == 15 && "active"
                                  }`}
                                  href="#"
                                >
                                  15
                                </a>
                              </li>
                              <li onClick={() => perPageHandler(20)}>
                                <a
                                  className={`dropdown-item ${
                                    perPage == 20 && "active"
                                  }`}
                                  href="#"
                                >
                                  20
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row display-list">
                  {!loading
                    ? jobs?.data?.map((job, i) => <JobCard key={i} job={job} />)
                    : [...Array(10)].map((x, i) => <JobSkeleton key={i} />)}
                </div>
              </div>

              <div className="paginations d-flex">
                <div className="d-flex mx-auto neomp">
                  <Pagination
                    activePage={jobs?.current_page ? jobs?.current_page : 0}
                    itemsCountPerPage={jobs?.per_page ? jobs?.per_page : 0}
                    totalItemsCount={jobs?.total ? jobs?.total : 0}
                    onChange={(pageNumber) => {
                      handleScroller();
                      fetchJobsHandler(pageNumber, perPage, {
                        id: id,
                        type: query.type,
                        district: selectedDistrict,
                        area: selectedArea,
                        medium: selectedMedium,
                        class: selectedClass,
                        gender: selectedGender,
                        start: start,
                        end: end,
                      });
                      localStorage.setItem("job_page", pageNumber);
                    }}
                    pageRangeDisplayed={8}
                    itemclassName="page-item"
                    linkclassName="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

TuitionList.Layout = MasterLayout;

export default TuitionList;
