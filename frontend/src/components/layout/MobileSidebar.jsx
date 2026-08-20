import Sidebar from "./Sidebar";

const MobileSidebar = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="mobile-sidebar-wrapper">

            <div
                className="mobile-sidebar-overlay"
                onClick={onClose}
            ></div>

            <aside className="mobile-sidebar">
                <Sidebar
                    mobile
                    onNavigate={onClose}
                />
            </aside>

        </div>
    );
};

export default MobileSidebar;