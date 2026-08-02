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
  phone_np: string;
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
    title: "AI-Powered Full Stack Debugger & Assistant",
    period: "Mar 2025 – Apr 2025",
    description: "Full-stack development helper featuring API integration and real-time interactive user feedback.",
    highlights: [
      "Supports multiple programming languages and environments",
      "Integrates generative artificial intelligence options with low latency",
      "Optimized application performance by introducing local caching layers"
    ],
    tags: ["React.js", "Python", "FastAPI", "Tailwind CSS", "AI / ML"],
    github_url: "https://github.com/bhola-dev58/ai-debugger",
    deployed_url: "https://bhola-yadav.com.np"
  },
  {
    id: "proj-2",
    title: "Interactive Medical Assistant Chatbot",
    period: "Jan 2025 – Feb 2025",
    description: "Python web application utilizing machine learning frameworks to provide basic informational diagnostics.",
    highlights: [
      "Decreased server response times using efficient pre-rendered data models",
      "Designed responsive, accessible glassmorphic UI",
      "Ensured reliable application state storage"
    ],
    tags: ["Python", "Streamlit", "NLP", "AI / ML"],
    github_url: "https://github.com/bhola-dev58/medical-assistant",
    deployed_url: undefined
  },
  {
    id: "proj-3",
    title: "Real-Time Multi-Threaded Messaging Client",
    period: "Aug 2024 – Sep 2024",
    description: "Multi-client network application featuring custom socket-based communication protocols.",
    highlights: [
      "Implemented reliable multi-thread message routing and sync",
      "Constructed intuitive desktop UI and clean message history view",
      "Optimized data serialization and deserialization over TCP sockets"
    ],
    tags: ["Java", "Sockets", "Multi-threading", "Desktop"],
    github_url: "https://github.com/bhola-dev58/java-chat-client",
    deployed_url: undefined
  }
];

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    title: "Software Developer Intern",
    company_name: "Tech Development Company",
    period: "Mar 2025 – Apr 2025",
    type: "Internship",
    description: [
      "Built modern full-stack web applications using Node.js, Express, and React",
      "Collaborated with a cross-functional development team to design clean REST APIs and modular components"
    ],
    internship_url: undefined
  },
  {
    id: "exp-2",
    title: "AI Development Intern",
    company_name: "Innovative Learning Solutions",
    period: "Jan 2025 – Feb 2025",
    type: "Internship",
    description: [
      "Developed interactive chatbot systems using Python and Natural Language Processing",
      "Optimized application performance and streamlined database queries"
    ],
    internship_url: undefined
  }
];

export const INITIAL_SKILLS: SkillCategory[] = [
  {
    id: "skill-1",
    category: "Programming Languages",
    items: ["Java", "Python", "JavaScript", "TypeScript", "C++", "HTML5/CSS3"]
  },
  {
    id: "skill-2",
    category: "Frameworks & Libraries",
    items: ["React.js", "Node.js", "Express.js", "Tailwind CSS", "Framer Motion", "Three.js"]
  },
  {
    id: "skill-3",
    category: "Databases & Cloud",
    items: ["MongoDB", "PostgreSQL", "Supabase", "MySQL", "REST APIs"]
  },
  {
    id: "skill-4",
    category: "Tools & Architectures",
    items: ["Git / GitHub", "VS Code", "Docker", "Vite", "Postman", "Linux/Bash"]
  }
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: "cert-1",
    name: "National Engineering Contest Participant",
    issuer: "Tech Engineering Forum",
    url: "#"
  },
  {
    id: "cert-2",
    name: "Full Stack Software Architecture Certification",
    issuer: "Coursera / Meta",
    url: "#"
  },
  {
    id: "cert-3",
    name: "React & Modern Web Development Specialization",
    issuer: "Udemy",
    url: "#"
  },
  {
    id: "cert-4",
    name: "Cloud & Microservices Infrastructure Essentials",
    issuer: "Google Cloud Skills Boost",
    url: "#"
  }
];

export const INITIAL_EDUCATION: Education[] = [
  {
    id: "edu-1",
    institution: "Lovely Professional University",
    degree: "Bachelor of Technology - Computer Science and Engineering",
    period: "2023 - 2027",
    score: "CGPA: 8.0 / 10.0"
  },
  {
    id: "edu-2",
    institution: "Higher Secondary School",
    degree: "High School (+2 Science)",
    period: "2021",
    score: "Grade / Percentage: 80%"
  },
  {
    id: "edu-3",
    institution: "Secondary School",
    degree: "General Secondary Education (SEE)",
    period: "2019",
    score: "Grade / Percentage: 85%"
  }
];

export const INITIAL_PROFILE: ProfileData = {
  id: "profile-1",
  email_personal: "bhola.dev58@gmail.com",
  email_college: "bhola.c@college.edu",
  phone_in: "+91-9800000000",
  phone_np: "+977-9800000000",
  address_temp: "Kathmandu, Nepal",
  address_perm: "Siraha, Nepal",
  github: "https://github.com/bhola-dev58",
  linkedin: "https://linkedin.com/in/bhya23cse",
  leetcode: "https://leetcode.com/u/bhola-dev58",
  status_text: "Full-Stack Software Engineer & CS Student",
  open_for: "Open to Full-Stack, Backend, and AI Engineering Opportunities"
};
