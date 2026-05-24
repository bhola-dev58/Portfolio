require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

// Import Routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const projectRoutes = require('./routes/projects');
const experienceRoutes = require('./routes/experiences');
const skillRoutes = require('./routes/skills');
const certificationRoutes = require('./routes/certifications');
const educationRoutes = require('./routes/education');
const messageRoutes = require('./routes/messages');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
    'http://localhost:8080',
    'http://localhost:8082',
    'http://localhost:5173',
    'http://localhost:3000',
    'https://www.bhola-yadav.com.np',
    'https://bhola-yadav.com.np'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        const isAllowed = allowedOrigins.includes(origin) || 
                          origin.endsWith('.vercel.app');
                          
        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/messages', messageRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Portfolio API is running' });
});

// Start server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Portfolio API running on port ${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
};

startServer();
