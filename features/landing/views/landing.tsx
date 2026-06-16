import { Footer, HeroSection, HowItWorksSection, Navbar, NewsletterSection, ServicesSection, TrustBarSection, WellnessBannerSection, WhyChooseSection } from "../components"

const Landing = () => {
    return (
        <div className="w-full flex flex-col">
            <Navbar />
            <HeroSection />
            <ServicesSection />
            <HowItWorksSection />
            <WhyChooseSection />
            <WellnessBannerSection />
            <TrustBarSection />
            <NewsletterSection />
            <Footer />
        </div>
    )
}

export default Landing