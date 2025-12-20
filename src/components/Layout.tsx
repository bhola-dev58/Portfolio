import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = () => {
    return (
        <div className="relative">
            <Navbar />
            <div className="min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
