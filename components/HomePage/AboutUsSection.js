import Image from "next/image";
import React from "react";
import sideImg from "../../assets/vector/Online learning-pana.svg";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import Link from "next/link";

function AboutUsSection() {
  return (
    <section className="section-box mt-50">
      <div className="text-center">
        <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">
          আমাদের সম্পর্কে
        </h2>
        <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp mb-hide">
          "খুঁজে নাও - হারানো জিনিস ফিরে পাওয়ার সহজ উপায়।"
        </p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 item-center">
            <div className="text-center d-lg-block shape-1 mt-50">
              <Image src={sideImg} alt="svg" />
            </div>

            <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp text-center pc-hide">
              Find Your Tution Jobs, in your area
            </p>
          </div>
          <div className="col-md-6">
            <div
              className="py-3 mt-40 wow animate__animated animate__fadeIn"
              data-wow-delay=".2s"
            >
              <div className="py-3 font-md color-text-paragraph-2 wow animate__animated animate__fadeInUp">
                <div className="about-container">
                  <p className="about-content">
                    খুঁজে নাও হলো একটি অনন্য অনলাইন প্ল্যাটফর্ম, যেখানে মানুষ
                    হারানো জিনিসপত্রের খোঁজ দিতে এবং পাওয়া জিনিসের তথ্য শেয়ার
                    করতে পারে। আমাদের মিশন হলো হারিয়ে যাওয়া জিনিসগুলোকে সহজে
                    এবং দ্রুত তাদের প্রকৃত মালিকের কাছে ফিরিয়ে দেওয়া। এটি একটি
                    কমিউনিটি-ভিত্তিক উদ্যোগ, যেখানে প্রত্যেকে একে অপরের প্রতি
                    সহযোগিতার হাত বাড়িয়ে দেয়।
                  </p>
                  <p className="about-content">
                    আমাদের প্ল্যাটফর্মটি তৈরি করা হয়েছে মানুষকে সাহায্য করার
                    লক্ষ্যে। প্রতিদিন অনেক মানুষ তাদের প্রিয় জিনিস হারিয়ে
                    ফেলেন—এটি হতে পারে আপনার মানিব্যাগ, মোবাইল ফোন, পরিচয়পত্র,
                    ঘড়ি, অথবা যেকোনো গুরুত্বপূর্ণ জিনিসপত্র। খুঁজে নাও-তে, আপনি
                    সহজেই আপনার হারানো জিনিসের বিস্তারিত তথ্য দিয়ে একটি পোস্ট
                    করতে পারেন। পাশাপাশি, যদি আপনি কোনো হারানো জিনিস পান, তাহলে
                    সেটির তথ্যও আমাদের মাধ্যমে শেয়ার করতে পারেন, যাতে প্রকৃত
                    মালিক দ্রুত সেটি খুঁজে পান।
                  </p>
                  <p className="about-content">
                    আমরা বিশ্বাস করি, মানুষের মধ্যে সহযোগিতা এবং যোগাযোগ
                    বাড়িয়ে তোলার মাধ্যমে হারানো জিনিস ফিরে পাওয়া সহজ হয়।
                    খুঁজে নাও - সেই মাধ্যম, যা মানুষকে সংযুক্ত করে হারানো এবং
                    পাওয়া জিনিসের তথ্য আদান-প্রদানে সহায়তা করে। আমাদের
                    ব্যবহারকারীরা একে অপরের সাহায্যে দ্রুত এবং কার্যকরভাবে তাদের
                    হারানো জিনিস খুঁজে পান।
                  </p>
                  <div className="about-content">
                    আমাদের সেবার বৈশিষ্ট্য:
                    <ul>
                      <li>সহজ এবং দ্রুত পোস্ট করার সুবিধা।</li>
                      <li>
                        হারানো বা পাওয়া জিনিসের বিস্তারিত তথ্য শেয়ারের সুযোগ।
                      </li>
                      <li>
                        সকলের জন্য উন্মুক্ত এবং বিনামূল্যে ব্যবহারযোগ্য
                        প্ল্যাটফর্ম।
                      </li>
                      <li>
                        মানুষকে তাদের হারানো জিনিস ফিরে পেতে সাহায্য করার একটি
                        দায়বদ্ধ প্রচেষ্টা।
                      </li>
                    </ul>
                  </div>
                  <p className="about-content">
                    খুঁজে নাও - শুধু একটি প্ল্যাটফর্ম নয়, এটি একটি মানুষের
                    সহানুভূতির দৃষ্টান্ত। আমাদের সাথে থেকে আপনিও হারানো জিনিস
                    খুঁজে পেতে এবং অন্যকে সাহায্য করতে পারেন।
                  </p>
                </div>
              </div>

              {/* <div className="w-100 text-center">
                <Link href="/tuition-list">
                  <a className="animated-button1 text-light link">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <FaSearch className="text-light" /> Search Tution{" "}
                    <FaArrowRight />
                  </a>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;
