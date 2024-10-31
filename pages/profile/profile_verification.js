import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Meta from "../../components/Meta/Meta";
import PrivateLayout from "../../Layouts/PrivateLayout";
import { saveData } from "../../services/auth/token";
import publicApi from "../../services/publicApi";
import { appContext } from "../_app";
import { Modal, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import privateApi from "../../services/privateApi";
import swal from "sweetalert";
import Checkbox from "react-custom-checkbox";
import { FaCheck } from "react-icons/fa";

export default function ProfileVerification() {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const value = useContext(appContext);
  const [user, setUser] = useState(value.userData);
  const [checked, setChecked] = useState();

  const submitVerificationRequest = async () => {
    setLoading(true);

    const response = await publicApi.get(
      `api/tutor/profile_verification_req_submit`
    );

    if (response.status === 200) {
      setLoading(false);
      saveData(JSON.stringify(response.data.data));
      setUser(response.data.data);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
      });
    } else {
      console.log("Server Error");
    }
  };

  const submitPremiumRequest = async () => {
    setLoading(true);

    try {
      const tokenResponse = await privateApi.post(
        `api/tutor/payment/get_token`
      );

      // Step 2: Create a payment request
      if (tokenResponse.data.statusMessage == "Successful") {
        const data = {
          id_token: tokenResponse.data.id_token,
          payment: checked,
        };

        localStorage.setItem("id_token", tokenResponse.data.id_token);

        const paymentResponse = privateApi
          .post("api/tutor/profile_premium_req_submit/payment/create", data)
          .then((response) => {
            if (response.data.statusMessage === "Successful") {
              console.log("create", response.data);
              const bkashURL = response.data.bkashURL;
              window.location.href = bkashURL;
            } else {
              console.error("Network error");
              swal("Error", "Connection Problem", "error");
            }
          })
          .catch((error) => {
            console.error("Network error:", error);
          });
      } else {
        throw new Error(`Token request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Payment Error", error);
    }
  };

  const payment_req_submit_after_payment = async (response) => {
    setLoading(false);
    saveData(JSON.stringify(response.data.user_data));
    setUser(response.data.user_data);
    toast.success("Request Submitted", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
    });
  };

  const router = useRouter();
  const { paymentID } = router.query;

  useEffect(() => {
    const gt_id_token = localStorage.getItem("id_token");

    if (paymentID && gt_id_token) {
      const data = {
        id_token: gt_id_token,
        payment_id: paymentID,
      };

      privateApi
        .post("api/tutor/profile_premium_req_submit/payment/execute", data)
        .then((response) => {
          console.log("execute 1", response);

          if (response?.data?.data?.statusMessage === "Successful") {
            console.log("execute", response.data);
            swal("Success", "Payment Successful", "success");
            payment_req_submit_after_payment(response);
          } else {
            console.warn(response.data.statusMessage);
          }
        });
    }
  }, [paymentID]);

  const handleCheckbox = (value) => {
    setChecked(value);
  };

  return (
    <>
      <Meta title="Profile Verification | Khuje Now" />

      <div className="">
        <h3 className="mt-10 mb-10 page-title">Profile Verification</h3>

        <div className="col-xl-12 col-md-12 my-4">
          <span className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col-md-10">
                  <h4 className="font-weight-bold text-info text-uppercase mb-1">
                    Request For Premium Registration
                  </h4>
                  <div className="no-gutters align-items-center">
                    You need to pay a one-time charge for the <strong>PREMIUM
                    MEMBERSHIP</strong> process.
                  </div>
                </div>
                <div className="col-md-2">
                  {user?.teacher?.home_approval == 1 ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-outline-success mt-2"
                        disabled
                      >
                        Your Account is Already Premium
                      </button>
                    </>
                  ) : user.verification?.premium_verification_request == 1 ? (
                    <button
                      type="button"
                      className="btn btn-outline-success mt-2"
                      disabled
                    >
                      Request Submitted
                    </button>
                  ) : (
                    <a
                      onClick={() => setShow(true)}
                      type="button"
                      className="btn btn-primary text-light mt-2"
                    >
                      Submit Request
                    </a>
                  )}
                </div>
              </div>
            </div>
          </span>
        </div>

        <div className="col-xl-12 col-md-12 my-4">
          <span className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col-md-10">
                  <h4 className="font-weight-bold text-info text-uppercase mb-1">
                    Request For Profile Verification
                  </h4>
                  <div className="no-gutters align-items-center">
                  If you want to make a Tutor profile verification Request,you have to confirm at least One Job.
                  </div>
                </div>

                <div className="col-md-2">
                  {user?.teacher?.verified == 1 ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-outline-success mt-2"
                        disabled
                      >
                        You Are Already Verified
                      </button>
                    </>
                  ) : user.verification?.profile_verification_request == 1 ? (
                    <button
                      type="button"
                      className="btn btn-outline-success mt-2"
                      disabled
                    >
                      Request Submitted
                    </button>
                  ) : (
                    <a
                      onClick={submitVerificationRequest}
                      type="button"
                      className="btn btn-primary text-light mt-2"
                    >
                      Submit Request
                    </a>
                  )}
                </div>
              </div>
            </div>
          </span>
        </div>
        
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="md"
        centered
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body className="py-3">
          <h5 className="text-center">Benefits of becoming a Premium Member</h5>

          <div className="features py-3">
            <p>&#10003; Nearby tuition SMS notifications alert</p>
            <p>&#10003; Always on top of results</p>
            <p>&#10003; Prioritized during selection process</p>
          </div>
          <div className="d-flex gap-3">
            <div
              onClick={() => handleCheckbox("200")}
              className="pay-option custom-checkbox"
            >
              <div className="ml-10 item-center">
                <Checkbox
                  checked={checked == 200 ? true : false}
                  value={200}
                  icon={<FaCheck color="#6c2a8c" size={18} />}
                  borderColor="#6c2a8c"
                  size={22}
                  label={
                    <span>
                      6 Month <b>(৳ 200)</b>{" "}
                    </span>
                  }
                />
              </div>
            </div>

            <div
              onClick={() => handleCheckbox("400")}
              className="custom-checkbox pay-option"
            >
              <div className="ml-10 item-center">
                <Checkbox
                  checked={checked == 400 ? true : false}
                  value={400}
                  icon={<FaCheck color="#6c2a8c" size={18} />}
                  borderColor="#6c2a8c"
                  size={22}
                  label={
                    <span>
                      12 Month <b>(৳ 400)</b>{" "}
                    </span>
                  }
                />
              </div>
            </div>
          </div>
          <Button
            className="btn btn-danger btn-block"
            disabled={!checked}
            onClick={submitPremiumRequest}
          >
            Pay Now
          </Button>
        </Modal.Body>
      </Modal>

      {/* <Modal
        show={show}
        onHide={() => setShow(false)}
        size="md"
        centered
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body className="text-center py-5">
          <h4 className="text-center">Request Fee: 100 BDT</h4>
          <h5 className="pb-5">Are you sure to send request？</h5>

          <div className="mt-3">
            <button
              className="btn btn-danger mx-1 px-5"
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-success mx-1 px-5"
              onClick={submitPremiumRequest}
            >
              Confirm
            </button>
          </div>
        </Modal.Body>
      </Modal> */}
    </>
  );
}

ProfileVerification.Layout = PrivateLayout;
