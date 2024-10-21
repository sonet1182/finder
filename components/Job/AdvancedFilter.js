import React from "react";

function AdvancedFilter() {
  return (
    <div className="sidebar-shadow none-shadow mb-30">
      <div className="sidebar-filters">
        <div className="filter-block head-border mb-30">
          <h5>
            Advance Filter{" "}
            <a className="link-reset" href="#">
              Reset
            </a>
          </h5>
        </div>
        <div className="filter-block mb-30">
          <div className="form-group select-style select-style-icon">
            <select className="form-control form-icons select-active">
              <option>Tokyo, Japan</option>
              <option>London</option>
              <option>Paris</option>
              <option>Berlin</option>
            </select>
            <i className="fi-rr-marker"></i>
          </div>
        </div>
        <div className="filter-block mb-20">
          <h5 className="medium-heading mb-15">Industry</h5>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input type="checkbox" checked="checked" readOnly />
                  <span className="text-small">All</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">180</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Software</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">12</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Finance</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">23</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Recruting</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">43</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Management</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">65</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Advertising</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">76</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="filter-block mb-20">
          <h5 className="medium-heading mb-25">Salary Range</h5>
          <div className="list-checkbox pb-20">
            <div className="row position-relative mt-10 mb-20">
              <div className="col-sm-12 box-slider-range">
                <div id="slider-range"></div>
              </div>
              <div className="box-input-money">
                <input
                  className="input-disabled form-control min-value-money"
                  type="text"
                  name="min-value-money"
                  disabled="disabled"
                  value=""
                />
                <input
                  className="form-control min-value"
                  type="hidden"
                  name="min-value"
                  value=""
                />
              </div>
            </div>
            <div className="box-number-money">
              <div className="row mt-30">
                <div className="col-sm-6 col-6">
                  <span className="font-sm color-brand-1">$0</span>
                </div>
                <div className="col-sm-6 col-6 text-end">
                  <span className="font-sm color-brand-1">$500</span>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group mb-20">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input type="checkbox" checked="checked" readOnly />
                  <span className="text-small">All</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">145</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">$0k - $20k</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">56</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">$20k - $40k</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">37</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">$40k - $60k</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">75</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">$60k - $80k</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">98</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">$80k - $100k</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">14</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">$100k - $200k</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">25</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="filter-block mb-30">
          <h5 className="medium-heading mb-10">Popular Keyword</h5>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input type="checkbox" checked="checked" readOnly />
                  <span className="text-small">Software</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">24</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Developer</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">45</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Web</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">57</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="filter-block mb-30">
          <h5 className="medium-heading mb-10">Position</h5>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Senior</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">12</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" checked="checked"  readOnly/>
                  <span className="text-small">Junior</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">35</span> 
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Fresher</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">56</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="filter-block mb-30">
          <h5 className="medium-heading mb-10">Experience Level</h5>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Internship</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">56</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Entry Level</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">87</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" checked="checked" readOnly />
                  <span className="text-small">Associate</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">24</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Mid Level</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">45</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Director</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">76</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Executive</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">89</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="filter-block mb-30">
          <h5 className="medium-heading mb-10">Onsite/Remote</h5>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">On-site</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">12</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" checked="checked" readOnly />
                  <span className="text-small">Remote</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">65</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Hybrid</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">58</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="filter-block mb-30">
          <h5 className="medium-heading mb-10">Job Posted</h5>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input type="checkbox" checked="checked" readOnly />
                  <span className="text-small">All</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">78</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">1 day</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">65</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">7 days</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">24</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">30 days</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">56</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="filter-block mb-20">
          <h5 className="medium-heading mb-15">Job type</h5>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Full Time</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">25</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" checked="checked" readOnly />
                  <span className="text-small">Part Time</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">64</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Remote Jobs</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">78</span>
              </li>
              <li>
                <label className="cb-container">
                  <input type="checkbox" />
                  <span className="text-small">Freelancer</span>
                  <span className="checkmark"></span>
                </label>
                <span className="number-item">97</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedFilter;
