import React, { useContext } from "react";
import ApplySection from "./HomePage/ApplySection";
import StateSection from "./HomePage/StateSection";
import TestimonialSection from "./HomePage/TestimonialSection";
import ScrollButton from "./Common/ScrollButton";
import SearchTutorSection from "./HomePage/SearchTutorSection";
import BannerSection4 from "./HomePage/BannerSection4";
import PopularTeacherSection from "./HomePage/PopularTeacherSection";
import SubjectSpecialist from "./HomePage/SubjectSpecialist";
import TuitionTypesSection from "./HomePage/TuitionTypesSection";
import HowItWorks from "./HomePage/HowItWorks";
import { appContext } from "../pages/_app";
import ServiceCategory from "./HomePage/ServiceCategory";
import FeaturedOn from "./HomePage/FeaturedOn";
import BannerSection from "./HomePage/BannerSection";

function MainContent() {
  const value = useContext(appContext);

  return (
    <>
      <main className="main">
        <BannerSection />

        <BannerSection4 districts={value?.districts} />

        <SearchTutorSection />

        <PopularTeacherSection />

        <SubjectSpecialist />

        <StateSection />

        <TuitionTypesSection />

        <ApplySection />

        <TestimonialSection />

        <ServiceCategory />

        <HowItWorks />

        <FeaturedOn />

        <ScrollButton />
      </main>
    </>
  );
}

export default MainContent;
