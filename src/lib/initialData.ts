export interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
  github_url?: string;
  deployed_url?: string;
}

export interface Experience {
  id: string;
  title: string;
  company_name: string;
  period: string;
  type: string;
  description: string[];
  internship_url?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  url?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  score: string;
}

export interface ProfileData {
  id?: string;
  email_personal: string;
  email_college: string;
  phone_in: string;
  phone_np?: string;
  address_temp: string;
  address_perm: string;
  github: string;
  linkedin: string;
  leetcode: string;
  status_text: string;
  open_for: string;
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Smart Coach LMS -- Full-Stack Coaching Center Management Platform",
    period: "Feb 2025 – Present",
    description: "Production-ready Learning Management System with secure role-based access for students, instructors, and admins.",
    highlights: [
      "Developed a course management platform with YouTube Live integration, batch curriculum, and Razorpay payment handling 100+ concurrent users",
      "Implemented 6-month validity engine with automated expiry, re-enrollment, and secure discount logic",
      "Created responsive analytics dashboard with live session tracking, reducing management effort by 60%"
    ],
    tags: ["Full Stack", "Next.js", "React.js", "Node.js", "MongoDB", "Razorpay"],
    github_url: "https://github.com/bhola-dev58/smart-coach-lms",
    deployed_url: "https://gradify.academy/"
  },
  {
    id: "proj-2",
    title: "CareMate-AI -- AI-Powered Healthcare Chatbot",
    period: "Jan 2025 – Feb 2025",
    description: "AI healthcare chatbot powered by Google Gemini API providing real-time response to user medical queries.",
    highlights: [
      "Reduced API calls by 30% by implementing response caching for frequent queries, accelerating response times",
      "Integrated voice recognition and chat logging projected to boost user engagement by 40%",
      "Designed an interactive chat UI with dynamic state management using Streamlit"
    ],
    tags: ["Full Stack", "AI / ML", "Python", "Streamlit", "Gemini API"],
    github_url: "https://github.com/bhola-dev58/CareMate-AI",
    deployed_url: undefined
  },
  {
    id: "proj-3",
    title: "JLiveChats -- Real-Time Multi-User Chat Client",
    period: "Aug 2024 – Sep 2024",
    description: "Client-server architecture for a Java real-time chat application with sub-second latency.",
    highlights: [
      "Supported multiple concurrent users with real-time latency under 1 second",
      "Built responsive desktop UI using Java Swing and Abstract Window Toolkit (AWT)",
      "Deployed client-server networking layer using TCP Sockets on AWS"
    ],
    tags: ["Full Stack", "Java", "Sockets", "AWS", "Networking"],
    github_url: "https://github.com/bhola-dev58/JLiveChats",
    deployed_url: undefined
  }
];

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    title: "AI Code Debugger Intern",
    company_name: "Prasunet Company",
    period: "Mar 2025 – Apr 2025",
    type: "Internship",
    description: [
      "Built an AI-powered code debugging tool using MERN stack, reducing debugging time by ~30%",
      "Deployed scalable cloud-based infrastructure supporting 100+ concurrent users"
    ],
    internship_url: undefined
  },
  {
    id: "exp-2",
    title: "AI Intern -- TechSaksham",
    company_name: "Edunet Foundation",
    period: "Jan 2025 – Feb 2025",
    type: "Internship",
    description: [
      "Developed an AI chatbot for health diagnosis achieving 50% response accuracy on test cases",
      "Implemented voice recognition and chat logging features improving engagement"
    ],
    internship_url: undefined
  },
  {
    id: "exp-3",
    title: "Computer Instructor",
    company_name: "Spangle Education & Computer Institute Pvt. Ltd.",
    period: "Jun 2021 – Dec 2022",
    type: "Work Experience",
    description: [
      "Delivered classroom & hands-on training to 100+ students in MS Office, HTML/CSS/JS, C/C++, and Hardware troubleshooting",
      "Designed lesson plans and assessments, mentoring students to achieve strong practical computing skills"
    ],
    internship_url: undefined
  }
];

export const INITIAL_SKILLS: SkillCategory[] = [
  {
    id: "skill-1",
    category: "Programming Languages",
    items: ["Java", "Python", "JavaScript", "C++", "HTML5", "CSS3"]
  },
  {
    id: "skill-2",
    category: "Frontend & Full Stack Frameworks",
    items: ["React.js", "Next.js", "Tailwind CSS", "Node.js", "Express.js", "FastAPI"]
  },
  {
    id: "skill-3",
    category: "Databases & Cloud",
    items: ["MySQL", "MongoDB", "Docker", "AWS (Basic)", "REST APIs", "CI/CD"]
  },
  {
    id: "skill-4",
    category: "Core Computer Science & Tools",
    items: ["Data Structures & Algorithms", "DBMS", "Computer Networks", "Agentic AI", "Git / GitHub"]
  }
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: "cert-0",
    name: "AWS Certified Developer - Associate Certification",
    issuer: "Infosys Springboard (2026)",
    url: "https://verify.onwingspan.com"
  },
  {
    id: "cert-1",
    name: "React E-Commerce Platform Masterclass",
    issuer: "Scaler (2026)",
    url: "#"
  },
  {
    id: "cert-2",
    name: "JavaScript Full-Stack Development",
    issuer: "Udemy (2025)",
    url: "#"
  },
  {
    id: "cert-3",
    name: "Full-Stack Web Development Mastery",
    issuer: "Udemy (2024)",
    url: "#"
  },
  {
    id: "cert-4",
    name: "Programming with Java",
    issuer: "NPTEL (2024)",
    url: "#"
  },
  {
    id: "cert-5",
    name: "Internal Smart India Hackathon",
    issuer: "CMRIT Bengaluru (2025)",
    url: "#"
  },
  {
    id: "cert-6",
    name: "HackAthena25 & Flipkart GRID 6.0 Participant",
    issuer: "Unstop / Jyothi Engg College",
    url: "#"
  }
];

export const INITIAL_EDUCATION: Education[] = [
  {
    id: "edu-1",
    institution: "CMR Institute of Technology",
    degree: "Bachelor of Engineering -- Computer Science and Engineering",
    period: "2023 – 2027 (Pursuing)",
    score: ""
  },
  {
    id: "edu-2",
    institution: "Shree Susanskrit Secondary School",
    degree: "12th Grade -- Science (Technical and Vocational)",
    period: "2021",
    score: ""
  },
  {
    id: "edu-3",
    institution: "Shree Susanskrit Secondary School",
    degree: "10th Standard (Technical & Vocational)",
    period: "2019",
    score: ""
  }
];

export const INITIAL_PROFILE: ProfileData = {
  id: "profile-1",
  email_personal: "bhola.dev58@gmail.com",
  email_college: "bhya23cs@cmrit.ac.in",
  phone_in: "+91-7483509984",
  address_temp: "Bengaluru, Karnataka, India",
  address_perm: "Rupandehi, Nepal",
  github: "https://github.com/bhola-dev58",
  linkedin: "https://linkedin.com/in/bhola-dev58",
  leetcode: "https://leetcode.com/u/bhola-dev58",
  status_text: "Final-Year B.E. CS Student at CMRIT Bengaluru",
  open_for: "Seeking SDE / Full-Stack & AI Developer Opportunities in Bangalore & Remote"
};
