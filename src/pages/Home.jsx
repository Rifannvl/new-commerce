import BentoHero from "../components/BentoHero";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SliderProducts from "../components/SliderProducts";
import MainLayout from "../layout/MainLayout";

export default function Home() {
  return (
    <div className="bg-neutral-900">
      <Header />
      <BentoHero />
      <SliderProducts />
      <Footer />
    </div>
  );
}
