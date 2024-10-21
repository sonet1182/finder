import React, { useState } from "react";
import ShebaUddoktaLayout, { affContext } from "./ShebaUddoktaLayout";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useEffect } from "react";
import swal from "sweetalert";

function Refer() {
  const values = useContext(affContext);

  const router = useRouter();
  const currentUrl = router.asPath;

  const [value, setValue] = useState(currentUrl);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(value);
    swal("Link Copied", "", "success");
  };

  useEffect(() => {
    setValue('https://tutorsheba.com/refer/'+values?.user?.ref_id)
  }, [values]);

  return (
    <>
      <h5 className="mt-10 mb-10 page-title">Sheba Uddokta Referrel</h5>

      <div className="card p-3">
        <p>
          ১:- নিচের &quot;URL&quot; লিংকটি কপি করে যেকোনো জায়গায় শেয়ার করুন। যেমন:-
          ফেইসবুক, মেসেঞ্জার, হোয়াটস্যাপ, লিংকডইন, টুইটার, ইন্সট্রাগ্রাম ও
          ইউটিউব সহ যেকোনো সোশ্যাল মিডিয়া প্ল্যাটফর্মে। যত বেশি শেয়ার করবেন
          আপনার প্রোফাইলে ততো বেশি লিড জমা হবে। তাই যত বেশি রেফার ততো বেশি আয়।
        </p> <br></br>

        <p>
          ২:- টিউটর প্রয়োজন এমন কেও আপনার শেয়ার করা লিংকটি থেকে তথ্য দিলে তা
          আপনার দেওয়া লিড হিসেবে গণ্য হবে আর এভাবেই আমাদের সাথে আপনার আয়ের
          প্রক্রিয়া শুরু হয়ে যাবে।
        </p> <br></br>

        <p>
          ৩:- &quot;Add Leads&quot; অপশন থেকে আপনার নিজের দেওয়া লিডস এবং &quot;Reference Link&quot;
          শেয়ারের মাধ্যমে প্রাপ্ত লিডস এই দুইভাবে প্রাপ্ত সর্বমোট লিডস থেকে
          আমাদের টিউটর দ্বারা কন্ফার্ম লিডস-এর টিউটর প্রদত্ত প্ল্যাটফর্ম চার্জ
          ৬০% এর মধ্যে আপনার একাউন্ট এ আপনি পেয়ে যাবেন ১২% কমিশন।
        </p> <br></br>

        <p>
          ৪:- যে লিডসগুলু কন্ফার্ম হবে সেইগুলুর প্রাপ্ত কমিশন আপনার পেমেন্ট অপশন
          এ জমা হবে। আপনি যেকোনো সময় &quot;Withdraw Request&quot; দিয়ে আপনার সরবরাহকৃত
          মোবাইল ফাইন্যান্সিয়াল সার্ভিস নম্বরে আপনার উপার্জিত টাকা গ্রহণ করতে
          পারবেন।
        </p> <br></br>

        <p>
          ৫:- লিডস প্রদান থেকে পেমেন্ট গ্রহণ পর্যন্ত যেকোনো প্রয়োজনে আমাদের
          প্রতিনিধির সাথে যোগাযোগ করতে পারেন <a className="text-primary font-lg" href="tel:09613575388">09613575388</a> এই নম্বরে।
        </p> <br></br>

        <hr></hr>

       

        <div className="text-center">
        <h5 className="text-purple">Copy your referrel link from here:</h5>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="my-2"/>
      <button className="btn btn-success px-3" onClick={handleCopyClick}>Copy Link</button>
    </div>
      </div>
    </>
  );
}

export default Refer;

Refer.Layout = ShebaUddoktaLayout;
