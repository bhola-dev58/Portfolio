
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";

import { Certifications } from "@/components/Certifications";


import SEO from "@/components/SEO";

const AboutPage = () => {
    return (
        <div className="relative">
            <SEO title="About Me" description="Learn more about Bhola Yadav's background, skills, and certifications." />
            <main className="relative z-10 pt-20">
                <About />
                <Skills />
                <Certifications />
            </main>
        </div>
    );
};

export default AboutPage;
