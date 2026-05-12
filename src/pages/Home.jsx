
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import SelectedWork from "../components/SelectedWork";
import Services from "../components/Services";
import TrustEcosystem from "../components/TrustEcosystem";
import WhyChooseMe from "../components/WhyChooseMe";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TrustEcosystem/>
      <Services/>
      <WhyChooseMe/>
      <SelectedWork/>
     <Footer/>
      
      
      
      
    </main>
  );
}
