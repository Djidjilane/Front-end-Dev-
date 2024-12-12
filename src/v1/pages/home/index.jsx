import React from "react";
import LayoutComponent from "../../layouts/LayoutComponent";
import CarrouselComponent from "../../../v1/components/carrousel/CarrouselComponent";
import AnnouncementBanner from "../../../v1/components/announcement-banner/AnnouncementBanner";
import Testimonials from "../../../v1/components/testimonial/Testimonial";
import FAQ from "../../../v1/components/faq/Faq";
import GamePreview from "../../../v1/components/game-preview/GamePreview";
import NewGamesSection from "../../../v1/components/new-games-section/NewGamesSection";
import ReferralProgram from "../../../v1/components/referral-program/ReferralProgram";
const Welcome = () => {
  return (
    <LayoutComponent>
      <AnnouncementBanner />
      <CarrouselComponent />
      <GamePreview />
      <ReferralProgram />
      <NewGamesSection />
      <Testimonials />
      <FAQ />
    </LayoutComponent>
  );
};

export default Welcome;
