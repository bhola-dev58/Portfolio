import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title: string;
    description?: string;
}

const SEO = ({ title, description }: SEOProps) => {
    const location = useLocation();

    useEffect(() => {
        // Update Title
        document.title = `${title} | Bhola Yadav`;

        // Update Meta Description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description || 'Portfolio of Bhola Yadav - Full Stack Developer');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = description || 'Portfolio of Bhola Yadav - Full Stack Developer';
            document.head.appendChild(meta);
        }
    }, [title, description, location]);

    return null;
};

export default SEO;
