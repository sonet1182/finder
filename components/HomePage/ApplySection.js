import Link from "next/link";
import React from "react";

function ApplySection() {
  return (
    <>
      <div className="section-box mt-30 mb-30">
        <div className="container">
          <div className="box-we-hiring bg-light neomp">
            <div className="text-1">
              <span className="text-we-are">Want to become</span>
              <span className="text-hiring">Tutor</span>
            </div>
            <div className="text-2">
              Let&rsquo;s <span className="color-brand-1">Work</span> Together
              <br /> &amp; <span className="color-brand-1">Explore</span>{" "}
              Opportunities
            </div>
            <div className="text-3">
              <Link href="/auth/register">
                <button className="btn btn-apply px-5">Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplySection;
