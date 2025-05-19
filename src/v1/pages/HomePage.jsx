
import Hero from '../components/announcement-banner/Hero';
import Services from '../components/announcement-banner/Services';
import Companies from '../components/announcement-banner/Companies';
import JobOffers from '../components/announcement-banner/JobOffers';
import Materials from '../components/announcement-banner/Materials';
import Testimonials from '../components/announcement-banner/Testimonials';
import Stats from '../components/announcement-banner/Stats';
import CTA from '../components/announcement-banner/CTA';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow">
        <Hero />
        <Services />
        <Companies />
        <JobOffers />
        <Materials />
        <Testimonials />
        <Stats />
        <CTA />
      </main>
      
    </div>
  );
};

export default HomePage;