import React from 'react'
import Skeleton from 'react-loading-skeleton'

function TuitionDetailsSkeleton() {
  return (
    <section className="section-box mt-20">
            <div className="container">
              <div className="row d-flex">
                <div className="col-md-9 mx-auto">
                  <div className="box-border-single">
                    <div className="container">
                      <div className="tuition-list">
                        <div className="">
                        <div className='text-center'>
                        <Skeleton height={26} />
                        </div>
                            

                          <p className="text-center font-md">
                            <b><Skeleton height={12} width={200} /></b> <Skeleton height={12} width={200} /> &nbsp; &nbsp;
                            <span className="m-line"></span>{" "}
                            <b><Skeleton height={12} width={200} /></b>
                            <Skeleton height={12} width={200} />
                          </p>

                    

                          <h4 className="text-center">
                          <Skeleton height={16} width={200} />
                          </h4>

                          <div className="job-details py-5 text-center">
                            <div className="row">
                              <div className="col-md-4">
                              <Skeleton height={12} width={200} />
                              </div>
                              <div className="col-md-4">
                              <Skeleton height={12} width={200} />
                              </div>
                              <div className="col-md-4">
                              <Skeleton height={12} width={200} />
                              </div>

                              <div className="col-md-4">
                              <Skeleton height={12} width={200} />
                              </div>
                              <div className="col-md-4">
                              <Skeleton height={12} width={200} />
                              </div>

                              <div className="col-md-4">
                              <Skeleton height={12} width={200} />
                              </div>
                              <div className="col-md-4">
                              <Skeleton height={12} width={200} />
                              </div>
                              <div className="col-md-4">
                              <Skeleton height={12} width={200} />
                              </div>
                            </div>

                            <div className="row" style={{ marginTop: "3rem" }}>
                              <div className="col-md-8">
                              <Skeleton height={12} />
                              </div>
                              <div className="col-md-4">
                              <Skeleton height={18}/>

                              <Skeleton height={12} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="">
                        <Skeleton height={15} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  )
}

export default TuitionDetailsSkeleton