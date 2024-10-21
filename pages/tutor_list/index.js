import React, { useContext } from "react";
import MasterLayout from "../../Layouts/MasterLayout";
import {
  FaAngleDown,
  FaDesktop,
  FaFilter,
  FaHome,
  FaListAlt,
  FaMars,
  FaStar,
  FaVenus,
  FaVenusMars,
} from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import publicApi from "../../services/publicApi";
import Pagination from "react-js-pagination";
import TutorListSkeleton from "../../components/Skeletons/TutorListSkeleton";
import { useRouter } from "next/router";
import TutorCard2 from "../../components/Tutor/TutorCard2";
import { appContext } from "../_app";
import { Form } from "react-bootstrap";
import errorIcon from "../../assets/vector/exclamation-error-alert-alarm-clock-svgrepo-com.svg"
import Image from "next/image";

function TutorList() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({
    type: "",
    district: "",
    area: "",
    medium: "",
    class: "",
    gender: "",
  });
  const [tutors, setTutors] = useState([]);
  const [page, setPage] = useState([]);
  const [pageLinks, setPageLinks] = useState([]);

  const value = useContext(appContext);

  const [districts, setDistricts] = useState(value.districts);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");

  const [mediums, setMediums] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState("");

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  const [selectedType, setSelectedType] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const [toggle, setToggle] = useState(false);

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

    fetchTutors(1, {
      type: selectedType,
      district: e.target.value,
      area: selectedArea,
      medium: selectedMedium,
      class: selectedClass,
      gender: selectedGender,
    });
  };

  const fetchArea = async (district) => {
    const response = await publicApi.get(`api/area-list/${district}`);
    if (response.status === 200) {
      setAreas(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const handleArea = async (e) => {
    e.persist();
    setSelectedArea(e.target.value);
    fetchTutors(1, {
      type: selectedType,
      district: selectedDistrict,
      area: e.target.value,
      medium: selectedMedium,
      class: selectedClass,
      gender: selectedGender,
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
    fetchTutors(1, {
      type: selectedType,
      district: selectedDistrict,
      area: selectedArea,
      medium: e.target.value,
      class: selectedClass,
      gender: selectedGender,
    });
  };

  const fetchClass = async (medium) => {
    const response = await publicApi.get(`api/class-list/${medium}`);
    if (response.status === 200) {
      setClasses(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  const handleClass = async (e) => {
    e.persist();
    setSelectedClass(e.target.value);
    fetchTutors(1, {
      type: selectedType,
      district: selectedDistrict,
      area: selectedArea,
      medium: selectedMedium,
      class: e.target.value,
      gender: selectedGender,
    });
  };

  const getMediums = async (e) => {
    const response = await publicApi.get("api/medium-list");
    if (response.status === 200) {
      setMediums(response.data.data);
      console.log(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  /////

  useEffect(() => {
    getMediums();
    fetchArea(router.query.district);
    setSelectedDistrict(router.query.district);
    setSelectedArea(router.query.area);
    setSelectedDistrict(router.query.district);
    setSelectedMedium(router.query.medium);
    fetchClass(router.query.medium);
    setSelectedClass(router.query.class);
    fetchTutors(1, router.query);
    setQuery(router.query);
    setSelectedType(router.query.type);
  }, [router.query]);

  const fetchTutors = async (pageNumber = 1, que) => {
    setLoading(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setToggle(false);

    const response = await publicApi.get(
      `api/tutor_list?page=${pageNumber}&type=${que.type}&district=${que.district}&area=${que.area}&medium=${que.medium}&class=${que.class}&gender=${que.gender}`
    );

    if (response.status === 200) {
      setTutors(response.data.data);
      setPageLinks(response.data.data.links);
      setLoading(false);
    } else {
      console.log("Server Error");
    }
  };

  const typeHandler = (e) => {
    e.persist();
    setSelectedType(e.target.value);
    setQuery({
      ...query,
      type: e.target.value,
    });
    setLoading(true);
    fetchTutors(1, {
      type: e.target.value,
      district: selectedDistrict,
      area: selectedArea,
      medium: selectedMedium,
      class: selectedClass,
      gender: selectedGender,
    });
  };

  const genderHandler = (e) => {
    // e.persist();
    setSelectedGender(e.target.value);
    setQuery({
      ...query,
      gender: e.target.value,
    });
    setLoading(true);
    fetchTutors(1, {
      type: selectedType,
      district: selectedDistrict,
      area: selectedArea,
      medium: selectedMedium,
      class: selectedClass,
      gender: e.target.value,
    });
  };

  const filterBox = (
    <>
      <div className="sidebar-filters">
        <div className="filter-block head-border mb-10">
          <h5>Advance Filter </h5>
        </div>

        <div className="filter-block mb-10">
          <h6 className="medium-heading">Tutor Type</h6>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input
                    type="radio"
                    // name="type"
                    value="all"
                    onChange={typeHandler}
                    checked={query.type == "all" ? "checked" : ""}
                  />
                  <span className="text-small">All</span>
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
                    value="premium"
                    onChange={typeHandler}
                    checked={query.type == "premium" ? "checked" : ""}
                  />
                  <span className="text-small">Premium</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">
                  <FaStar />
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="filter-block mb-10">
          <h6 className="medium-heading">Gender</h6>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input
                    type="radio"
                    // name="gender"
                    value=""
                    onChange={genderHandler}
                    checked={query.gender == "" ? "checked" : ""}
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
                    // name="gender"
                    value="Male"
                    onChange={genderHandler}
                    checked={query.gender == "Male" ? "checked" : ""}
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
                    // name="gender"
                    value="Female"
                    onChange={genderHandler}
                    checked={query.gender == "Female" ? "checked" : ""}
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
            <h6 className="medium-heading">Select District </h6>
            <Form.Select
              name="districts"
              className=" districts single-select"
              onChange={handleDistrict}
              value={selectedDistrict}
            >
              <option className="" value="" disabled>
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
            <h6 className="medium-heading">Select Area</h6>
            <Form.Select
              name="area"
              className=" area single-select"
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
            <h6 className="medium-heading">Select Medium</h6>
            <Form.Select
              name="medium"
              className=" medium single-select"
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
            <h6 className="medium-heading">Select Class</h6>
            <Form.Select
              name="class"
              className=" class single-select"
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

        <div className="filter-block mb-10">
          <h6 className="medium-heading">Tuition Type</h6>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input
                    type="radio"
                    // name="tutype"
                    value="all"
                    onChange={typeHandler}
                    checked="checked"
                  />
                  <span className="text-small">All</span>
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
                    // name="tutype"
                    value="home"
                    onChange={typeHandler}
                    checked=""
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
                    // name="tutype"
                    value="online"
                    onChange={typeHandler}
                    checked=""
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
      </div>
    </>
  );

  return (
    <main className="main">
      <section className="section-box mt-10">
        <div className="container">
          <div className="row flex-row-reverse">
            <div className="col-lg-9 col-md-12 col-sm-12 col-12 float-right">
              <div className="content-page">
                <div className="box-filters-job">
                  <div className="pc-hide">
                    <div className="row">
                      <div className="col-9">
                        <h6>Tutor List</h6>
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

                  <div id={toggle ? `mySidenav2` : ''} className="sidenav2">
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
                        Showing{" "}
                        <strong>
                          {tutors?.from}-{tutors?.to}{" "}
                        </strong>
                        of <strong>{tutors.total} </strong>
                        Tutors
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
                              <span>15</span>
                              <FaAngleDown />
                            </button>
                            <ul
                              className="dropdown-menu dropdown-menu-light"
                              aria-labelledby="dropdownSort"
                            >
                              <li>
                                <a className="dropdown-item active" href="#">
                                  10
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  12
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
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
                  {!loading && tutors.data.length > 0
                    ? tutors?.data?.map((tutor, i) => (
                        <TutorCard2 key={i} tutor={tutor} />
                      )) : !loading && tutors.data.length == 0 ? 
                      <div className="d-flex align-items-center mx-auto" style={{ minHeight: "60vh" }}>
                        <div className="text-center m-auto">
                        <Image src={errorIcon} height="100" width="100" />
                        <h6>Sorry! No Tutor Found</h6>
                        <h5>Please Contact to this number</h5>
                        <a className="py-5" href="tel:+8809613575388"><h5 className="text-primary">+880 9613 575388</h5></a>
                        </div>
                      </div>
                    : [...Array(30)].map((x, i) => (
                        <TutorListSkeleton key={i} />
                      ))}
                </div>
              </div>
              <div className="paginations d-flex">
                <div className="d-flex mx-auto neomp">
                  <Pagination
                    activePage={tutors?.current_page ? tutors?.current_page : 0}
                    itemsCountPerPage={tutors?.per_page ? tutors?.per_page : 0}
                    totalItemsCount={tutors?.total ? tutors?.total : 0}
                    onChange={(pageNumber) => {
                      fetchTutors(pageNumber, {
                        type: selectedType,
                        district: selectedDistrict,
                        area: selectedArea,
                        medium: selectedMedium,
                        class: selectedClass,
                        gender: selectedGender,
                      });
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
            <div className="col-lg-3 col-md-12 col-sm-12 col-12 mb-hide">
              <div className="sidebar-shadow none-shadow mb-30 sticky-filter">
                {filterBox}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

TutorList.Layout = MasterLayout;

export default TutorList;
