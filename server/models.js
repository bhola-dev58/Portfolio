const mongoose = require('mongoose');

// Profile Schema (single document)
const profileSchema = new mongoose.Schema({
    email_personal: { type: String, default: '' },
    email_college: { type: String, default: '' },
    phone_in: { type: String, default: '' },
    phone_np: { type: String, default: '' },
    address_temp: { type: String, default: '' },
    address_perm: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    leetcode: { type: String, default: '' },
    status_text: { type: String, default: '' },
    open_for: { type: String, default: '' },
}, { timestamps: true });

// Projects Schema
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    tags: [{ type: String }],
    github_url: { type: String, default: null },
    deployed_url: { type: String, default: null },
}, { timestamps: true });

// Experiences Schema
const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company_name: { type: String, required: true },
    period: { type: String, required: true },
    type: { type: String, required: true },
    description: [{ type: String }],
    internship_url: { type: String, default: null },
}, { timestamps: true });

// Skills Schema
const skillSchema = new mongoose.Schema({
    category: { type: String, required: true },
    items: [{ type: String }],
}, { timestamps: true });

// Certifications Schema
const certificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    url: { type: String, required: true },
}, { timestamps: true });

// Education Schema
const educationSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    period: { type: String, required: true },
    score: { type: String, required: true },
}, { timestamps: true });

// Messages Schema
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
}, { timestamps: true });

// Admin Schema
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
const Project = mongoose.model('Project', projectSchema);
const Experience = mongoose.model('Experience', experienceSchema);
const Skill = mongoose.model('Skill', skillSchema);
const Certification = mongoose.model('Certification', certificationSchema);
const Education = mongoose.model('Education', educationSchema);
const Message = mongoose.model('Message', messageSchema);
const Admin = mongoose.model('Admin', adminSchema);

module.exports = {
    Profile,
    Project,
    Experience,
    Skill,
    Certification,
    Education,
    Message,
    Admin,
};
