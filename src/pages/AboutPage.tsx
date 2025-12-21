
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";

import { Certifications } from "@/components/Certifications";


const AboutPage = () => {
    return (
        <div className="relative">
            <main className="relative z-10 pt-20">
                <About />
                <Skills />
                <Certifications />
            </main>
        </div>
    );
};

export default AboutPage;
