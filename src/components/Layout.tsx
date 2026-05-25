import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeBackground from "@/components/ThreeBackground";

const Layout = () => {
    return (
        <div className="relative">
            <Navbar />
            {/* True R3F 3D interactive background */}
            <ThreeBackground />
            <div className="min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
