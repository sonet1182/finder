import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../assets/images/logo/logo.png";
import qrImg from "../assets/images/qr_code.png";
import playStore from "../assets/images/playStore.svg";
import bkash from "../assets/images/bkash.svg";
import ytIcon from "../assets/images/youtube_1384060.png";

function Footer() {
  return (
    <>
      <footer className="footer bg-light pt-50">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-5 col-lg-5">
              <Link passHref href="/">
                <a>
                  {" "}
                  <Image alt="logo" src={Logo} width="200" height="65" />
                </a>
              </Link>
              <div className="mt-20 mb-20 font-xs color-text-paragraph-2">
                <b className="text-primary">khujenow.com</b> একটি সম্প্রদায়-ভিত্তিক প্ল্যাটফর্ম, যেখানে
                ব্যবহারকারীরা তাদের হারানো জিনিসপত্রের খোঁজ দিতে পারেন এবং যদি
                কেউ কোনো হারানো জিনিস পেয়ে থাকে, সে তার তথ্য পোস্ট করতে পারে।
                আমাদের লক্ষ্য হলো মানুষকে তাদের হারিয়ে যাওয়া মূল্যবান জিনিস
                ফিরে পেতে সাহায্য করা। আমরা বিশ্বাস করি, সকলের সম্মিলিত
                প্রচেষ্টার মাধ্যমে হারানো জিনিসপত্র সহজেই খুঁজে পাওয়া সম্ভব।
                খুঁজে নাও আপনাকে সেই সুযোগটি করে দেয়, যাতে হারানো জিনিস দ্রুত
                ফিরে আসে।
              </div>
              <div className="footer-social">
                <a
                  className="icon-socials icon-facebook"
                  href="https://www.facebook.com/tutorsheba.official?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width="100"
                    height="100"
                    alt="facebook logo"
                    src="https://cdn.iconscout.com/icon/free/png-256/facebook-logo-2019-1597680-1350125.png"
                  />
                </a>
                <a
                  className="icon-socials icon-whatsapp"
                  href="https://wa.me/01722575388"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width="100"
                    height="100"
                    alt="WhatsApp icon"
                    src="https://cdn.iconscout.com/icon/free/png-256/whatsapp-1653084-1402372.png"
                  />
                </a>
                <a
                  className="icon-socials icon-linkedin"
                  href="https://www.youtube.com/@tutorsheba"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width="100"
                    height="100"
                    alt="LinkedIn icon"
                    src={ytIcon}
                  />
                </a>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-2  col-lg-2">
              <h6 className="mb-20">Resources</h6>
              <ul className="menu-footer">
                <li>
                  <Link passHref href="#">
                    About us
                  </Link>
                </li>
                <li>
                  <Link passHref href="#">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link passHref href="#">
                    Products
                  </Link>
                </li>
                <li>
                  <Link passHref href="/contact">
                    Contact
                  </Link>
                </li>
                {/* <li>
                  <Link passHref href="/uddokta/home">
                    <b className="text-purple link">
                      {" "}
                      <FaHandshake /> <strong>Sheba Uddokta</strong>
                    </b>
                  </Link>
                </li>
                <li className="link">
                  <Link passHref href="/logo">
                    <img alt="LinkedIn icon" src="favicon.png" />
                  </Link>
                </li> */}
              </ul>
            </div>

            <div className="col-6 col-sm-6 col-md-2 col-lg-2">
              <h6 className="mb-20">More</h6>
              <ul className="menu-footer">
                <li>
                  <Link passHref href="#">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link passHref href="#">
                    Help
                  </Link>
                </li>
                <li>
                  <Link passHref href="#">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link passHref href="#">
                    FAQ
                  </Link>
                </li>
                <li>
                  <b>Pay Now</b>
                  <a href="https://shop.bkash.com/offer-shop-dot-com-dot-bd01400/paymentlink">
                    <Image src={bkash} height="80" width="180" alt="" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-12 col-sm-12 col-md-3 col-lg-3">
              <h6 className="mb-20">Download Our Mobile App</h6>
              <div>
                <Image src={qrImg} height="120" width="120" />
                <p>
                  Our Android App is available right now. Scan the QR Code or
                  Click the Button to Download
                </p>
                <a href="https://graphql.org/learn/queries/">
                  <Image src={playStore} height="60" width="160" />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom mt-50">
            <div className="row">
              <div className="col-12 col-md-6 ">
                <span className="font-xs color-text-paragraph">
                  Copyright &copy; 2022. Khuje Now all right reserved
                </span>
              </div>
              <div className="col-12 col-md-6  ">
                <div className="footer-social">
                  <ul className="d-flex justify-content-end footer-privacy">
                    <li className="mr-10">
                      <Link
                        passHref
                        style={{ paddingRight: "10px" }}
                        className="font-xs   color-text-paragraph"
                        href="/privacy-policy-page"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    {/* <li className="mr-10">
                      <Link
                        passHref
                        style={{ paddingRight: "10px" }}
                        className="font-xs bg-primary color-text-paragraph"
                        href="#"
                      >
                        Terms &amp; Conditions
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        passHref
                        style={{ paddingRight: "10px" }}
                        className="font-xs bg-primary color-text-paragraph"
                        href="#"
                      >
                        Security
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
