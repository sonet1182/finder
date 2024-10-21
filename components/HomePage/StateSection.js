import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import publicApi from "../../services/publicApi";

function StateSection() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async (e) => {
    const response = await publicApi.get("api/statistics");
    if (response.status === 200) {
      setInfo(response.data.data);
      console.log(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  return (
    <section className="section-box bg-light py-5 bg-light py-5 parallax">
      <div className="container">
        <div className="row state-text">
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <div className="text-center state-mb16">
              <h2 className="text-light">
                <span className="count">{info.total_request}</span>
                <span>+</span>
              </h2>
              <h5 className="text-light">Total Applied</h5>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <div className="text-center state-mb16">
              <h2 className="text-light">
                <span className="count">{info.total_tutor}</span>
                <span> +</span>
              </h2>
              <h5 className="text-light">Total Tutors</h5>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <div className="text-center state-mb16">
              <h2 className="text-light">
                <span className="count">{info.total_tuition}</span>
                <span> +</span>
              </h2>
              <h5 className="text-light">Live Tuition Jobs</h5>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <div className="text-center state-mb16">
              <h2 className="text-light">
                <span className="count">4.7</span>
                <span></span>
              </h2>
              <h5 className="text-light">Average Tutor Rating</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StateSection;
