import React, { useEffect, useState } from "react";
import Meta from "../../../components/Meta/Meta";
import StudentLayout from "../../../Layouts/StudentLayout";


export default function UpdateStuProfile() {

  const [student, setStudent] = useState({
    name: "",
    phone: "",
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


  return (
    <>
      <Meta title="Payment Section | Tutor Sheba" />

      <div className="app-main__outer">
        <div className="app-main__inner">
          <h3 className="mt-10 mb-10 page-title">Update Profile</h3>
          <div className="font-md color-text-paragraph-2">
            Provide student information
          </div>

          <div className="card p-3 shadow mb-2">
            <form
              className="contact-form-style"
              id="contact-form"
              onSubmit=""
            >
              <div
                className="row wow animate__ animate__fadeInUp animated tutor-request-form"
                data-wow-delay=".1s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.1s",
                  animationName: "fadeInUp",
                }}
              >
                <div className="col-lg-6 col-md-6">
                  <div className="input-style mb-20">
                    <label>
                      Student Name <span className="required">*</span>
                    </label>
                    <input
                      className="font-sm color-text-paragraph-2"
                      name="name"
                      placeholder="Ex: Rifat Hasan"
                      type="text"
                      onChange={handleInput}
                      value={student.name}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="input-style mb-20">
                    <label>
                      Phone <span className="required">*</span>
                    </label>
                    <input
                      className="color-text-paragraph-2"
                      name="phone"
                      placeholder="ex: 01234567890"
                      type="text"
                      onChange={handleInput}
                      value={student.phone}
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

          <div className="font-md color-text-paragraph-2 mt-5">
            Update Password
          </div>


          <div className="card p-3 shadow mb-2">
            <form
              className="contact-form-style"
              id="contact-form"
              onSubmit=""
            >
              <div
                className="row wow animate__ animate__fadeInUp animated tutor-request-form"
                data-wow-delay=".1s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.1s",
                  animationName: "fadeInUp",
                }}
              >
                <div className="col-md-4">
                  <div className="input-style mb-20">
                    <label>
                      Old Password <span className="required">*</span>
                    </label>
                    <input
                      className="font-sm color-text-paragraph-2"
                      name="name"
                      placeholder="Ex: Rifat Hasan"
                      type="text"
                      onChange={handleInput}
                      value={student.name}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-style mb-20">
                    <label>
                      New Password <span className="required">*</span>
                    </label>
                    <input
                      className="color-text-paragraph-2"
                      name="phone"
                      placeholder="ex: 01234567890"
                      type="text"
                      onChange={handleInput}
                      value={student.phone}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-style mb-20">
                    <label>
                      Confirm Password <span className="required">*</span>
                    </label>
                    <input
                      className="color-text-paragraph-2"
                      name="phone"
                      placeholder="ex: 01234567890"
                      type="text"
                      onChange={handleInput}
                      value={student.phone}
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
        </div>

      
      </div>
    </>
  );
}

UpdateStuProfile.Layout = StudentLayout;
