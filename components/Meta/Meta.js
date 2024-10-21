import Head from "next/head";
import React from "react";
import OGImage from "../../assets/images/og_image.jpg";

function Meta({ title, description, keywords }) {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta property="og:image" content={OGImage} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content="https://tutorsheba.com/" />
      <meta name="og:site_name" content="Tutor Sheba" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      {/* <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OGImage} />
      <meta name="twitter:site" content="@example" />
      <meta name="twitter:creator" content="@example" /> */}
    </Head>
  );
}

Meta.defaultProps = {
  title: "Tutor Sheba",
  description:
    "Tutor Sheba - TutorSheba.com is a platform where parents, students and tutors can easily connect with each other. We provide qualified Home/Online tutors to help your child with studies and helping them perform better in exams. We are a group of 2,50,000+ Tutors and 30,000+ satisfied parents/students in Dhaka, Chattagram, Rajshahi, Sylhet, Khulna, Barishal, Rangpur, Mymensingh cities for different academic and professional subjects.",
  keywords:
    "Tutor Sheba, Part Time Job, Tuition Jobs, Home Tutor, Find tuition, Find Tutor",
  OGImage: OGImage,
};

export default Meta;
