import React, { useContext } from "react";
import ApplySection from "./HomePage/ApplySection";
import StateSection from "./HomePage/StateSection";
import TestimonialSection from "./HomePage/TestimonialSection";
import ScrollButton from "./Common/ScrollButton";
import PopularTeacherSection from "./HomePage/PopularTeacherSection";
import SubjectSpecialist from "./HomePage/SubjectSpecialist";
import TuitionTypesSection from "./HomePage/TuitionTypesSection";
import HowItWorks from "./HomePage/HowItWorks";
import { appContext } from "../pages/_app";
import ServiceCategory from "./HomePage/ServiceCategory";
import FeaturedOn from "./HomePage/FeaturedOn";
import BannerSection from "./HomePage/BannerSection";
import MapEmbed from "./HomePage/MapEmbed";
import AboutUsSection from "./HomePage/AboutUsSection";

function MainContent() {
  const value = useContext(appContext);

  return (
    <>
      <main className="main">
        <BannerSection />

        <AboutUsSection />

        {/* <PopularTeacherSection />

        <SubjectSpecialist />

        <StateSection />

        <TuitionTypesSection />

        <ApplySection />

        <TestimonialSection />

        <ServiceCategory />

        <HowItWorks /> */}

        <FeaturedOn />

        <ScrollButton />

        <MapEmbed/>
        
      </main>
    </>
  );
}

export default MainContent;
