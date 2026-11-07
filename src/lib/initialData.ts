// Certificate & Internship Assets (bundled by Vite → hosted on Vercel CDN)
import awsCertPdf from "@/assets/certificates/AWS Certified Developer - Associate Certification.pdf";
import techsakshamPdf from "@/assets/certificates/AI-Transformative Learning with TechSaksham.pdf";
import azurePdf from "@/assets/certificates/Azure 303 for Beginners.pdf";
import mlPythonPdf from "@/assets/certificates/Explore Machine Learning using Python.pdf";
import flipkartGridJpg from "@/assets/certificates/Flipkart GRiD 6.0 - Software Development.jpg";
import fullstackPdf from "@/assets/certificates/Full-Stack-Web-Development-MASTERY-Course.pdf";
import jsFullstackJpg from "@/assets/certificates/JavaScript Full-Stack Development.jpg";
import linuxPng from "@/assets/certificates/Linux_mastery-certificate.png";
import javaPdf from "@/assets/certificates/Programming In Java.pdf";
import reactEcommercePng from "@/assets/certificates/React E-Commerce Platform Masterclass.png";

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description: string;
  category?: string;
  projectType?: string;
  role?: string;
  status?: 'Draft' | 'Published' | 'Archived';
  featured?: boolean;
  displayOrder?: number;
  period?: string;
  startDate?: string;
  endDate?: string;
  highlights?: string[];
  tags?: string[];
  technologies?: string[];
  problem?: string;
  approach?: string;
  architecture?: string;
  keyFeatures?: string[];
  challenges?: string;
  solutions?: string;
  results?: string;
  learnings?: string;
  github_url?: string;
  deployed_url?: string;
  doc_url?: string;
  image?: string;
  images?: string[];
  architectureImage?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
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
  id?: string;
  _id?: string;
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
  address?: string;
  address_temp?: string;
  address_perm?: string;
  github: string;
  linkedin: string;
  leetcode: string;
  status_text: string;
  open_for: string;
}

