import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProjectsPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/", { replace: true, state: { scrollTo: "projects" } });
    }, [navigate]);

    return null;
};

export default ProjectsPage;
