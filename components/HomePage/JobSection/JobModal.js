import React from "react";
import { Modal } from "react-bootstrap";
function JobModal({ show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} keyboard="false">
      <div className="modal-content apply-job-form">
        <button
          className="btn-close"
          type="button"
          onClick={handleClose}
        ></button>
        <div className="modal-body pl-30 pr-30 pt-50">
          <div className="text-center">
            <p className="font-sm text-brand-2">Job Application </p>
            <h2 className="mt-10 mb-5 text-brand-1 text-capitalize">
              Start your career today
            </h2>
            <p className="font-sm text-muted mb-30">
              Please fill in your information and send it to the employer.{" "}
            </p>
          </div>
          <form className=" text-start mt-20 pb-30" action="#">
            <div className="form-group">
              <label className="form-label" htmlFor="input-1">
                Expected Salary *
              </label>
              <input
                className="form-control"
                id="input-1"
                type="text"
                name="exp_salary"
                placeholder="00"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="input-2">
               Cover letter *
              </label>
              <textarea
                className="form-control"
                name="cover_letter"
                cols="50"
                placeholder="Enter your cover letter here....."
              >
                </textarea>
            </div>
            
            {/* <div className="form-group">
              <label className="form-label" htmlFor="file">
                Upload Resume
              </label>
              <input
                className="form-control"
                id="file"
                name="resume"
                type="file"
              />
            </div> */}
            <div className="login_footer form-group d-flex justify-content-between">
              <label className="cb-container">
                <input type="checkbox" />
                <span className="text-small">Agree our terms and policy</span>
                <span className="checkmark"></span>
              </label>
              <a className="text-muted" href="page-contact.html">
                Lean more
              </a>
            </div>
            <div className="form-group">
              <button
                className="btn btn-default hover-up w-100"
                type="submit"
                name="login"
              >
                Apply Job
              </button>
            </div>
            <div className="text-muted text-center">
              Do you need support? <a href="contact">Contact Us</a>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default JobModal;
