
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-6 mt-10 border-t border-border/50 bg-background/50 backdrop-blur-md">
            <div className="container mx-auto px-4 text-center">
                <p className="text-muted-foreground text-sm">
                    &copy; {currentYear} Bhola Yadav. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
