const express = require('express');
const { Message } = require('../models');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/messages - admin only
router.get('/', authMiddleware, async (req, res) => {
    try {
        const data = await Message.find().sort({ created_at: -1 });
        const mapped = data.map(d => {
            const obj = d.toObject();
            obj.id = obj._id;
            return obj;
        });
        res.json({ data: mapped });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/messages - public (contact form)
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const msg = await Message.create({ name, email, message });
        res.status(201).json({ data: msg });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/messages/:id - admin only
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
