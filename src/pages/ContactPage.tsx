
import { Contact } from "@/components/Contact";


import SEO from "@/components/SEO";

const ContactPage = () => {
    return (
        <div className="relative">
            <SEO title="Contact" description="Get in touch with Bhola Yadav for freelance work or job opportunities." />
            <main className="relative z-10 pt-20">
                <Contact />
            </main>
        </div>
    );
};

export default ContactPage;
