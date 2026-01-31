
import { Projects } from "@/components/Projects";


import SEO from "@/components/SEO";

const ProjectsPage = () => {
    return (
        <div className="relative">
            <SEO title="Projects" description="Check out my latest full-stack development projects and case studies." />
            <main className="relative z-10 pt-20">
                <Projects />
            </main>
        </div>
    );
};

export default ProjectsPage;
