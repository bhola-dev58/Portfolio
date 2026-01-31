
import { Hero } from "@/components/Hero";


import SEO from "@/components/SEO";

const Home = () => {
    return (
        <div className="relative">
            <SEO title="Home" description="Welcome to Bhola Yadav's Portfolio. Explore my full-stack development projects and skills." />
            <main className="relative z-10 pt-16">
                <Hero />
            </main>
        </div>
    );
};

export default Home;
