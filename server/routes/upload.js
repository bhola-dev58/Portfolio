const express = require('express');
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// POST /api/upload - Upload base64 or file binary payload
router.post('/', authMiddleware, (req, res) => {
    try {
        const { image, fileName, mimeType } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'No image data provided' });
        }

        // Handle base64 string
        let base64Data = image;
        let extension = 'png';

        if (image.startsWith('data:')) {
            const matches = image.match(/^data:(image\/(\w+));base64,(.+)$/);
            if (matches) {
                extension = matches[2] === 'jpeg' ? 'jpg' : matches[2];
                base64Data = matches[3];
            }
        } else if (mimeType) {
            const extMap = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg' };
            extension = extMap[mimeType] || 'png';
        }

        const nameWithoutExt = fileName ? path.parse(fileName).name.replace(/[^a-zA-Z0-9_-]/g, '_') : 'upload';
        const uniqueFileName = `${nameWithoutExt}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${extension}`;
        const filePath = path.join(uploadsDir, uniqueFileName);

        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(filePath, buffer);

        const fileUrl = `/uploads/${uniqueFileName}`;
        res.status(201).json({ data: { url: fileUrl, fileName: uniqueFileName } });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

module.exports = router;
