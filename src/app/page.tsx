"use client"

import {
    FeaturesSection,
    Header,
    HeroSection,
    Demonstation,
    PricingSection,
    ContactSection,
    Footer,
} from "@/components/landing"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-gray-100">
            <Header />
            <main>
                <HeroSection />
                <FeaturesSection />
                <Demonstation />
                <PricingSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    )
}
