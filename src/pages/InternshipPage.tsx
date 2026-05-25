import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InternshipPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/", { replace: true, state: { scrollTo: "experience" } });
    }, [navigate]);

    return null;
};

export default InternshipPage;
