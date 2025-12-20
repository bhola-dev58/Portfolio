
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";


const AboutPage = () => {
    return (
        <div className="relative">
            <main className="relative z-10 pt-20">
                <About />
                <Skills />
                <Experience />
                <Certifications />
            </main>
        </div>
    );
};

export default AboutPage;
