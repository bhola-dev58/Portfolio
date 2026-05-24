const express = require('express');
const { Education } = require('../models');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/education - public
router.get('/', async (req, res) => {
    try {
        const data = await Education.find().sort({ _id: 1 });
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

// POST /api/education - admin only
router.post('/', authMiddleware, async (req, res) => {
    try {
        const edu = await Education.create(req.body);
        res.status(201).json({ data: edu });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/education/:id - admin only
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ data: updated });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/education/:id - admin only
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
