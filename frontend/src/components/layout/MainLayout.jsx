import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";


const MainLayout = () => {
    return (
        <div className="app-layout">
            <Sidebar />

            <div className="app-main">
                <TopNavbar />

                <main className="app-content">
                    <Breadcrumb />

                    <div className="page-content">
                        <Outlet />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;