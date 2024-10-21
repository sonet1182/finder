import React from "react";
import { FaArrowRight, FaMapMarkedAlt, FaSearch } from "react-icons/fa";

function BannerSection() {
  return (
    <>
      <section className="section-box">
        <div className="banner-hero hero-2 hero-3">
          <div className="banner-inner">
            <div className="block-banner">
              <h1 className="text-42 color-white wow animate__animated animate__fadeInUp">
                The #1 <span className="color-green">Job Board for</span>
                <br className="d-none d-lg-block"></br>Hiring or Find your next
                job
              </h1>
              <div
                className="font-lg font-regular color-white mt-20 wow animate__animated animate__fadeInUp"
                data-wow-delay=".1s"
              >
                Each month, more than 3 million job seekers turn to website in
                their search for work, making over 140,000 applications every
                single day
              </div>
              <div
                className="form-find mt-40 wow animate__animated animate__fadeIn"
                data-wow-delay=".2s"
              >
                <form>
                  <div className="box-industry">
                    <select className="form-input mr-10 select-active input-industry">
                      <option value="0">All District</option>
                      <option value="1">Dhaka</option>
                      <option value="2">Rajshahi</option>
                      <option value="2">Chittagong</option>
                    </select>
                  </div>
                  <select className="form-input mr-10 select-active">
                    <option value="">All Type</option>
                    <option value="AX">Aland Islands</option>
                    <option value="ZM">Zambia</option>
                    <option value="ZW">Zimbabwe</option>
                  </select>
                  <input
                    className="form-input input-keysearch mr-10"
                    type="text"
                    placeholder="Your keyword... "
                  />

                  <div className="wrap2">
                    <button className="button2">
                      <FaSearch className="text-light" /> Search
                      <FaArrowRight />
                    </button>
                  </div>
                </form>
              </div>
              <div
                className="list-tags-banner mt-20 wow animate__animated animate__fadeInUp"
                data-wow-delay=".3s"
              >
                <strong>Popular Searches:</strong>
                <a href="#">Designer</a>, <a href="#">Web</a>,{" "}
                <a href="#">IOS</a>, <a href="#">Developer</a>,{" "}
                <a href="#">PHP</a>, <a href="#">Senior</a>,{" "}
                <a href="#">Engineer</a>
              </div>
            </div>
          </div>
          <div className="container mt-60">
            <div className="box-swiper mt-50">
              <div className="swiper-container swiper-group-5 swiper">
                <div className="swiper-wrapper pb-25 pt-5">
                  <div className="swiper-slide hover-up">
                    <a href="jobs-list.html">
                      <div className="item-logo">
                        <div className="image-left">
                          <img
                            alt="jobBox"
                            src="assets/imgs/page/homepage1/marketing.svg"
                          />
                        </div>
                        <div className="text-info-right">
                          <h4>Marketing &amp; Sale</h4>
                          <p className="font-xs">
                            1526<span> Jobs Available</span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="swiper-slide hover-up">
                    <a href="jobs-grid.html">
                      <div className="item-logo">
                        <div className="image-left">
                          <img
                            alt="jobBox"
                            src="assets/imgs/page/homepage1/customer.svg"
                          />
                        </div>
                        <div className="text-info-right">
                          <h4>Customer Help</h4>
                          <p className="font-xs">
                            185<span> Jobs Available</span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="swiper-slide hover-up">
                    <a href="jobs-grid.html">
                      <div className="item-logo">
                        <div className="image-left">
                          <img
                            alt="jobBox"
                            src="assets/imgs/page/homepage1/finance.svg"
                          />
                        </div>
                        <div className="text-info-right">
                          <h4>Finance</h4>
                          <p className="font-xs">
                            168<span> Jobs Available</span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="swiper-slide hover-up">
                    <a href="jobs-list.html">
                      <div className="item-logo">
                        <div className="image-left">
                          <img
                            alt="jobBox"
                            src="assets/imgs/page/homepage1/lightning.svg"
                          />
                        </div>
                        <div className="text-info-right">
                          <h4>Software</h4>
                          <p className="font-xs">
                            1856<span> Jobs Available</span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="swiper-slide hover-up">
                    <a href="jobs-grid.html">
                      <div className="item-logo">
                        <div className="image-left">
                          <img
                            alt="jobBox"
                            src="assets/imgs/page/homepage1/human.svg"
                          />
                        </div>
                        <div className="text-info-right">
                          <h4>Human Resource</h4>
                          <p className="font-xs">
                            165<span> Jobs Available</span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="swiper-slide hover-up">
                    <a href="jobs-grid.html">
                      <div className="item-logo">
                        <div className="image-left">
                          <img
                            alt="jobBox"
                            src="assets/imgs/page/homepage1/management.svg"
                          />
                        </div>
                        <div className="text-info-right">
                          <h4>Management</h4>
                          <p className="font-xs">
                            965<span> Jobs Available</span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="swiper-slide hover-up">
                    <a href="jobs-list.html">
                      <div className="item-logo">
                        <div className="image-left">
                          <img
                            alt="jobBox"
                            src="assets/imgs/page/homepage1/retail.svg"
                          />
                        </div>
                        <div className="text-info-right">
                          <h4>Retail &amp; Products</h4>
                          <p className="font-xs">
                            563<span> Jobs Available</span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="swiper-slide hover-up">
                    <a href="jobs-grid.html">
                      <div className="item-logo">
                        <div className="image-left">
                          <img
                            alt="jobBox"
                            src="assets/imgs/page/homepage1/security.svg"
                          />
                        </div>
                        <div className="text-info-right">
                          <h4>Security Analyst</h4>
                          <p className="font-xs">
                            254<span> Jobs Available</span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="swiper-slide hover-up">
                    <a href="jobs-grid.html">
                      <div className="item-logo">
                        <div className="image-left">
                          <img
                            alt="jobBox"
                            src="assets/imgs/page/homepage1/content.svg"
                          />
                        </div>
                        <div className="text-info-right">
                          <h4>Content Writer</h4>
                          <p className="font-xs">
                            142<span> Jobs Available</span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="swiper-slide hover-up">
                    <a href="jobs-list.html">
                      <div className="item-logo">
                        <div className="image-left">
                          <img
                            alt="jobBox"
                            src="assets/imgs/page/homepage1/research.svg"
                          />
                        </div>
                        <div className="text-info-right">
                          <h4>Market Research</h4>
                          <p className="font-xs">
                            532<span> Jobs Available</span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="swiper-pagination swiper-pagination-style-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BannerSection;
