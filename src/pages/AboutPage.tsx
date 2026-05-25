import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/", { replace: true, state: { scrollTo: "about" } });
    }, [navigate]);

    return null;
};

export default AboutPage;
