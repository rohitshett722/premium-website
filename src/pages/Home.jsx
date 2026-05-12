
import AIAutomationProMax from "../components/AIAutomationProMax";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import LeadCaptureProMax from "../components/LeadCaptureProMax";
import PortfolioProMax from "../components/PortfolioProMax";
import ProcessTimeline from "../components/ProcessTimeline";
import SelectedWork from "../components/SelectedWork";
import Services from "../components/Services";
import TechStackProMax from "../components/TechStackProMax";
import TrustEcosystem from "../components/TrustEcosystem";
import WhyChooseMe from "../components/WhyChooseMe";
import WhyChooseMe2 from "../components/WhyChooseMe2"; // <-- Naya import yahan hai

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TrustEcosystem/>
      <Services/>
      <WhyChooseMe2 />
      <WhyChooseMe/>
      <PortfolioProMax/>
      <TechStackProMax/>
      <ProcessTimeline/>
      <AIAutomationProMax/>
      <LeadCaptureProMax/>
      <SelectedWork/>
      
     <Footer/>
      
      
      
      
    </main>
  );
}
