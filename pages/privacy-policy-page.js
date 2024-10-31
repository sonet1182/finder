import React from 'react'
import MasterLayout from "../Layouts/MasterLayout";
import { useEffect } from 'react';
import { useState } from 'react';
import Meta from '../components/Meta/Meta';
import publicApi from '../services/publicApi';
import { decode } from 'html-entities';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';

function PrivacyPolicyPage() {
    const [policy, setPolicy] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async (e) => {
        const response = await publicApi.get("api/privacy-policy");
        if (response.status === 200) {
            setLoading(false);
          setPolicy(response.data.data);
        } else {
          console.log("Server Error");
        }
      };


    useEffect(() => {
        getData();
      }, []);

      const skeletonLoader = (<>
        <main className="name">
        <section className="section-box mt-20 mb-50">
          <div className="container">
          <div className="privacy-page">
            <h2><Skeleton width={250} height={40}/></h2>
            <p className="mb-3 mt-3"><Skeleton height={15} width={320}/></p>
            <div className="part-one">                
            <Skeleton height={20} count={20}/>
            </div>
        </div>
          </div>
        </section>
      </main>
      </>)
    
      

  return (
    <>
      <Meta title="Privacy Policy | Khuje Now" />
      {loading ? skeletonLoader : <main className="name">
        <section className="section-box mt-20 mb-50">
          <div className="container">
          <div className="privacy-page">
            <h2>{policy.privacy_title}</h2>
            <p className="mb-3">Last updated: {policy.privacy_title && moment(policy.updated_at).format("LL")}</p>
            <div className="part-one">                
                {/* {policy.privacy_content} */}
                <div dangerouslySetInnerHTML={{ __html: decode(policy.privacy_content) }} />
            </div>
        </div>
          </div>
        </section>
      </main>}
    </>
  )
}

PrivacyPolicyPage.Layout = MasterLayout;

export default PrivacyPolicyPage