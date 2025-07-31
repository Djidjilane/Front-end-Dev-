import React from "react";
import LayoutComponent from "../../layouts/LayoutComponent";
import Hero from "../../components/announcement-banner/Hero";
import Services from "../../components/announcement-banner/Services";
import Companies from "../../components/announcement-banner/Companies";
import JobOffers from "../../components/announcement-banner/JobOffers";
import Materials from "../../components/announcement-banner/Materials";
import Testimonials from "../../components/announcement-banner/Testimonials";
import Stats from "../../components/announcement-banner/Stats";
import CTA from "../../components/announcement-banner/CTA";

const Welcome = () => {
  return (
    <LayoutComponent>
              <Hero />
              <Services />
              <Companies />
              <JobOffers />
              <Testimonials />
              <Stats />
              <CTA />
            
      
      
    
    </LayoutComponent>
  );
};

export default Welcome;
