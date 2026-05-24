/**
 * Seed Script - Setup dummy/placeholder data for MongoDB portfolio
 * 
 * Run: cd server && node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./db');
const { Admin, Profile, Project, Experience, Skill, Certification, Education } = require('./models');

const seed = async () => {
    await connectDB();

    // ==========================================
    // 1. CREATE ADMIN USER
    // ==========================================
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
        await Admin.create({
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
        });
        console.log(`Admin created: ${process.env.ADMIN_EMAIL}`);
    } else {
        console.log(`Admin already exists: ${process.env.ADMIN_EMAIL}`);
    }

    // ==========================================
    // 2. PROFILE DATA
    // ==========================================
    const existingProfile = await Profile.findOne();
    if (!existingProfile) {
        await Profile.create({
            email_personal: 'user.personal@example.com',
            email_college: 'user.college@example.edu',
            phone_in: '+91-0000000000',
            phone_np: '+977-0000000000',
            address_temp: 'City, State, Country',
            address_perm: 'Permanent City, Permanent Country',
            github: 'https://github.com/placeholder-github',
            linkedin: 'https://linkedin.com/in/placeholder-linkedin',
            leetcode: 'https://leetcode.com/u/placeholder-leetcode',
            status_text: 'Computer Science and Engineering Student',
            open_for: 'Open to internship and full-time opportunities',
        });
        console.log('Profile created');
    } else {
        console.log('Profile already exists');
    }

    // ==========================================
    // 3. EDUCATION DATA
    // ==========================================
    const existingEducation = await Education.countDocuments();
    if (existingEducation === 0) {
        await Education.insertMany([
            {
                institution: 'Example Institute of Technology',
                degree: 'Bachelor of Engineering in Computer Science',
                period: '2023 - 2027',
                score: 'CGPA: 8.0/10',
            },
            {
                institution: 'Example Secondary School',
                degree: 'High School - Science and Technology',
                period: '2021',
                score: 'Percentage: 80%',
            },
            {
                institution: 'Example Primary School',
                degree: 'General Secondary Education',
                period: '2019',
                score: 'Percentage: 85%',
            },
        ]);
        console.log('Education records created (3)');
    } else {
        console.log(`Education already has ${existingEducation} records`);
    }

    // ==========================================
    // 4. EXPERIENCES DATA
    // ==========================================
    const existingExperiences = await Experience.countDocuments();
    if (existingExperiences === 0) {
        await Experience.insertMany([
            {
                title: 'Software Developer Intern',
                company_name: 'Tech Development Company',
                period: 'Mar 2025 – Apr 2025',
                type: 'Internship',
                description: [
                    'Built modern full-stack web applications using Node.js and React',
                    'Collaborated with a cross-functional development team to design clean REST APIs',
                ],
                internship_url: null,
            },
            {
                title: 'AI Development Intern',
                company_name: 'Innovative Learning Solutions',
                period: 'Jan 2025 – Feb 2025',
                type: 'Internship',
                description: [
                    'Developed interactive chatbot systems using Python and Natural Language Processing',
                    'Optimized application performance and streamlined database queries',
                ],
                internship_url: null,
            },
        ]);
        console.log('Experience records created (2)');
    } else {
        console.log(`Experiences already has ${existingExperiences} records`);
    }

    // ==========================================
    // 5. PROJECTS DATA
    // ==========================================
    const existingProjects = await Project.countDocuments();
    if (existingProjects === 0) {
        await Project.insertMany([
            {
                title: 'AI-Powered Project Debugger',
                period: 'Mar 2025 – Apr 2025',
                description: 'Full-stack development helper featuring API integration and real-time interactive user feedback',
                highlights: [
                    'Supports multiple programming languages and environments',
                    'Integrates third-party generative artificial intelligence options',
                    'Optimized application performance by introducing local caching layers',
                ],
                tags: ['React.js', 'FastAPI', 'Python', 'TailwindCSS'],
                github_url: 'https://github.com/placeholder-github/project-one',
                deployed_url: null,
            },
            {
                title: 'Interactive Medical Assistant Chatbot',
                period: 'Jan 2025 – Feb 2025',
                description: 'Python web application utilizing machine learning frameworks to provide basic informational diagnostics',
                highlights: [
                    'Decreased server response times using efficient pre-rendered data models',
                    'Designed responsive and clean interface layout',
                    'Ensured reliable application state storage',
                ],
                tags: ['Python', 'Streamlit', 'Natural Language Processing'],
                github_url: null,
                deployed_url: null,
            },
            {
                title: 'Real-Time Messaging Client',
                period: 'Aug 2024 – Sep 2024',
                description: 'Multi-client network application featuring socket-based communication protocols',
                highlights: [
                    'Implemented reliable multi-thread message routing',
                    'Constructed intuitive interactive desktop user interface',
                    'Optimized data serialization and deserialization over local networks',
                ],
                tags: ['Java', 'Sockets', 'Desktop Development'],
                github_url: 'https://github.com/placeholder-github/project-three',
                deployed_url: null,
            },
        ]);
        console.log('Project records created (3)');
    } else {
        console.log(`Projects already has ${existingProjects} records`);
    }

    // ==========================================
    // 6. SKILLS DATA
    // ==========================================
    const existingSkills = await Skill.countDocuments();
    if (existingSkills === 0) {
        await Skill.insertMany([
            {
                category: 'Programming Languages',
                items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++'],
            },
            {
                category: 'Frameworks & Libraries',
                items: ['React.js', 'Node.js', 'Express.js', 'FastAPI'],
            },
            {
                category: 'Databases',
                items: ['MySQL', 'MongoDB', 'PostgreSQL'],
            },
            {
                category: 'Tools & Platforms',
                items: ['Git', 'GitHub', 'VS Code', 'Docker', 'CI/CD'],
            },
        ]);
        console.log('Skills records created (4 categories)');
    } else {
        console.log(`Skills already has ${existingSkills} records`);
    }

    // ==========================================
    // 7. CERTIFICATIONS DATA
    // ==========================================
    const existingCerts = await Certification.countDocuments();
    if (existingCerts === 0) {
        await Certification.insertMany([
            { name: 'National Engineering Contest Participant', issuer: 'Example Platform', url: '#' },
            { name: 'React Development Specialization Certificate', issuer: 'Example Platform', url: '#' },
            { name: 'Web Technology Practical Internship Program', issuer: 'Example Platform', url: '#' },
            { name: 'Cloud Infrastructure Essentials Course', issuer: 'Example Platform', url: '#' },
            { name: 'Full-Stack Software Architecture Certification', issuer: 'Example Platform', url: '#' },
            { name: 'Advanced Object-Oriented Design', issuer: 'Example Platform', url: '#' },
        ]);
        console.log('Certification records created (6)');
    } else {
        console.log(`Certifications already has ${existingCerts} records`);
    }

    // ==========================================
    // DONE
    // ==========================================
    console.log('\nData migration complete!');
    console.log('Summary:');
    console.log(`   - Admin: 1 user`);
    console.log(`   - Profile: 1 record`);
    console.log(`   - Education: ${await Education.countDocuments()} records`);
    console.log(`   - Experiences: ${await Experience.countDocuments()} records`);
    console.log(`   - Projects: ${await Project.countDocuments()} records`);
    console.log(`   - Skills: ${await Skill.countDocuments()} categories`);
    console.log(`   - Certifications: ${await Certification.countDocuments()} records`);
    console.log('\nStart the backend: node index.js');

    await mongoose.disconnect();
    process.exit(0);
};

seed().catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
});
