import React, { useContext, useState } from "react";
import ShebaUddoktaLayout, { affContext } from "./ShebaUddoktaLayout";
import { Form } from "react-bootstrap";
import { useEffect } from "react";
import swal from "sweetalert";
import publicApi from "../../services/publicApi";


function UddoktaProfileUpdate() {
  const [errors, setErrors] = useState([]);
  const value = useContext(affContext);

  const [studentName, setStudentName] = useState('');
  const [type, setType] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgAddress, setOrgAddress] = useState('');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');


  const [bankType, setBankType] = useState('');
  const [accNumber, setAccNumber] = useState('');


  const fetchArea = async (id) => {
    const response = await publicApi.get(`api/area-list/${id}`);
    if (response.status === 200) {
      setAreas(response.data.data);
    } else {
      console.log("Server Error");
    }
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
    getDistricts();
    fetchArea(value.user?.district);
    setStudentName(value.user?.name);
    setType(value.user?.agent_type);
    setOrgName(value.user?.org_name);
    setOrgAddress(value.user?.org_address);
    setSelectedDistrict(value.user?.district);
    setSelectedArea(value.user?.area);

    setBankType(value.user?.bank_type);
    setAccNumber(value.user?.acc_number);
  }, [value]);



  const submitHandler = async (e) => {
    setErrors();
    e.preventDefault();

    const data = {
      name: studentName,
      type: type,
      district: selectedDistrict,
      area: selectedArea,
      org_name: orgName,
      org_address: orgAddress,
    };

    const response = await publicApi.post(`api/partner/user_info_update`, data);
    if (response.data.status == 200) {
      swal("Welcome", response.data.message, "success");
      value.setTrigger(!value.trigger);
    } else {
      setErrors(response.data.message);
      swal("Welcome", response.data.message, "error");
    }
  };


  const submitAccHandler = async (e) => {
    setErrors();
    e.preventDefault();

    const data = {
      bank_type: bankType,
      acc_number: accNumber,
    };

    const response = await publicApi.post(`api/partner/user_acc_update`, data);
    if (response.data.status == 200) {
      swal("Welcome", response.data.message, "success");
      setErrors(response.data?.validation_errors);
      value.setTrigger(!value.trigger);
    } else {
      setErrors(response.data?.validation_errors);
      console.log('errors',response.data?.validation_errors);
      swal("Welcome", response.data.message, "error");
    }
  };

  return (
    <>
      <h5 className="mt-10 mb-10 page-title">Profile Info Update</h5>

      <div className="">

    
      
 
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
                  Name<span className="required">*</span>
                </label>
                <input
                  className="font-sm color-text-paragraph-2"
                  name="name"
                  placeholder="Enter your name"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="input-style mb-20">
                <label htmlFor="s_districts">
                  Agent Type
                </label>

                <Form.Select name="type" className="" value={type} onChange={(e) => setType(e.target.value)}>
                  <option className="" value="" disabled selected>
                    Choose One
                  </option>
                  <option value="Individual">Individual</option>
                  <option value="Organization">Organization</option>
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
                  className="districts single-select"
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
                  className="districts single-select"
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

            <div className="col-lg-6 col-md-6">
              <div className="input-style mb-20">
                <label htmlFor="s_districts">Organization Name (If Have)</label>
                <input
                  className="font-sm color-text-paragraph-2"
                  name="phone"
                  placeholder="Ex: Biddya Niketon High School, Khulna"
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="input-style mb-20">
                <label htmlFor="s_districts">
                  Organization Address (If Have)
                </label>
                <input
                  className="font-sm color-text-paragraph-2"
                  name="phone"
                  placeholder="Ex: Khulna Sadar, Khulna"
                  type="text"
                  value={orgAddress}
                  onChange={(e) => setOrgAddress(e.target.value)}
                />
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
      

        

      </div>

      <h5 className="mt-30 mb-10 page-title">Payment Credentials Update</h5>

      <div>
        <form
          className="contact-form-style mt-30"
          id="contact-form"
          onSubmit={submitAccHandler}
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
                  Mobile Banking Type <span className="required">*</span>
                </label>

                <Form.Select name="type" className=""
                value={bankType}
                  onChange={(e) => setBankType(e.target.value)}>
                  <option className="" value="" disabled selected>
                    Choose One
                  </option>
                  <option value="Bkash">Bkash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                </Form.Select>

                <p className="text-danger">{errors?.bank_type && <>This Field is requird!</>}</p>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="input-style mb-20">
                <label htmlFor="s_districts">
                  Account Number <span className="required">*</span>
                </label>
                <input
                  className="font-sm color-text-paragraph-2"
                  name="name"
                  placeholder="ex: 01........."
                  type="text"
                  value={accNumber}
                  onChange={(e) => setAccNumber(e.target.value)}
                />
                <p className="text-danger">{errors?.acc_number && <>This Field is requird!</>}</p>
              </div>
            </div>
          </div>


          <div className="col-md-12 mb-30">
              <button
                className="submit btn btn-send-message px-4 mt-5"
                type="submit"
              >
                Submit
              </button>
            </div>
        </form>
      </div>
    </>
  );
}

export default UddoktaProfileUpdate;

UddoktaProfileUpdate.Layout = ShebaUddoktaLayout;
