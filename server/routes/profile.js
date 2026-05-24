const express = require('express');
const { Profile } = require('../models');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/profile - public
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        // Map _id to id for frontend compatibility
        const data = profile.toObject();
        data.id = data._id;
        res.json({ data });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/profile/:id - admin only
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updated = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json({ data: updated });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
