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
    await Project.deleteMany({}); // Refresh projects data
    await Project.insertMany([
        {
            title: "Smart Coach LMS -- Full-Stack Coaching Center Management Platform",
            slug: "smart-coach-lms",
            shortDescription: "Production-ready Learning Management System with secure role-based access for students, instructors, and admins.",
            description: "Production-ready Learning Management System engineered to streamline batch scheduling, live classes via YouTube API, course enrollment, and student management for educational institutes.",
            category: "Full Stack",
            projectType: "SaaS Web Application",
            role: "Full Stack Software Engineer",
            status: "Published",
            featured: true,
            displayOrder: 1,
            period: "Feb 2025 – Present",
            startDate: "2025-02",
            endDate: "",
            highlights: [
                "Developed a course management platform with YouTube Live integration, batch curriculum, and Razorpay payment handling 100+ concurrent users",
                "Implemented 6-month validity engine with automated expiry, re-enrollment, and secure discount logic",
                "Created responsive analytics dashboard with live session tracking, reducing management effort by 60%"
            ],
            tags: ["Full Stack", "Next.js", "React.js", "Node.js", "MongoDB", "Razorpay"],
            technologies: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "Razorpay Payment Gateway", "Tailwind CSS", "JWT Auth"],
            problem: "Coaching institutes faced immense operational friction managing offline & online batches, tracking course expirations manually, and integrating secure payment processing for student enrollments.",
            approach: "Architected an end-to-end full-stack web platform using Next.js and Node.js with MongoDB. Built strict role-based authorization (Admin, Instructor, Student) and integrated automated course validity tracking.",
            architecture: "Monolithic Node.js REST backend connected to MongoDB Atlas. Next.js App Router client rendering dynamic dashboard views with Razorpay Webhook listener for instant enrollment provisioning.",
            keyFeatures: [
                "Role-Based Access Control (Admin, Instructor, Student)",
                "YouTube Live API & Batch Streaming Integration",
                "Razorpay Payment Gateway Integration with Automated Webhook Reconciliation",
                "6-Month Automatic Course Expiry & Renewal Logic",
                "Interactive Analytics Dashboard for Enrollment & Financial Tracking"
            ],
            challenges: "Handling concurrent payment webhooks while ensuring race-condition prevention during course seat allotment and handling automatic course expiration notifications.",
            solutions: "Implemented MongoDB atomic operations (`findAndModify`) alongside idempotent webhook handlers in Express.js.",
            results: "Processed enrollments for 100+ active students while cutting institute administrative overhead by 60%.",
            learnings: "Deepened expertise in financial transaction security, webhook idempotency, and Next.js server-side rendering performance.",
            github_url: "https://github.com/bhola-dev58/smart-coach-lms",
            deployed_url: "https://gradify.academy/",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
        },
        {
            title: "CareMate-AI -- AI-Powered Healthcare Chatbot",
            slug: "caremate-ai",
            shortDescription: "AI healthcare assistant powered by Google Gemini API providing real-time response to medical queries with caching and voice support.",
            description: "An intelligent medical assistant application leveraging Generative AI models to assist users in understanding medical terms, symptom analysis, and general health recommendations with voice interaction.",
            category: "AI / GenAI",
            projectType: "AI Assistant",
            role: "AI & Full Stack Engineer",
            status: "Published",
            featured: true,
            displayOrder: 2,
            period: "Jan 2025 – Feb 2025",
            startDate: "2025-01",
            endDate: "2025-02",
            highlights: [
                "Reduced API calls by 30% by implementing response caching for frequent queries, accelerating response times",
                "Integrated voice recognition and chat logging projected to boost user engagement by 40%",
                "Designed an interactive chat UI with dynamic state management using Streamlit"
            ],
            tags: ["Full Stack", "AI / ML", "Python", "Streamlit", "Gemini API"],
            technologies: ["Python", "Google Gemini API", "Streamlit", "SpeechRecognition", "SQLite", "REST APIs"],
            problem: "Patients and users frequently struggle to obtain quick, reliable clarification on medical terminology or preliminary symptom information without navigating complex medical search engines.",
            approach: "Constructed an interactive Streamlit application connected to Google Gemini AI API with custom prompt engineering to enforce medical disclaimer safety guidelines and cache frequent health inquiries.",
            architecture: "Python Streamlit frontend with in-memory query hash map caching layer and Google Generative AI SDK connection.",
            keyFeatures: [
                "Real-Time Gemini AI Symptom & Health Query Response",
                "Voice Input Recognition & Audio Synthesis Response",
                "Response Caching Layer to Reduce Token Consumption by 30%",
                "Chat History Persistence & Export",
                "Safety Guardrails & Automated Medical Disclaimer Enforcement"
            ],
            challenges: "Managing API rate limits and reducing latency when generating detailed AI responses for repetitive general health queries.",
            solutions: "Developed a local query hash caching system storing previous non-personalized medical guidance answers.",
            results: "Cut repetitive LLM API latency by 30% and improved chat user engagement by 40%.",
            learnings: "Gained hands-on experience with LLM prompt engineering, safety guardrails, and speech-to-text integration.",
            github_url: "https://github.com/bhola-dev58/CareMate-AI",
            deployed_url: null,
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"
        },
        {
            title: "JLiveChats -- Real-Time Multi-User Chat Client",
            slug: "jlivechats",
            shortDescription: "High-performance client-server Java desktop chat application supporting low-latency multi-room messaging.",
            description: "Multi-threaded desktop chat software built in Java using TCP Sockets and Java Swing GUI, deployed with AWS cloud hosting for multi-client routing.",
            category: "Full Stack",
            projectType: "Desktop Application & Networking",
            role: "Backend & Systems Engineer",
            status: "Published",
            featured: false,
            displayOrder: 3,
            period: "Aug 2024 – Sep 2024",
            startDate: "2024-08",
            endDate: "2024-09",
            highlights: [
                "Supported multiple concurrent users with real-time latency under 1 second",
                "Built responsive desktop UI using Java Swing and Abstract Window Toolkit (AWT)",
                "Deployed client-server networking layer using TCP Sockets on AWS"
            ],
            tags: ["Full Stack", "Java", "Sockets", "AWS", "Networking"],
            technologies: ["Java", "Java Swing / AWT", "TCP/IP Sockets", "Multi-threading", "AWS EC2"],
            problem: "Understanding low-level socket networking, socket connection drops, thread synchronization, and real-time message broadcasting without third-party abstraction libraries.",
            approach: "Built a pure Java multi-threaded server application managing ClientHandler threads using thread pools and custom binary protocol over raw TCP Sockets.",
            architecture: "Multi-threaded TCP Server running on AWS EC2 accepting incoming socket connections from Java Swing desktop client instances.",
            keyFeatures: [
                "Sub-Second Multi-Client Real-Time Message Broadcasting",
                "Multi-Threaded Server Architecture with Dynamic Client Thread Pooling",
                "Custom Java Swing & AWT Graphical Interface",
                "User Presence & Connection Status Monitoring",
                "AWS EC2 Cloud Server Deployment"
            ],
            challenges: "Preventing thread race conditions and socket memory leaks when multiple users disconnect abruptly.",
            solutions: "Implemented graceful socket shutdown hooks and concurrent synchronized collections for active client lists.",
            results: "Achieved sub-1-second message delivery latency across simultaneous remote clients.",
            learnings: "Mastered core Java concurrency, socket network programming, and thread safety patterns.",
            github_url: "https://github.com/bhola-dev58/JLiveChats",
            deployed_url: null,
            image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80"
        }
    ]);
    console.log('Project records seeded/migrated (3)');

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
