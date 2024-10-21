import moment from "moment/moment";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { FaCalendar, FaCalendarAlt, FaEye } from "react-icons/fa";
import PrivateLayout from "../../../Layouts/PrivateLayout";
import bkash from "../../../assets/images/bkash.svg";
import privateApi from "../../../services/privateApi";
import { useRouter } from "next/router";
import swal from "sweetalert";

export default function TuitionMatching() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const router = useRouter();
  const { paymentID, status } = router.query;

  const handleClose = () => setShow(false);

  const fetchJobsHandler = async () => {
    setLoading(true);

    const response = await privateApi.get(
      `api/tutor/tuition_matching_payments_list`
    );
    if (response.status === 200) {
      setJobs(response.data.data);
      setLoading(false);
    } else {
      console.log("Server Error");
    }
  };

  const transactionHandler = async (id) => {
    setLoading2(true);
    setShow(true);

    const response = await privateApi.get(
      `api/tutor/tuition_matching_transactions/${id}`
    );

    if (response.status === 200) {
      setTransactions(response.data);
      setLoading2(false);
    } else {
      console.log("Server Error");
    }
  };

  useEffect(() => {
    const gt_id_token = localStorage.getItem("id_token");

    if (paymentID && gt_id_token) {
      const data = {
        id_token: gt_id_token,
        payment_id: paymentID,
      };

      privateApi.post("api/tutor/payment/execute", data).then((response) => {
        if (response.data.statusMessage === "Successful") {
          console.log("execute", response.data);
          swal("Success", "Payment Successful", "success");
          fetchJobsHandler();
        } else {
          console.warn(response.data.statusMessage);
        }
      });
    } else {
      fetchJobsHandler();
    }
  }, [paymentID, status]);

  const handlePayment = async (id, payment) => {
    try {
      const tokenResponse = await privateApi.post(
        `api/tutor/payment/get_token`
      );

      // Step 2: Create a payment request
      if (tokenResponse.data.statusMessage == "Successful") {
        const data = {
          id_token: tokenResponse.data.id_token,
          confirmation_id: id,
          payment: payment,
        };

        localStorage.setItem("id_token", tokenResponse.data.id_token);

        const paymentResponse = privateApi
          .post("api/tutor/payment/create", data)
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

  return (
    <>
      <div className="">

      <h3 className="mt-10 mb-10 page-title">Tuition Matching Payment:</h3>



        <div className="col-xl-12 col-md-12 my-4 table-responsive mb-hide">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Tuition</th>
                <th>Fee</th>
                <th>Paid</th>
                <th>Due</th>
                <th className="text-center">Status</th>
                <th>
                  <div className="text-center">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                jobs?.map((job, i) => (
                  <>
                    <tr key={i}>
                      <td>
                        <Link href={`/tuition-list/view/${job.student_id}`}>
                          {job?.student?.title}
                        </Link>
                      </td>

                      <td>
                        {job.fee}
                        {job.discount > 0 && (
                          <>
                            <b className="text-success">
                              {" "}
                              (Discount: {job.discount})
                            </b>
                          </>
                        )}
                      </td>
                      <td> {job.paid} </td>
                      <td> {job.due} </td>
                      <td className="text-center">
                        {job.due > 0 ? (
                          <>
                            <span className="btn btn-danger btn-sm px-5">
                              Due
                            </span>
                          </>
                        ) : job.paid >= job.fee ? (
                          <>
                            <span className="btn btn-success btn-sm px-5">
                              Paid
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm mx-3"
                          onClick={() => transactionHandler(job.id)}
                        >
                          <FaEye /> View
                        </button>

                        {job.due > 0 && (
                          <>
                            <span
                              onClick={() => handlePayment(job.id, job.due)}
                              className="btn btn-outline-success btn-sm mx-3"
                            >
                              <Image
                                src={bkash}
                                alt=""
                                height="10"
                                width="25"
                              />{" "}
                              Make Payment
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  </>
                ))
              ) : (
                <>
                  <tr>
                    <td colSpan={6}>
                      <h6 className="text-center">Loading....</h6>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="container my-4 pc-hide">
          <div className="row">
            {!loading ? (
              jobs?.map((job, i) => (
                <div className={`col-xl-4 col-md-6 mb-4`} key={i}>
                  <div className="card h-100 shadow-lg border-0">
                    <div className={`card-body ${job.due > 0 ? 'bg-ts-red' : 'bg-ts-green'}`}>
                      <h5 className="card-title">
                        <Link
                          href={`/tuition-list/view/${job.student_id}`}
                          className="text-decoration-none"
                        >
                          {job?.student?.title}
                        </Link>
                      </h5>
                      <p className="text-center">
                        <strong><FaCalendar/></strong>{" "}
                        {new Date(job.created_at).toLocaleDateString()}
                      </p>
                      <p className="card-text">
                        <strong>Fee:</strong> {job.fee} BDT
                        {job.discount > 0 && (
                          <span className="text-success">
                            {" "}
                            (Discount: {job.discount} BDT)
                          </span>
                        )}
                      </p>
                      <p className="card-text">
                        <strong>Paid:</strong> {job.paid} BDT
                      </p>
                      <p className="card-text">
                        <strong>Due:</strong> {job.due} BDT
                      </p>

                      <div className="d-flex justify-content-center">
                        {job.due > 0 ? (
                          <span className="badge bg-danger px-4 py-2">Due</span>
                        ) : job.paid >= job.fee ? (
                          <span className="badge bg-success px-4 py-2">
                            Paid
                          </span>
                        ) : (
                          ""
                        )}

                        <button
                          className="btn btn-primary btn-sm mx-2"
                          onClick={() => transactionHandler(job.id)}
                        >
                          <FaEye /> View
                        </button>
                        {job.due > 0 && (
                          <button
                            onClick={() => handlePayment(job.id, job.due)}
                            className="btn btn-outline-success btn-sm mx-2 d-flex align-items-center"
                          >
                            <Image
                              src={bkash}
                              alt="Bkash"
                              height="10"
                              width="25"
                              className="me-1"
                            />
                            Make payment
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <h6 className="text-center">Loading....</h6>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} keyboard="false" centered>
        <Modal.Header closeButton>
          <Modal.Title>Transactions</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ border: "none" }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">TXN_ID</th>
                <th scope="col">Payment</th>
                <th scope="col">Remark</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {!loading2 ? (
                transactions?.data?.map((txn, i) => (
                  <>
                    <tr key={i}>
                      <th scope="row">
                        TXN{moment(txn.created_at).format("hssmm")}P{txn.id}
                      </th>
                      <td>{txn.payment}</td>
                      <td>{txn.remark}</td>
                      <td>{moment(txn.created_at).format("LLL")}</td>
                    </tr>
                  </>
                ))
              ) : (
                <>
                  <tr>
                    <td colSpan={5}>
                      <h6 className="text-center">Loading....</h6>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

TuitionMatching.Layout = PrivateLayout;
