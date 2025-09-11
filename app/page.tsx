"use client"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BuiltWith from "./components/BuiltWith";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Gallery from "./components/landing/sections/GalerySection";
import Services from "./components/landing/sections/ServicesSection";
import HeroSection from "./components/landing/sections/HeroSection";
import ReviewsSection from "./components/landing/sections/ReviewsSection";
import AppSection from "./components/landing/sections/AppSection";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {/* NavBar */}
      <Navbar />
      {/* Hero */}
      <HeroSection />
      {/* Features */}
      <Features />
      {/* Services */}
      <Services />
      {/* Gallery */}
      <Gallery />
      {/* Reviews */}
      <ReviewsSection />
      {/* App CTA */}
      <AppSection />
      {/* FAQ */}
      <FAQ />
      {/* BuiltWith */}
      <BuiltWith />
      {/* Footer */}
      <Footer />
    </div>
  );
}
