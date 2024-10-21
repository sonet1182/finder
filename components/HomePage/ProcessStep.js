import React from "react";
import Image from "next/image";
import Link from "next/link";

function ProcessStep() {
  return (
    <div className="row">
      <div className="steps-main">
        <div className="tabs">
          <div
            aria-label="Process Steps"
            role="group"
            className="btn-group w-100 steps-container"
          >
            <Link href="/auth/register">
              <button
                type="button"
                className="active-process btn btn-secondary"
                data-node-index="0"
              >
                <Image
                  src="/icons/envelope-circle-check-solid.svg"
                  alt="tab-icon"
                  width={42}
                  height={42}
                />
                <div>
                  <span className="step-no">Step 1</span>
                  <p className="text-white mt-2">Free Registeration</p>
                </div>
              </button>
            </Link>

            <button
              type="button"
              className="btn btn-secondary arrow"
              data-node-index="1"
            >
              <Image
                src="/icons/clipboard-question-solid.svg"
                alt="tab-icon"
                width={42}
                height={42}
              />
              <div>
                <span className="step-no">Step 2</span>
                <p className="text-white mt-2">Preliminary Interview</p>
              </div>
            </button>
            <button
              type="button"
              className="btn btn-secondary arrow"
              data-node-index="2"
            >
              <Image
                src="/icons/sheet-plastic-solid.svg"
                alt="tab-icon"
                width={42}
                height={42}
              />
              <div>
                <span className="step-no">Step 3</span>
                <p className="text-white mt-2">Project Introduction</p>
              </div>
            </button>
            <button
              type="button"
              className="btn btn-secondary arrow"
              data-node-index="3"
            >
              <Image
                src="/icons/people-group-solid.svg"
                alt="tab-icon"
                width={42}
                height={42}
              />
              <div>
                <span className="step-no">Step 4</span>
                <p className="text-white mt-2">Client Interview</p>
              </div>
            </button>
            <button
              type="button"
              className="btn btn-secondary arrow"
              data-node-index="4"
            >
              <Image
                src="/icons/handshake-solid.svg"
                alt="tab-icon"
                width={42}
                height={42}
              />
              <div>
                <span className="step-no">Step 5</span>
                <p className="text-white mt-2">Agreement</p>
              </div>
            </button>
            <button
              type="button"
              className="btn btn-secondary arrow"
              data-node-index="5"
            >
              <Image
                src="/icons/laptop-file-solid.svg"
                alt="tab-icon"
                width={42}
                height={42}
              />
              <div>
                <span className="step-no">Step 6</span>
                <p className="text-white mt-2">Business Starts</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessStep;
