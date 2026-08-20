const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="app-footer">

            <div className="footer-content">

                <div className="footer-left">
                    <span>
                        © {currentYear} Leave Management System
                    </span>
                </div>

                <div className="footer-right">
                    <span>
                        Employee Leave Management Platform
                    </span>
                </div>

            </div>

        </footer>
    );
};

export default Footer;