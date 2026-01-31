
import { Experience } from "@/components/Experience";

import SEO from "@/components/SEO";

const InternshipPage = () => {
    return (
        <div className="relative">
            <SEO title="Experience" description="View Bhola Yadav's professional experience and internship history." />
            <main className="relative z-10 pt-20">
                <Experience />
            </main>
        </div>
    );
};

export default InternshipPage;
