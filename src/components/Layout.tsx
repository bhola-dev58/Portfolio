import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeBackground from "@/components/ThreeBackground";
import { CustomCursor } from "@/components/CustomCursor";

const Layout = () => {
    return (
        <div className="relative">
            {/* Premium custom cursor — replaces OS arrow on desktop */}
            <CustomCursor />
            {/* R3F magnetic field 3D background */}
            <ThreeBackground />
            <Navbar />
            <div className="min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
