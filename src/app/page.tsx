"use client"

import ContactSection from "@/components/landing/ContactSection"
import HowItWorksSection from "@/components/landing/Demonstation"
import FeaturesSection from "@/components/landing/FeaturesSection"
import Footer from "@/components/landing/Footer"
import Header from "@/components/landing/Header"
import HeroSection from "@/components/landing/HeroSection"
import PricingSection from "@/components/landing/PricingSection"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-gray-100">
            <Header />
            <main>
                <HeroSection />
                <FeaturesSection />
                <HowItWorksSection />
                <PricingSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    )
}
