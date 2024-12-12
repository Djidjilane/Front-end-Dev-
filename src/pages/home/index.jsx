import React from "react";
import LayoutComponent from "../../layouts/LayoutComponent";
import CarrouselComponent from "../../components/carrousel/CarrouselComponent";
import AnnouncementBanner from "../../components/announcement-banner/AnnouncementBanner";
import Testimonials from '../../components/testimonial/Testimonial';
import FAQ from '../../components/faq/Faq';
import GamePreview from '../../components/game-preview/GamePreview';
import NewGamesSection from '../../components/new-games-section/NewGamesSection';
import ReferralProgram from '../../components/referral-program/ReferralProgram';
const Welcome = () => {
  return (
    <LayoutComponent>
    <AnnouncementBanner />
    <CarrouselComponent/>
    <GamePreview/>
    <ReferralProgram/>
    <NewGamesSection/>
    <Testimonials/>
    <FAQ/>

    
    </LayoutComponent>
  );
};

export default Welcome;
