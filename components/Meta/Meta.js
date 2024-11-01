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
      <meta name="og:url" content="https://khujenow.com/" />
      <meta name="og:site_name" content="Khuje Now" />
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
  title: "Khuje Now",
  description:
    "Khuje Now - Discover and connect with people or locate lost items on Khujenow.com – your community-driven platform for posting about missing persons or belongings. Join now to help reunite owners with what matters most.",
  keywords:
    "Khuje Now, Find and Lost, Find, Lost, Harano Buggopti, Shondhan, Khuje Pawa, Khoj",
  OGImage: OGImage,
};

export default Meta;
