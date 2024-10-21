import axios from "axios";
import moment from "moment/moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PrivateLayout from "../../Layouts/PrivateLayout";
import { destroyNote } from "../../services/auth/token";
import publicApi from "../../services/publicApi";

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [texts, setTexts] = useState([]);

  const fetchMsgHandler = async () => {
    setLoading(true);

    axios.get("/sanctum/csrf-cookie").then((res) => {
      axios.get(`api/tutor/notifications`).then((response) => {
        if (response.status === 200) {
          setTexts(response.data);
          destroyNote();
          setLoading(false);
        } else {
          console.log("Server Error");
        }
      });
    });
  };

  useEffect(() => {
    fetchMsgHandler();
  }, []);

  return (
    <>
      <div className="">
        <h3 className="mt-10 mb-10 page-title">Notifications</h3>

        <div className="col-xl-12 col-md-12 my-4 table-responsive card">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Message</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                texts?.data?.map((text, i) =>
                  texts?.data ? (
                    <>
                      <tr key={i}>
                        <td>{text.id}</td>
                        <td>{text.message}</td>
                        <td> {moment(text.created_at).format("LLL")} </td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td colSpan={3}>
                        <h6 className="text-center">No Notification Found!</h6>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <>
                  <tr>
                    <td colSpan={3}>
                      <h6 className="text-center">Loading....</h6>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

Notifications.Layout = PrivateLayout;
