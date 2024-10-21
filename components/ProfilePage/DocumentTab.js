import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { FaCheck, FaDotCircle, FaEdit, FaPlus, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { userContext } from "../../Layouts/PrivateLayout";
import publicApi from "../../services/publicApi";
import Modal from "react-bootstrap/Modal";
import ReactSelect from "react-select";

function DocumentTab() {
  const value = useContext(userContext);
  const user = value.user?.main_data?.verify;
  const url = process.env.domain;
  const [file, setFile] = useState();
  const filePro = useRef();
  const [imagedata, setImagedata] = useState("");
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const [file4, setFile4] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState("");
  const [fileCount, setFileCount] = useState(0);

  const [validationErrorType, setValidationErrorType] = useState(false);
  const [validationErrorImg, setValidationErrorImg] = useState(false);

  useEffect(() => {
    let count = 0;

    if (user?.nid_card != null) {
      setFile1(url + "nid_card/" + user?.nid_card);
      count++;
    }

    if (user?.student_card != null) {
      setFile2(url + "student_card/" + user?.student_card);
      count++;
    }

    if (user?.ssc_cft != null) {
      setFile3(url + "ssc_cft/" + user?.ssc_cft);
      count++;
    }

    if (user?.hsc_cft != null) {
      setFile4(url + "hsc_cft/" + user?.hsc_cft);
      count++;
    }

    setFileCount(count);
  }, [url, user]);

  const handleChange = (file) => {
    setValidationErrorImg(false);
    setFile(URL.createObjectURL(file[0]));
    setImagedata(file[0]);
  };

  const formSubmit = async (e) => {
    if (!selectedDoc.value) {
      setValidationErrorType(true);
    }

    if (!imagedata) {
      setValidationErrorImg(true);
    }

    if (selectedDoc.value && imagedata) {
      submitHandler();
    }
  };

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("doc", selectedDoc.value);
    formData.append("nid_card", imagedata);
    const res = await publicApi.post("api/tutor/update_documents", formData);

    if (res.status === 200) {
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 5500,
        hideProgressBar: true,
        closeOnClick: true,
      });
      setSelectedDoc("");
      setFile("");
      setValidationErrorType(false);
      setValidationErrorImg(false);
      setModalShow(false);
    } else {
      toast.error(res.data.message, {
        position: "top-right",
        autoClose: 5500,
        hideProgressBar: true,
        closeOnClick: true,
      });
    }

    value.setTrigger(!value.trigger);
  };

  const options = [
    { value: "nid", label: "NID/ Passport/ Birth Certificate" },
    { value: "uid", label: "University ID/ Certificate" },
    { value: "ssc", label: "SSC/ O Level Marksheets/ Certificate" },
    { value: "hsc", label: "HSC/ A Level Marksheets/ Certificate" },
  ];

  const getIsDisabled = (value) => {
    return (
      (file1 && value === "nid") ||
      (file2 && value === "uid") ||
      (file3 && value === "ssc") ||
      (file4 && value === "hsc")
    );
  };

  const disabledOptions = options.map((option) => ({
    ...option,
    isDisabled: getIsDisabled(option.value),
  }));

  const handleDoc = (selectedOption) => {
    setValidationErrorType(false);
    setSelectedDoc(selectedOption);
  };

  const files = [
    { file: file1, label: "NID/ Passport/ Birth Certificate" },
    { file: file2, label: "University ID/ Certificate" },
    { file: file3, label: "SSC/ O Level Marksheets/ Certificate" },
    { file: file4, label: "HSC/ A Level Marksheets/ Certificate" },
  ];

  const [selectedFile, setSelectedFile] = useState(null);

  const openModal = (file) => {
    setSelectedFile(file);
  };

  const closeModal = () => {
    setSelectedFile(null);
  };

  return (
    <>
      <div className="show col-12">
        <h3 className="mt-10 mb-10 page-title">My Documents</h3>
        <div className="font-md color-text-paragraph-2">
          Update your profile
        </div>

        <div className="">
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Upload Documents
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className={`${validationErrorType ? "invalid_doc" : ""}`}>
                  <ReactSelect
                    placeholder="Select..."
                    options={disabledOptions}
                    closeMenuOnSelect={true}
                    hideSelectedOptions={false}
                    onChange={handleDoc}
                    allowSelectAll={false}
                    value={selectedDoc}
                  />

                  
                </div>

                {validationErrorType && <small className="text-danger">Select One Document Type</small>}

                <div className="d-flex flex-wrap mt-3">
                  {disabledOptions.map((x, i) => (
                    <div key={i} className="col-md-6">
                      {x.isDisabled ? (
                        <FaCheck className="text-success" />
                      ) : (
                        <>&nbsp; &nbsp; </>
                      )}{" "}
                      {i + 1}. {x.label}
                    </div>
                  ))}
                </div>

                <div className={`wrapper2 mt-35 box-info-profie justify-content-center shadow-lg rounded ${validationErrorImg ? "invalid_doc" : ""}`}>
                  <div
                    className="img-box2 item-center mx-auto"
                    style={{ minHeight: "200px", position: "relative" }}
                    onClick={(e) => filePro.current.click()}
                  >
                    <input
                      ref={filePro}
                      onChange={(e) => handleChange(e.target.files)}
                      multiple={false}
                      type="file"
                      hidden
                    />

                    {file ? (
                      <img
                        style={{
                          maxWidth: "100%",
                          maxHeight: "300px",
                          position: "relative",
                        }}
                        className="img-fluid"
                        src={file}
                        alt="photo"
                      />
                    ) : (
                      <div className="mx-auto">
                        <img
                          className="item-center"
                          src="/images/add_doc.png"
                          alt="Your Image"
                          style={{ height: "100px", width: "100px" }}
                        />
                        <h6 className="pt-2 text-center text-secondary">
                          {" "}
                          <FaPlus /> Add New
                        </h6>
                      </div>
                    )}
                  </div>

                  <div className="text text-light">
                    <FaEdit /> <b className="pt-2">{selectedDoc.label}</b>
                  </div>
                </div>

                {validationErrorImg && <small className="text-danger">Upload an image File</small>}

                <div className="text-center mt-35">
                  <span className="text-danger">
                    [ NB: Both images should be jpeg,png,jpg,gif,svg type and
                    max size: 300kb ]
                  </span>
                </div>

                <div className="text-center mt-5">
                  <span className="">
                    To compress image to 250kb{" "}
                    <a
                      className="text-primary"
                      href="https://imagecompressor.11zon.com/en/compress-image/compress-image-to-250kb"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Click Here
                    </a>
                  </span>
                </div>

                <div className="text-center mt-5">
                  <button
                    onClick={formSubmit}
                    className="btn btn-1 mx-auto px-5 gradient_bg text-light"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <div className="d-flex flex-wrap">
            {files.map(
              (fileInfo, index) =>
                fileInfo.file && (
                  <div
                    key={index}
                    className="doc-wrapper card p-2 shadow m-2 d-flex align-items-center"
                    onClick={() => openModal(fileInfo.file)}
                  >
                    <div className="img-box2 item-center mx-auto">
                      <img
                        style={{
                          maxWidth: "100%",
                          height: "168px",
                          width: "300px",
                        }}
                        className="img-fluid"
                        src={fileInfo.file}
                        alt="photo"
                      />
                    </div>
                    <div className="text-sec text-light">
                      <b className="pt-2">{fileInfo.label}</b>
                    </div>
                  </div>
                )
            )}

            <Modal
              show={!!selectedFile}
              onHide={closeModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Body>
                {selectedFile && (
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    src={selectedFile}
                    alt="Preview"
                  />
                )}
              </Modal.Body>
            </Modal>

            {fileCount < 4 && (
              <div
                className="card item-center shadow m-2 d-flex align-items-center link"
                onClick={() => setModalShow(true)}
                style={{ maxWidth: "100%", height: "186px", width: "300px" }}
              >
                <div className="my-auto">
                  <img
                    className="item-center"
                    src="/images/add_doc.png"
                    alt="Your Image"
                    style={{ height: "100px", width: "100px" }}
                  />
                  <h6 className="pt-2 text-center text-secondary">
                    {" "}
                    <FaPlus /> Add New
                  </h6>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DocumentTab;
