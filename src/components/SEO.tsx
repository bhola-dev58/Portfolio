import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
}

const SEO = ({ title, description, image }: SEOProps) => {
    const location = useLocation();

    useEffect(() => {
        const fullTitle = title === 'Home' || title === 'Bhola Yadav'
            ? 'Bhola Yadav'
            : `${title} | Bhola Yadav - Full-Stack Developer`;
        const desc = description || 'Official Portfolio of Bhola Yadav - Skill-First Full Stack Developer & AI Software Engineer. Seeking developer opportunities in Bangalore, Karnataka & Remote. Specialized in Java, Python, React, and Node.js.';
        const siteUrl = 'https://bhola-yadav.com.np';
        const currentUrl = `${siteUrl}${location.pathname}`;
        const ogImage = image || `${siteUrl}/profile.png`;
        const keywords = 'Full Stack Developer Bangalore, Software Engineer Bengaluru, Java Python AI Developer Karnataka, Skill Based Developer Hiring India, React Node.js Engineer, Bhola Yadav';

        // Update Document Title
        document.title = fullTitle;

        // Helper function to set or create meta tags
        const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
            let el = document.querySelector(selector);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attrName, attrVal);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        // Standard Meta Tags
        setMetaTag('meta[name="description"]', 'name', 'description', desc);
        setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
        setMetaTag('meta[name="geo.region"]', 'name', 'geo.region', 'IN-KA');
        setMetaTag('meta[name="geo.placename"]', 'name', 'geo.placename', 'Bengaluru, Karnataka, India');

        // OpenGraph Tags
        setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
        setMetaTag('meta[property="og:description"]', 'property', 'og:description', desc);
        setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
        setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
        setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);

        // Twitter Card Tags
        setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
        setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
        setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', desc);
        setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

        // JSON-LD Person & JobSeeker Schema
        const schemaId = 'person-jsonld';
        let schemaScript = document.getElementById(schemaId) as HTMLScriptElement | null;
        if (!schemaScript) {
            schemaScript = document.createElement('script');
            schemaScript.id = schemaId;
            schemaScript.type = 'application/ld+json';
            document.head.appendChild(schemaScript);
        }
        schemaScript.textContent = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Bhola Yadav',
            url: siteUrl,
            sameAs: [
                'https://github.com/bhola-dev58',
                'https://linkedin.com/in/bhya23cse',
                'https://leetcode.com/u/bhola-dev58'
            ],
            jobTitle: 'Full Stack Software Engineer',
            description: desc,
            knowsAbout: ['Java', 'Python', 'React.js', 'Node.js', 'Express.js', 'AI / ML', 'PostgreSQL', 'MongoDB'],
            workLocation: {
                '@type': 'Place',
                name: 'Bengaluru, Karnataka, India'
            },
            seeking: 'Software Engineer, Full Stack Developer, AI Developer'
        });
    }, [title, description, image, location]);

    return null;
};

export default SEO;