export const brainTumorXaiProject: Project = {
  id: "brain-tumor-xai",
  title: "BrainTumorXAI — Clinical Heterogeneous Tri-Ensemble & Anatomically Constrained XAI",
  slug: "brain-tumor-xai",
  category: "AI / ML",
  projectType: "Medical Imaging & Deep Learning Diagnostic System",
  role: "Lead Deep Learning & Full-Stack AI Engineer",
  status: "Published",
  featured: true,
  displayOrder: 1,
  period: "Aug 2026 - Present",
  startDate: "2026-08-01",
  endDate: "Present",

  shortDescription:
    "A clinical-grade diagnostic PACS workstation powered by a Heterogeneous Tri-Ensemble (ConvNeXt-Small, InceptionV3, DenseNet121) achieving 98.88% accuracy with Brain-Masked Grad-CAM++ visual explainability and automated PDF triage reporting.",

  description:
    "BrainTumorXAI is an end-to-end, clinical-grade medical imaging platform engineered to detect, classify, and segment brain tumors from multi-sequence MRI scans with real-time visual explainability.\n\nBuilt on a heterogeneous tri-ensemble calibrated with Nelder-Mead optimization and 10-Pass Test-Time Augmentation (TTA), the framework achieves a state-of-the-art 98.88% diagnostic accuracy on the benchmark BraTS 2019 dataset.\n\nTo ensure safety and interpretability in clinical practice, it introduces Brain-Masked Grad-CAM++, which utilizes dynamic Otsu contouring and Hadamard tissue gating to suppress 100% of non-cerebral artifacts and skull leakage.\n\nThe system features a full-stack Web PACS workstation with real-time multi-colormap saliency viewports, automated morphological lesion quantification (mm² area and severity grading), automated clinical PDF generation via ReportLab, and containerized zero-setup deployment via Docker.",

  problem:
    "Traditional manual radiologic interpretation of brain MRI scans is time-intensive, subject to inter-observer variability, and vulnerable to diagnostic bottlenecks during emergency triage.\n\nWhile standard deep learning architectures achieve promising classification scores, they behave as uninterpretable 'black boxes.' Standard explainability methods like Grad-CAM suffer from intense skull-edge leakage and non-cerebral artifacts, misattributing predictions to bone rather than brain tissue and undermining clinician trust.",

  approach:
    "Engineered a multi-stage clinical intelligence pipeline:\n\n• Stage 1 — Preprocessing & Isolation: Min-max intensity normalization and dynamic Otsu contour isolation to strip non-brain cranial tissue.\n• Stage 2 — Heterogeneous Tri-Ensemble: Combines three distinct inductive biases: modern spatial convolutional patches (ConvNeXt-Small, 39%), multi-scale spatial receptive fields (InceptionV3, 32%), and dense feature reuse (DenseNet121, 29%).\n• Stage 3 — Test-Time Augmentation (TTA): 10-Pass TTA with Nelder-Mead simplex-optimized soft voting calibration.\n• Stage 4 — Anatomical Gating: Anatomically Constrained Grad-CAM++ with second-order gradients gated by anatomical tissue masks.\n• Stage 5 — Lesion Segmentation & Triage: Weakly-supervised morphological lesion boundary segmentation and automated ReportLab PDF triage reporting.",

  architecture:
    "Full-stack decoupled architecture engineered for clinical throughput:\n\n• Deep Learning Inference Tier: TensorFlow/Keras engine with CPU-optimized asynchronous execution and multi-model pipeline caching.\n• Backend REST Service: High-throughput FastAPI ASGI service with non-blocking model initialization and SQLite patient history auditing with SHA-256 provenance hashes.\n• Clinical PACS Workstation: Responsive workstation built with HTML5/CSS3/ES6+ featuring quad-view multi-layer canvases, client-side dynamic colormaps (Jet, Turbo, Inferno, Viridis), and interactive threshold sliders.",

  highlights: [
    "98.88% Diagnostic Accuracy: Validated on 1,269 isolated BraTS 2019 validation MRI scans using 10-pass TTA, outperforming published SOTA benchmarks (Pereira et al., 98.85%).",
    "Zero Skull-Edge Leakage: Brain-Masked Grad-CAM++ eliminates 100% of non-cerebral saliency artifacts via dynamic Hadamard anatomical gating.",
    "Weakly-Supervised Boundary Segmentation: Reaches a 0.902 Dice Similarity Coefficient for tumor perimeter isolation without requiring pixel-level training masks.",
    "Fast CPU Inference: Executes complete heterogeneous tri-ensemble inference + Grad-CAM heatmap synthesis in <2.5 seconds on commodity CPUs.",
    "Clinical PDF Synthesis: Programmatically compiles multi-planar patient diagnostic summaries with risk severity classifications via ReportLab.",
    "One-Command Docker Deployment: Fully automated Docker Compose setup with GitHub Releases v3.0.0 model provisioning and persistent volume caching."
  ],

  tags: [
    "AI / ML",
    "Python",
    "Deep Learning",
    "Computer Vision",
    "Explainable AI (XAI)",
    "TensorFlow / Keras",
    "FastAPI",
    "Docker",
    "Medical Imaging (PACS)"
  ],

  technologies: [
    "Python 3.12",
    "TensorFlow 2.x & Keras",
    "ConvNeXt-Small",
    "InceptionV3",
    "DenseNet121",
    "Grad-CAM / Grad-CAM++",
    "OpenCV & NumPy",
    "SciPy (Nelder-Mead)",
    "FastAPI & Uvicorn",
    "ReportLab (PDF Engine)",
    "SQLite (Audit Provenance)",
    "Docker & Docker Compose",
    "HTML5 Canvas & Vanilla CSS"
  ],

  keyFeatures: [
    "Heterogeneous Tri-Ensemble Classification (Glioma, Meningioma, Pituitary, No Tumor)",
    "10-Pass Test-Time Augmentation (TTA) with Nelder-Mead Weighted Soft Voting",
    "Anatomically Constrained Brain-Masked Grad-CAM++ Saliency Maps",
    "Weakly-Supervised Lesion Boundary Segmentation & Quantitative Area Calculation (mm²)",
    "Quad-View Interactive Viewport with Real-Time Colormap Switching (Jet, Turbo, Inferno, Viridis)",
    "Interactive ROI Cutoff Threshold Slider with Real-Time Canvas Re-rendering",
    "Automated Clinical Diagnostic PDF Report Generator with Demographic Metadata",
    "SQLite Patient History Auditing with SHA-256 Provenance Fingerprints",
    "One-Command Docker Setup with Automated Model Weight Provisioning"
  ],

  challenges:
    "Key engineering challenges addressed:\n\n• Skull-Edge Artifact Leakage: Standard Grad-CAM suffers from intense false saliency peaks on cranial bone, creating diagnostic misattributions.\n• High Memory Footprint: ~833 MB model weights and computational graphs caused memory spikes on resource-constrained containers.\n• Startup Cold-Start Latency: Synchronously loading 3 large deep learning models caused timeout during API startup.\n• Container Volume Masking: Empty Docker bind-mounts inadvertently masked pre-baked model weights.",

  solutions:
    "Engineered solutions and architectural interventions:\n\n• Hadamard Tissue Gating: Formulated dynamic Otsu contour brain masks that multiply raw saliency gradients, completely eliminating skull-edge leakage.\n• Memory Optimization: Configured TensorFlow memory allocators (MALLOC_ARENA_MAX=2) and leveraged DenseNet121 as primary XAI feature extractor.\n• Asynchronous Lifespan Loading: Engineered FastAPI lifespan event handlers to bind HTTP ports in <1s while deep learning models load in the background.\n• Dedicated Named Volumes: Structured Docker Compose with named volume caching (brain-tumor-models) to preserve model weights.",

  results:
    "Clinical metrics and benchmark achievements:\n\n• 98.88% Overall Diagnostic Accuracy on benchmark BraTS 2019 validation cohort (Macro-F1: 98.75%, Precision: 98.85%, Recall: 98.80%).\n• 0.902 Dice Similarity Coefficient for weakly-supervised lesion boundary segmentation.\n• <2.5 Seconds End-to-End Inference per MRI scan on commodity CPU hardware.\n• 100% Non-Cerebral Artifact Elimination via Hadamard anatomical gating.",

  learnings:
    "Core takeaways and domain expertise gained:\n\n• Heterogeneous ensemble calibration and simplex-based voting weight optimization.\n• Clinical Explainable AI (XAI) mathematics and anatomical tissue gating.\n• Asynchronous ASGI server architecture with TensorFlow deep learning runtimes.\n• Production multi-stage Docker containerization and persistent storage volume mechanics.",

  github_url: "https://github.com/bhola-dev58/brain-xai-ensemble",
  doc_url: "https://www.kaggle.com/code/bholadev58/braintumor-98pct-ensemble-training",
  deployed_url: "https://brain-tumor-xai-jf4z.onrender.com/",
  image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80"
};

