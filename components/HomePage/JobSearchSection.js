import Image from 'next/image'
import React from 'react'
import ImgChart from '../../assets/imgs/page/homepage1/img-chart.png'
import controlCard from "../../assets/imgs/page/homepage1/controlcard.png"
// import imgOne from "../../assets/imgs/page/homepage1/img1.png"
import imgOne from "../../assets/vector/4957136_4957136 (1).jpg"
import { FaSearch } from 'react-icons/fa'

function JobSearchSection() {
  return (
    <section className="section-box overflow-visible mt-20 mb-20">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="box-image-job">
              {/* <Image className="img-job-1" alt="jobBox" src={ImgChart}/>
              <Image className="img-job-2" alt="jobBox" src={controlCard}/> */}
                <figure className="wow animate__animated animate__fadeIn"><Image alt="jobBox" src={imgOne}/></figure>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="content-job-inner text-center"><span className="color-text-mutted text-32">1200+ Running Tuitions... </span>
                <h2 className="text-52 wow animate__animated animate__fadeInUp">Find The One That&rsquo;s <span className="color-brand-2">Right</span> For You</h2>
                <div className="mt-40 pr-50 text-md-lh28 wow animate__animated animate__fadeInUp">
                Search all the open positions on the web. Get your own personalized salary estimate. 
                Read reviews on over 600,000 companies worldwide. The right job is out there.</div>
                <div className="mt-40">
                  <div className="wow animate__animated animate__fadeInUp"><a className="btn btn-default" href="jobs-grid.html"><FaSearch/> Search Tuition</a><a className="btn btn-link" href="page-about.html">Learn More</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default JobSearchSection