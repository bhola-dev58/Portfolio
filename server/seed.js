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
            address: 'ITPL Main Road Bengaluru, Karnataka, India',
            address_temp: 'ITPL Main Road Bengaluru, Karnataka, India',
            address_perm: 'ITPL Main Road Bengaluru, Karnataka, India',
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
            shortDescription: "A clinical-grade diagnostic PACS workstation powered by a Heterogeneous Tri-Ensemble (ConvNeXt-Small, InceptionV3, DenseNet121) achieving 98.88% accuracy with Brain-Masked Grad-CAM++ visual explainability and automated PDF triage reporting.",
            description: "BrainTumorXAI is an end-to-end, clinical-grade medical imaging platform engineered to detect, classify, and segment brain tumors from multi-sequence MRI scans with real-time visual explainability.\n\nBuilt on a heterogeneous tri-ensemble calibrated with Nelder-Mead optimization and 10-Pass Test-Time Augmentation (TTA), the framework achieves a state-of-the-art 98.88% diagnostic accuracy on the benchmark BraTS 2019 dataset.\n\nTo ensure safety and interpretability in clinical practice, it introduces Brain-Masked Grad-CAM++, which utilizes dynamic Otsu contouring and Hadamard tissue gating to suppress 100% of non-cerebral artifacts and skull leakage.\n\nThe system features a full-stack Web PACS workstation with real-time multi-colormap saliency viewports, automated morphological lesion quantification (mm² area and severity grading), automated clinical PDF generation via ReportLab, and containerized zero-setup deployment via Docker.",
            problem: "Traditional manual radiologic interpretation of brain MRI scans is time-intensive, subject to inter-observer variability, and vulnerable to diagnostic bottlenecks during emergency triage.\n\nWhile standard deep learning architectures achieve promising classification scores, they behave as uninterpretable 'black boxes.' Standard explainability methods like Grad-CAM suffer from intense skull-edge leakage and non-cerebral artifacts, misattributing predictions to bone rather than brain tissue and undermining clinician trust.",
            approach: "Engineered a multi-stage clinical intelligence pipeline:\n\n• Stage 1 — Preprocessing & Isolation: Min-max intensity normalization and dynamic Otsu contour isolation to strip non-brain cranial tissue.\n• Stage 2 — Heterogeneous Tri-Ensemble: Combines three distinct inductive biases: modern spatial convolutional patches (ConvNeXt-Small, 39%), multi-scale spatial receptive fields (InceptionV3, 32%), and dense feature reuse (DenseNet121, 29%).\n• Stage 3 — Test-Time Augmentation (TTA): 10-Pass TTA with Nelder-Mead simplex-optimized soft voting calibration.\n• Stage 4 — Anatomical Gating: Anatomically Constrained Grad-CAM++ with second-order gradients gated by anatomical tissue masks.\n• Stage 5 — Lesion Segmentation & Triage: Weakly-supervised morphological lesion boundary segmentation and automated ReportLab PDF triage reporting.",
            architecture: "Full-stack decoupled architecture engineered for clinical throughput:\n\n• Deep Learning Inference Tier: TensorFlow/Keras engine with CPU-optimized asynchronous execution and multi-model pipeline caching.\n• Backend REST Service: High-throughput FastAPI ASGI service with non-blocking model initialization and SQLite patient history auditing with SHA-256 provenance hashes.\n• Clinical PACS Workstation: Responsive workstation built with HTML5/CSS3/ES6+ featuring quad-view multi-layer canvases, client-side dynamic colormaps (Jet, Turbo, Inferno, Viridis), and interactive threshold sliders.",
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
            challenges: "Key engineering challenges addressed:\n\n• Skull-Edge Artifact Leakage: Standard Grad-CAM suffers from intense false saliency peaks on cranial bone, creating diagnostic misattributions.\n• High Memory Footprint: ~833 MB model weights and computational graphs caused memory spikes on resource-constrained containers.\n• Startup Cold-Start Latency: Synchronously loading 3 large deep learning models caused timeout during API startup.\n• Container Volume Masking: Empty Docker bind-mounts inadvertently masked pre-baked model weights.",
            solutions: "Engineered solutions and architectural interventions:\n\n• Hadamard Tissue Gating: Formulated dynamic Otsu contour brain masks that multiply raw saliency gradients, completely eliminating skull-edge leakage.\n• Memory Optimization: Configured TensorFlow memory allocators (MALLOC_ARENA_MAX=2) and leveraged DenseNet121 as primary XAI feature extractor.\n• Asynchronous Lifespan Loading: Engineered FastAPI lifespan event handlers to bind HTTP ports in <1s while deep learning models load in the background.\n• Dedicated Named Volumes: Structured Docker Compose with named volume caching (brain-tumor-models) to preserve model weights.",
            results: "Clinical metrics and benchmark achievements:\n\n• 98.88% Overall Diagnostic Accuracy on benchmark BraTS 2019 validation cohort (Macro-F1: 98.75%, Precision: 98.85%, Recall: 98.80%).\n• 0.902 Dice Similarity Coefficient for weakly-supervised lesion boundary segmentation.\n• <2.5 Seconds End-to-End Inference per MRI scan on commodity CPU hardware.\n• 100% Non-Cerebral Artifact Elimination via Hadamard anatomical gating.",
            learnings: "Core takeaways and domain expertise gained:\n\n• Heterogeneous ensemble calibration and simplex-based voting weight optimization.\n• Clinical Explainable AI (XAI) mathematics and anatomical tissue gating.\n• Asynchronous ASGI server architecture with TensorFlow deep learning runtimes.\n• Production multi-stage Docker containerization and persistent storage volume mechanics.",
            github_url: "https://github.com/bhola-dev58/brain-xai-ensemble",
            doc_url: "https://www.kaggle.com/code/bholadev58/braintumor-98pct-ensemble-training",
            deployed_url: "https://brain-tumor-xai-jf4z.onrender.com/",
            image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop&q=80"
        },
        {
            title: "TrustMoss — Real-Time Trust, Security & Reliability Gateway for AI Agents",
            slug: "trustmoss",
            shortDescription: "Enterprise runtime trust and security gateway for autonomous AI voice and text agents, achieving sub-45ms P95 latency with sub-15ms Moss vector retrieval, speculative parallel NLI groundedness verification, WebRTC circuit breaking, and HITL hot-patching.",
            description: "TrustMoss is an enterprise runtime trust and security gateway engineered to eliminate hallucinations, prompt injections, and PII exfiltration in autonomous multi-agent voice and text systems with sub-45ms P95 overhead.\n\nDeveloped for the YC Fall 2026 x Moss: Zero Latency Builder Sprint, TrustMoss sits as an active zero-trust verification intermediary between client ingress (duplex WebRTC voice or text chat) and LLM response generation.\n\nBy coupling Moss hybrid sparse-dense vector retrieval (<15ms) with ultra-fast generation (Groq Llama-3.1-8B and Gemini Flash), the platform introduces a speculative parallel Natural Language Inference (NLI) pipeline to evaluate premise-hypothesis entailment in under 5ms. In addition, an automated WebRTC audio circuit breaker suppresses hallucinated speech in-flight, while an encrypted Human-in-the-Loop (HITL) triage console enables 1-click atomic knowledge index hot-patching with zero downtime.",
            category: "AI / ML",
            projectType: "Enterprise AI Safety Gateway & Real-Time Guardrails",
            role: "Lead Full-Stack & AI Systems Architect",
            status: "Published",
            featured: true,
            displayOrder: 2,
            period: "Sep 2026 – Present",
            startDate: "2026-09",
            endDate: "Present",
            highlights: [
                "<45ms P95 End-to-End Latency: Achieves real-time trust verification overhead without violating conversational voice turnaround budgets.",
                "<15ms Context Retrieval: Powered by Moss hybrid sparse-dense vector retrieval with domain namespace prefixing.",
                "<5ms Groundedness Evaluation: Replaced 400ms+ LLM-as-a-judge pipelines with speculative parallel NLI cross-encoders.",
                "Real-Time WebRTC Voice Circuit Breaker: Intercepts in-flight audio packets via LiveKit to prevent hallucinated speech from reaching user ears.",
                "93% MTTR Reduction: Cut incident remediation from 4.2 minutes to 18 seconds via 1-click atomic shadow index hot-patching.",
                "257+ Automated Tests & Zero CVEs: 100% test pass rate with an 85%+ coverage gate and clean Bandit/pip-audit security scans."
            ],
            tags: [
                "AI / ML",
                "Python",
                "FastAPI",
                "Next.js",
                "WebRTC",
                "PostgreSQL",
                "Redis",
                "Docker",
                "Terraform",
                "Security"
            ],
            technologies: [
                "Next.js 14 (App Router)",
                "React 18",
                "FastAPI",
                "Python 3.12",
                "Moss Vector Engine",
                "Groq (Llama-3.1-8B)",
                "Gemini Flash",
                "LiveKit (WebRTC)",
                "PostgreSQL 16 (JSONB)",
                "Redis 7",
                "HashiCorp Vault",
                "Microsoft Presidio",
                "Grafana k6 OSS",
                "Terraform",
                "Docker & Compose",
                "Pytest (257+ Tests)"
            ],
            keyFeatures: [
                "Sub-15ms Moss hybrid vector retrieval with domain context prefixing",
                "Speculative parallel NLI (<5ms) for microsecond factual consistency evaluation",
                "Dynamic tri-state Trust Score aggregator (PASS/WARN/FAIL) and automated strike circuit breaker",
                "LiveKit WebRTC voice gateway with in-flight audio packet suppression",
                "Real-time microsecond latency waterfall HUD powered by OpenTelemetry W3C traceparents",
                "Closed-loop Human-in-the-Loop (HITL) triage portal with side-by-side NLI token diffs",
                "1-Click atomic knowledge index hot-patching with Git-like semantic commit rollback",
                "Native Grafana k6 OSS performance testing engine with automated P95 < 45ms SLA gating",
                "Cryptographic audit trail with SHA-256 Merkle leaf hashing and GDPR/EU AI Act compliance export",
                "Unified multi-tier secrets cascade (HashiCorp Vault -> AWS Secrets Manager -> .env)"
            ],
            challenges: "Key engineering bottlenecks resolved:\n\n• The Verification vs Latency Dilemma: Traditional LLM-as-a-judge pipelines introduce 300–800ms of latency, destroying real-time conversational voice cadence.\n• In-Flight Audio Interception: Standard post-generation checks cannot prevent already-transmitted WebRTC audio packets from playing in user ears.\n• Atomic Zero-Downtime Index Updates: Modifying live vector databases normally requires full re-indexing or locking tables, risking stale reads.\n• Local High-Concurrency Benchmarking: Cloud load testing services require paid SaaS subscriptions and internet routing, compromising local development privacy.\n• Multi-Tier Secret Resilience: Managing secure key rotation across production Vault clusters while ensuring zero-downtime fallback to local environments.",
            solutions: "Innovative architectural solutions implemented:\n\n• Speculative Parallel NLI: Evaluates drafted token buffers in parallel with stream generation using a 4-bit cross-encoder, cutting verification overhead to <5ms.\n• Chunk-Buffered WebRTC Interceptor: Buffers audio packets behind a 200ms speculative window, issuing packet suppression signals if groundedness trips mid-sentence.\n• Git-Like Index Version Registry: Writes human corrections to a staged shadow index and promotes it via an atomic pointer swap in <1ms after automated sanity tests pass.\n• Native Grafana k6 OSS Orchestrator: Built an embedded load test engine executing 5 standard traffic profiles locally with automated P95 < 45ms SLA assertions.\n• Cascading SecretProvider: Engineered a dynamic key resolution chain (Vault KV v2 -> AWS Secrets Manager -> .env) with TTL caching and instant cache invalidation hooks.",
            results: "Quantified engineering benchmarks and operational impact:\n\n• 93% Reduction in End-to-End Latency: Maintained <45ms P95 overhead compared to 650–1200ms traditional guardrail baselines.\n• 98.5% Lower Groundedness Evaluation Overhead: Reduced factuality verification from 350–700ms down to <5ms.\n• 93% Operational MTTR Reduction: Dropped knowledge remediation time from 4.2 minutes down to 18 seconds.\n• 84% Operator Alert Fatigue Reduction: Filtered false positives down to 16% through NLI confidence thresholds.\n• 257+ Automated Tests: Achieved 100% test pass rate with strict 85%+ coverage gate and 0 High/Critical CVEs.",
            learnings: "Core technical insights and architectural mastery:\n\n• Microsecond latency budget optimization for synchronous real-time voice and text agent pipelines.\n• Natural Language Inference (NLI) mathematical formulations and speculative cross-encoder evaluation.\n• WebRTC SFU media pipelines, live packet suppression, and duplex audio streaming with LiveKit.\n• Immutable cryptographic audit ledgers, Merkle tree hashing, and enterprise regulatory compliance (GDPR / EU AI Act).\n• Declarative cloud infrastructure using Terraform, multi-stage Docker containerization, and automated canary deployments.",
            github_url: "https://github.com/bhola-dev58/TrustMoss",
            deployed_url: "https://trustmoss.vercel.app",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80"
        },
        {
            title: "Smart Coach LMS -- Full-Stack Coaching Center Management Platform",
            slug: "smart-coach-lms",
            shortDescription: "Enterprise coaching platform and LMS built with Next.js App Router and Node.js, featuring automated Razorpay payment webhooks, a 6-month validity lifecycle engine, access-controlled YouTube Live lecture streaming, and RBAC portals for 100+ active learners.",
            description: "Smart Coach LMS (Gradify Academy) is a production-grade, full-stack educational management platform and LMS engineered to streamline batch scheduling, live lectures via the YouTube Live API, automated enrollment billing, and student lifecycle tracking for coaching institutes.\n\nBuilt on the Next.js App Router and a high-performance Express REST API connected to MongoDB Atlas, the platform eliminates operational bottlenecks by automating student onboarding, enrollment validity cycles, and batch roadmaps.\n\nIt features enterprise-grade financial integrations with the Razorpay Payment Gateway, utilizing cryptographic HMAC-SHA256 signature verification and atomic database operations to guarantee idempotent payment reconciliation. In addition, an automated 6-month validity engine manages rolling course expirations, renewal reminders, and retention discounts while role-based portals provide tailored workflows for Admins, Instructors, and Students.",
            category: "Full Stack",
            projectType: "SaaS Web Application",
            role: "Full Stack Software Engineer",
            status: "Published",
            featured: true,
            displayOrder: 3,
            period: "Feb 2025 – Present",
            startDate: "2025-02",
            endDate: "Present",
            highlights: [
                "100+ Active Students Managed: Scaled live production system for Gradify Academy with 100+ concurrent learners across hybrid coaching batches",
                "Idempotent Payment Webhook Engine: Handled automated Razorpay payment captures with 100% reconciliation accuracy via HMAC-SHA256 verification and atomic seat locking",
                "6-Month Automated Validity Cycle: Implemented automated course lifecycle engine with expiry reminders and single-click discounted renewals",
                "60% Administrative Overhead Reduction: Automated manual batch allocations, payment confirmations, and lecture notifications into a unified dashboard",
                "Integrated YouTube Live Streaming: Embedded scheduled lecture feeds with access control, preventing unauthorized video link distribution",
                "Sub-200ms API Performance: Optimized MongoDB query execution and compound indexing, sustaining fast dashboard render times under concurrent classroom usage"
            ],
            tags: ["Full Stack", "Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "Razorpay", "TypeScript"],
            technologies: ["Next.js 14", "React 18", "TypeScript", "Node.js", "Express.js", "MongoDB Atlas", "Mongoose", "Razorpay Payment Gateway", "YouTube Live API", "JWT Authentication", "Tailwind CSS", "Lucide React", "Postman"],
            problem: "Educational coaching institutes faced severe operational friction attempting to manage dual offline and online batches across fragmented spreadsheets, manual WhatsApp broadcast groups, and paper registers.\n\nManual verification of bank transfers led to enrollment delays, course validity expirations were tracked manually—causing revenue leakage or accidental lockout—and sharing unlisted live stream links invited unauthorized course piracy without student engagement analytics.",
            approach: "Architected a scalable full-stack SaaS platform utilizing Next.js App Router and Node.js with MongoDB Atlas:\n\n• Stage 1 — Role-Based Access Control: Engineered multi-tier RBAC separating Admin operations (financial telemetry, instructor oversight) from Instructor tools (batch scheduling, curriculum delivery) and Student learning interfaces.\n• Stage 2 — Idempotent Payment Pipeline: Integrated Razorpay Checkout with server-side HMAC-SHA256 signature verification and atomic MongoDB transactions to eliminate duplicate enrollments during network drops.\n• Stage 3 — Automated Validity Engine: Built dynamic validity calculators supporting 6-month rolling access windows with automated renewal alerts and student retention discount mechanics.\n• Stage 4 — Secure Live Video Delivery: Connected the YouTube Live API with permission-gated player embeds to stream scheduled lectures directly inside the authenticated student portal.\n• Stage 5 — Real-Time Administrative Telemetry: Developed responsive dashboards providing instant insights into batch capacity utilization, active learners, and revenue metrics.",
            architecture: "Decoupled Full-Stack Architecture:\n\n• Client Presentation Tier: Next.js App Router with server-side rendering, dynamic student portals, Tailwind CSS layout, and optimistic UI transitions.\n• API & Business Logic Tier: High-throughput Node.js / Express.js REST API service with JWT authentication, custom role authorization middleware, and rate-limited endpoints.\n• Event & Webhook Pipeline: Asynchronous webhook listener verifying Razorpay cryptographic HMAC signatures with idempotent database writes.\n• Persistence Tier: MongoDB Atlas with compound indexes on enrollment statuses, compound student-course uniqueness keys, and time-to-live (TTL) expiration tracking.",
            keyFeatures: [
                "Multi-Tier Role-Based Access Control (Granular Admin, Instructor, and Student portals)",
                "Idempotent Razorpay Payment Gateway with Automated Webhook Reconciliation",
                "6-Month Course Validity Engine with Automated Expiration Reminders and Retention Discounts",
                "YouTube Live API Scheduled Broadcasts with Authenticated In-App Player Embeds",
                "Interactive Real-Time Administrative Analytics Dashboard Tracking Revenue and Enrollment Trends",
                "Comprehensive Batch & Curriculum Roadmapping with Lecture Syllabus Management",
                "Student Assignment Submission & Grading Workflow with Feedback Logging",
                "Automated Transaction Receipt Generation and Email Enrollment Confirmations"
            ],
            challenges: "Key technical bottlenecks encountered:\n\n• Webhook Race Conditions & Double Enrolling: Concurrent webhook deliveries during payment retries threatened duplicate enrollments and corrupted course seat counters.\n• Dynamic Validity Calculations: Accurately enforcing rolling 6-month validity periods across varying calendar month lengths without periodic cron service bottlenecks.\n• Unauthorized Lecture Link Leaks: Students sharing private YouTube streaming URLs outside the portal, undermining course exclusivity.\n• Complex RBAC Route Guarding: Managing protected route hierarchies across Next.js client navigation and Express API endpoints without token desynchronization.",
            solutions: "Engineering solutions implemented:\n\n• Atomic Idempotency Locks: Integrated MongoDB `findOneAndUpdate` atomic operations with unique transaction ID constraints to discard redundant webhook payloads.\n• Timestamp Normalization & Indexed Validity Queries: Engineered server-side UTC timestamp calculators paired with compound indexed date queries (`expiryDate <= now`) for instant access checks.\n• Domain-Restricted Video Player Embeds: Restricted YouTube embed permissions and injected time-expiring session tokens into student player viewports.\n• Unified JWT Middleware & Refresh Cycles: Standardized HTTP-only cookie JWT tokens with synchronized client auth state guards in Next.js middleware.",
            results: "Quantified project impact:\n\n• 100+ Active Students managed simultaneously across live batches on Gradify Academy.\n• 60% Reduction in administrative time spent on manual batch allotments and fee verifications.\n• 100% Payment Webhook Accuracy with zero recorded duplicate enrollments or dropped transactions.\n• <200ms Average API latency across student portal queries and lecture metadata fetches.",
            learnings: "Core takeaways and domain expertise gained:\n\n• Production financial transaction security, HMAC cryptographic signature verification, and idempotent webhook architecture.\n• Full-stack Next.js App Router patterns, server-side data fetching, and client hydration boundaries.\n• High-concurrency database locking, atomic updates, and compound indexing strategies in MongoDB.\n• Educational platform domain modeling, student lifecycle tracking, and third-party media API integrations.",
            github_url: "https://github.com/bhola-dev58/smart-coach-lms",
            deployed_url: "https://gradify.academy/",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
        },
        {
            title: "CareMate-AI -- AI-Powered Healthcare Chatbot",
            slug: "caremate-ai",
            shortDescription: "AI medical triage assistant powered by Google Gemini API and Streamlit, delivering low-latency health guidance with 30% API token savings through hash caching, hands-free voice recognition, persistent session logging, and enforced clinical disclaimers.",
            description: "An intelligent medical assistant application leveraging Generative AI models to assist users in understanding medical terms, symptom analysis, and general health recommendations with voice interaction.",
            category: "AI / GenAI",
            projectType: "AI Assistant",
            role: "AI & Full Stack Engineer",
            status: "Published",
            featured: true,
            displayOrder: 5,
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
            problem: "Patients and individuals frequently struggle to obtain quick, reliable clarification on medical terminology or preliminary symptom information without navigating dense, unverified search results.",
            approach: "Constructed an interactive intelligent health assistant combining Generative AI with voice recognition:\n\n• Gemini AI Integration: Connected Google Gemini API with custom prompt engineering to enforce safety boundaries.\n• Response Caching: In-memory query hashing to store answers for frequent non-personalized medical queries.\n• Voice Interface: Speech-to-text recognition allowing hands-free symptom inquiries.\n• Medical Guardrails: Automated disclaimer prompts and strict advisory boundaries.",
            architecture: "Streamlit Application Architecture:\n\n• UI Layer: Interactive Streamlit interface with reactive chat state management.\n• AI Inference: Google Generative AI Python SDK connection with temperature calibration for medical consistency.\n• Cache Layer: Query hash map caching reducing duplicate API token consumption.",
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
            deployed_url: null,
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"
        },
        {
            title: "JLiveChats -- Real-Time Multi-User Chat Client",
            slug: "jlivechats",
            shortDescription: "High-performance client-server Java desktop chat system built using multi-threaded TCP/IP Sockets, Swing, and AWT, featuring dynamic ClientHandler thread pooling, sub-second room broadcasting, socket keepalive handling, and cloud routing on AWS EC2.",
            description: "Multi-threaded desktop chat software built in Java using TCP Sockets and Java Swing GUI, deployed with AWS cloud hosting for multi-client routing.",
            category: "Full Stack",
            projectType: "Desktop Application & Networking",
            role: "Backend & Systems Engineer",
            status: "Published",
            featured: false,
            displayOrder: 6,
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
            deployed_url: null,
            image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80"
        },
        {
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
            challenges: "Key technical bottlenecks encountered:\n\n• 3D Canvas Rendering Performance: Preventing Three.js particle animation loops from dropping frames or blocking the main React thread during heavy DOM interactions.\n• Edge Static Deployment vs Dynamic API: Ensuring the Vercel-hosted frontend renders smoothly with zero downtime even when the backend API is cold-starting or offline.\n• Real-Time CMS State Sync: Eliminating stale cache latency between admin management updates and public reader views.",
            solutions: "Engineering solutions implemented:\n\n• GPU-Accelerated Particle Shaders: Optimized Three.js requestAnimationFrame loops and memoized geometries to sustain locked 60 FPS.\n• Resilient Fallback Architecture: Programmed React Query queries with synchronous initial data hydration from strongly typed datasets, ensuring 100% page availability.\n• Granular Query Invalidation: Integrated automated cache invalidations across all CMS manager forms to guarantee instant UI synchronization.",
            results: "Quantified project impact:\n\n• 100% Lighthouse accessibility and best practices score.\n• Sub-second initial page load with Vite code-splitting and asset chunking.\n• Zero-downtime resilient offline fallback architecture across all public routes.\n• Fully functional headless admin CMS reducing portfolio update cycles from code deployments to seconds.",
            learnings: "Core takeaways and domain expertise gained:\n\n• Advanced Three.js particle dynamics and GPU-bound browser performance optimization.\n• Headless CMS architecture, JWT auth security, and RESTful resource modeling.\n• Production state management and cache synchronization with TanStack React Query.",
            github_url: "https://github.com/bhola-dev58/Portfolio",
            deployed_url: "https://bhola-yadav.vercel.app/",
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80"
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
            {
                category: 'AI / ML',
                items: ['Generative-AI', 'Agentic-AI', 'RAG'],
            },
        ]);
        console.log('Skills records created (5 categories)');
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