export const INITIAL_PROJECTS: Project[] = [
  brainTumorXaiProject,
  {
    id: "proj-1",
    title: "Smart Coach LMS -- Full-Stack Coaching Center Management Platform",
    slug: "smart-coach-lms",
    shortDescription: "Production-ready Learning Management System with secure role-based access for students, instructors, and admins.",
    description: "Production-ready Learning Management System engineered to streamline batch scheduling, live classes via YouTube API, course enrollment, and student management for educational institutes.",
    category: "Full Stack",
    projectType: "SaaS Web Application",
    role: "Full Stack Software Engineer",
    status: "Published",
    featured: true,
    displayOrder: 2,
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
    problem: "Educational coaching institutes faced immense operational friction managing dual offline and online batches, tracking course expirations manually, and integrating reliable payment processing for student enrollments.",
    approach: "Architected an end-to-end full-stack web platform using Next.js and Node.js with MongoDB:\n\n• Role-Based Access Control: Granular permissions for Admins, Instructors, and Students.\n• Video Streaming Integration: Connected YouTube Live API for scheduled batch streaming.\n• Automated Validity Engine: 6-month automated expiration and renewal workflows.\n• Payment Automation: Seamless Razorpay checkout with webhook reconciliation.",
    architecture: "Decoupled Full-Stack Architecture:\n\n• Client Tier: Next.js App Router with server-side rendering, dynamic student portals, and responsive Tailwind UI.\n• Backend REST API: Express.js service handling authentication, batch curriculum CRUD, and Razorpay webhook events.\n• Database: MongoDB Atlas with optimized indexes on student enrollment and course validity records.",
    keyFeatures: [
      "Role-Based Access Control: Granular permissions for Admin, Instructor, and Student portals",
      "YouTube Live API Integration: Real-time batch curriculum streaming and live notification delivery",
      "Razorpay Payment Gateway: Automated webhook reconciliation and enrollment provisioning",
      "Automated Expiration Engine: 6-Month course validity with renewal reminders and discount logic",
      "Interactive Analytics: Responsive administrative dashboard tracking active learners and enrollment trends"
    ],
    challenges: "Key technical bottlenecks encountered:\n\n• Concurrency & Race Conditions: Handling concurrent payment webhooks while ensuring seat allotment consistency.\n• Expiration Automation: Accurately calculating 6-month validity intervals across varying calendar lengths without server cron degradation.",
    solutions: "Engineering solutions implemented:\n\n• Idempotent Webhook Processing: Implemented MongoDB atomic operations (`findAndModify`) alongside idempotent transaction handlers in Express.js.\n• TTL & Index Optimization: Designed database TTL expiration indexing and lightweight background verification routines.",
    results: "Quantified project impact:\n\n• 100+ active students enrolled and managed simultaneously.\n• 60% reduction in institute administrative management overhead.\n• Sub-200ms average API response time across student dashboard queries.",
    learnings: "Core takeaways and skills acquired:\n\n• Production financial transaction security and webhook idempotency patterns.\n• Next.js App Router architecture and server-side authentication caching.\n• High-concurrency database locking and atomic updates in MongoDB.",
    github_url: "https://github.com/bhola-dev58/smart-coach-lms",
    deployed_url: "https://gradify.academy/",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "proj-2",
    title: "CareMate-AI -- AI-Powered Healthcare Chatbot",
    slug: "caremate-ai",
    shortDescription: "AI healthcare assistant powered by Google Gemini API providing real-time response to medical queries with caching and voice support.",
    description: "An intelligent medical assistant application leveraging Generative AI models to assist users in understanding medical terms, symptom analysis, and general health recommendations with voice interaction.",
    category: "AI / GenAI",
    projectType: "AI Assistant",
    role: "AI & Full Stack Engineer",
    status: "Published",
    featured: true,
    displayOrder: 3,
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
      "Real-Time Gemini AI Interaction: Fast query resolution for preliminary symptoms and medical terminology",
      "Hands-Free Voice Recognition: Speech-to-text pipeline allowing conversational audio symptom input",
      "Response Caching Engine: In-memory hash caching reducing repetitive token consumption by 30%",
      "Chat History Persistence: Session export and historical interaction tracking",
      "Safety Guardrails: Automated medical disclaimer enforcement and advisory boundary prompts"
    ],
    challenges: "Key technical bottlenecks encountered:\n\n• Token Overhead: High LLM token costs and rate limits for repetitive general healthcare definitions.\n• Accent Inconsistencies: Voice recognition discrepancies across diverse accents when pronouncing clinical names.",
    solutions: "Engineering solutions implemented:\n\n• Local Query Hash Cache: Developed a local hash map cache storing previous non-personalized medical guidance answers.\n• Audio Pre-filtering: Added audio noise-filtering routines to the SpeechRecognition pipeline prior to API inference.",
    results: "Quantified project impact:\n\n• 30% reduction in API token usage and query latency via intelligent caching.\n• 40% increase in projected user engagement through conversational voice support.\n• Zero downtime with lightweight local execution.",
    learnings: "Core takeaways and skills acquired:\n\n• LLM prompt engineering, temperature calibration, and medical disclaimer guardrails.\n• Python speech recognition pipelines and reactive Streamlit state orchestration.",
    github_url: "https://github.com/bhola-dev58/CareMate-AI",
    deployed_url: undefined,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "proj-3",
    title: "JLiveChats -- Real-Time Multi-User Chat Client",
    slug: "jlivechats",
    shortDescription: "High-performance client-server Java desktop chat application supporting low-latency multi-room messaging.",
    description: "Multi-threaded desktop chat software built in Java using TCP Sockets and Java Swing GUI, deployed with AWS cloud hosting for multi-client routing.",
    category: "Full Stack",
    projectType: "Desktop Application & Networking",
    role: "Backend & Systems Engineer",
    status: "Published",
    featured: false,
    displayOrder: 4,
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
    problem: "Understanding low-level socket networking, socket connection drops, thread synchronization, and real-time message broadcasting without relying on third-party real-time abstractions.",
    approach: "Built a pure Java multi-threaded server application managing ClientHandler threads using thread pools and custom binary protocol over raw TCP Sockets:\n\n• Multi-Threaded Server: Dedicated ClientHandler thread per active connection using thread pools.\n• Room Broadcasting: Thread-safe channel broadcasting for multi-user chat rooms.\n• Custom Protocol: Lightweight binary message protocol with message typing and user status.\n• Desktop Client: Responsive Java Swing and AWT GUI with real-time UI event dispatching.",
    architecture: "Client-Server Socket Architecture:\n\n• Server: Multi-threaded Java ServerSocket process deployed on AWS EC2.\n• Client: Standalone Java Swing desktop application communicating via TCP Socket stream.\n• Protocol: Custom stream protocol for message framing, room joins, and disconnect events.",
    keyFeatures: [
      "Low-Latency TCP Messaging: Sub-second multi-user real-time message broadcasting",
      "Dynamic Thread Pooling: Multi-threaded server managing dedicated ClientHandler routines",
      "Swing & AWT Desktop UI: Responsive client interface with real-time UI event dispatching",
      "Presence Monitoring: Active client discovery and connection state tracking",
      "AWS EC2 Cloud Deployment: Headless server hosting with socket security group routing"
    ],
    challenges: "Key technical bottlenecks encountered:\n\n• Thread Synchronization: Preventing race conditions when multiple clients simultaneously send messages to the same room.\n• Abrupt Socket Disconnections: Handling sudden client terminations without crashing worker threads or leaking socket handles.",
    solutions: "Engineering solutions implemented:\n\n• Synchronized Collections: Utilized `CopyOnWriteArrayList` and synchronized broadcasting locks to guarantee thread safety.\n• Heartbeat & Cleanup Hooks: Implemented socket keepalive timeouts and graceful socket shutdown handlers.",
    results: "Quantified project impact:\n\n• Sub-1 second message delivery latency across simultaneous remote clients.\n• Robust connection management with zero server thread deadlocks under concurrent traffic.\n• Successfully deployed and routed on AWS EC2 instances.",
    learnings: "Core takeaways and skills acquired:\n\n• Low-level TCP/IP socket programming, network streams, and packet framing.\n• Java concurrency, thread pools, and thread synchronization patterns.\n• Cloud VM server deployment and network security groups.",
    github_url: "https://github.com/bhola-dev58/JLiveChats",
    deployed_url: undefined,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "proj-portfolio",
    title: "Full-Stack Developer Portfolio & Headless Admin CMS",
    slug: "developer-portfolio",
    shortDescription: "A production-grade, full-stack developer portfolio and headless CMS engineered with React 18, TypeScript, Three.js 3D physics, and a decoupled Express/MongoDB REST API.",
    description: "A full-stack portfolio platform and headless administrative CMS engineered for recruiter discovery, interactive project case studies, and live content management.\n\nBuilt on React 18, Vite, and TypeScript with Tailwind CSS and Framer Motion, it features real-time 3D Three.js magnetic particle physics, instant client-side state caching via TanStack React Query, and an administrative CMS with JWT authentication for dynamic management of projects, experiences, skills, and certifications.\n\nThe system includes dedicated case study pages with structured problem-solution workflows, executive summary cards, and dual-mode resilient architecture with automated offline fallback data ensuring 100% availability across edge CDNs.",
    category: "Full Stack",
    projectType: "Full-Stack Web App & Headless CMS",
    role: "Full-Stack Software Engineer & UI/UX Designer",
    status: "Published",
    featured: true,
    displayOrder: 4,
    period: "Apr 2026 – Present",
    startDate: "2026-04",
    endDate: "Present",
    highlights: [
      "Interactive 3D Particle Physics: Engineered real-time Three.js magnetic field canvas responding to cursor dynamics with locked 60 FPS rendering",
      "Headless Admin CMS Architecture: Built full CRUD administrative panels with JWT authentication for dynamic management of projects, experiences, skills, and certifications",
      "Comprehensive Case Study System: Implemented deep-dive architectural case studies featuring executive metrics, problem-approach callouts, and quantified engineering results",
      "Resilient Dual-Mode Caching: Engineered TanStack React Query client caching with automated offline fallback hydration ensuring 100% page availability",
      "Containerized & Cloud Deployed: Configured multi-stage Docker Compose orchestration alongside seamless Vercel edge deployment"
    ],
    tags: ["Full Stack", "React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Three.js", "Tailwind CSS", "Docker"],
    technologies: ["React 18", "TypeScript", "Vite", "Node.js", "Express.js", "MongoDB Atlas", "Three.js", "Tailwind CSS", "Framer Motion", "TanStack React Query", "JWT Auth", "Docker & Compose"],
    problem: "Static developer portfolios lack real-time content management capabilities, require manual Git commits for routine resume updates, and often fail to provide interactive engineering depth or scannable case studies for recruiters and hiring managers.",
    approach: "Architected a decoupled, full-stack platform featuring a high-performance React 18/TypeScript frontend and a secure Node.js Express REST API:\n\n• Interactive Presentation Tier: Three.js magnetic particle canvas, fluid Framer Motion transitions, and responsive Tailwind UI.\n• Headless CMS & Auth: Secure JWT-authenticated administration tier with modular CRUD managers for profile, skills, projects, and experiences.\n• Resilient Data Caching: TanStack React Query integration with optimistic UI updates, automated cache invalidation, and static data fallback.\n• Production Containerization: Docker and Docker Compose configs with multi-stage Nginx builds for containerized hosting.",
    architecture: "Decoupled Full-Stack Architecture:\n\n• Client Tier: React 18 with Vite, TypeScript, Tailwind CSS, Framer Motion, and Three.js canvas shaders.\n• State & Cache Layer: TanStack React Query with optimistic UI mutations, query invalidation, and synchronous initial data hydration.\n• Backend REST API: Modular Express.js service providing authenticated CRUD routes for projects, skills, education, experiences, and certifications.\n• Persistence: MongoDB Atlas cluster with structured Mongoose schemas and automated seeding scripts.",
    keyFeatures: [
      "Interactive 3D Three.js magnetic field particle canvas responding to cursor movements",
      "Headless Admin CMS Dashboard with JWT authentication for real-time portfolio management",
      "Comprehensive Case Study Reader with executive metrics, technical architecture, and impact breakdowns",
      "Resilient dual-mode architecture with automated offline/static fallback hydration",
      "Categorized Technical Skills matrix with dynamic MongoDB Atlas synchronization",
      "Responsive, accessibility-focused UI engineered for mobile, tablet, and desktop viewports",
      "Single-command containerized deployment via Docker and Docker Compose"
    ],
    challenges: "Key engineering bottlenecks encountered:\n\n• 3D Canvas Rendering Performance: Preventing Three.js particle animation loops from dropping frames or blocking the main React thread during heavy DOM interactions.\n• Edge Static Deployment vs Dynamic API: Ensuring the Vercel-hosted frontend renders smoothly with zero downtime even when the backend API is cold-starting or offline.\n• Real-Time CMS State Sync: Eliminating stale cache latency between admin management updates and public reader views.",
    solutions: "Engineering solutions implemented:\n\n• GPU-Accelerated Particle Shaders: Optimized Three.js requestAnimationFrame loops and memoized geometries to sustain locked 60 FPS.\n• Resilient Fallback Architecture: Programmed React Query queries with synchronous initial data hydration from strongly typed datasets, ensuring 100% page availability.\n• Granular Query Invalidation: Integrated automated cache invalidations across all CMS manager forms to guarantee instant UI synchronization.",
    results: "Quantified project impact:\n\n• 100% Lighthouse accessibility and best practices score.\n• Sub-second initial page load with Vite code-splitting and asset chunking.\n• Zero-downtime resilient offline fallback architecture across all public routes.\n• Fully functional headless admin CMS reducing portfolio update cycles from code deployments to seconds.",
    learnings: "Core takeaways and domain expertise gained:\n\n• Advanced Three.js particle dynamics and GPU-bound browser performance optimization.\n• Headless CMS architecture, JWT auth security, and RESTful resource modeling.\n• Production state management and cache synchronization with TanStack React Query.",
    github_url: "https://github.com/bhola-dev58/Portfolio",
    deployed_url: "https://bhola-yadav.vercel.app/",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80"
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
    internship_url: techsakshamPdf
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
    items: ["Python", "JavaScript", "TypeScript", "Java", "C++"]
  },
  {
    id: "skill-2",
    category: "Frameworks & Libraries",
    items: ["React.js", "Node.js", "Express.js", "FastAPI", "TensorFlow"]
  },
  {
    id: "skill-3",
    category: "Databases",
    items: ["MySQL", "MongoDB", "Firebase"]
  },
  {
    id: "skill-4",
    category: "Tools & Platforms",
    items: ["Git", "GitHub", "VS Code", "Firebase", "CI/CD", "AI Integration"]
  },
  {
    id: "skill-5",
    category: "AI / ML",
    items: ["Generative-AI", "Agentic-AI", "RAG"]
  }
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: "cert-0",
    name: "AWS Certified Developer - Associate Certification",
    issuer: "Infosys Springboard (2026)",
    url: awsCertPdf
  },
  {
    id: "cert-1",
    name: "React E-Commerce Platform Masterclass",
    issuer: "Scaler (2026)",
    url: reactEcommercePng
  },
  {
    id: "cert-2",
    name: "JavaScript Full-Stack Development",
    issuer: "Udemy (2025)",
    url: jsFullstackJpg
  },
  {
    id: "cert-3",
    name: "Full-Stack Web Development Mastery",
    issuer: "Udemy (2024)",
    url: fullstackPdf
  },
  {
    id: "cert-4",
    name: "Programming with Java",
    issuer: "NPTEL (2024)",
    url: javaPdf
  },
  {
    id: "cert-5",
    name: "Linux System Administration Mastery",
    issuer: "WsCube Tech",
    url: linuxPng
  },
  {
    id: "cert-6",
    name: "AI Transformative Learning -- TechSaksham",
    issuer: "Microsoft & SAP via Edunet (2025)",
    url: techsakshamPdf
  },
  {
    id: "cert-7",
    name: "Explore Machine Learning using Python",
    issuer: "Infosys Springboard (2025)",
    url: mlPythonPdf
  },
  {
    id: "cert-8",
    name: "Azure 303 for Beginners",
    issuer: "Simplilearn SkillUp",
    url: azurePdf
  },
  {
    id: "cert-9",
    name: "Flipkart GRID 6.0 -- Software Development Track",
    issuer: "Unstop / Flipkart (2024)",
    url: flipkartGridJpg
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
  phone_in: "+91-9198709984",
  address: "ITPL Main Road Bengaluru, Karnataka, India",
  address_temp: "ITPL Main Road Bengaluru, Karnataka, India",
  address_perm: "ITPL Main Road Bengaluru, Karnataka, India",
  github: "https://github.com/bhola-dev58",
  linkedin: "https://linkedin.com/in/bhola-dev58",
  leetcode: "https://leetcode.com/u/bhola-dev58",
  status_text: "Final-Year B.E. CS Student at CMRIT Bengaluru",
  open_for: "Seeking SDE / Full-Stack & AI Developer Opportunities in Bangalore & Remote"
};
