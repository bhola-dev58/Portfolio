const express = require('express');
const { Project } = require('../models');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/projects - public
router.get('/', async (req, res) => {
    try {
        const data = await Project.find().sort({ _id: 1 });
        // Map _id to id for frontend compatibility
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

// POST /api/projects - admin only
router.post('/', authMiddleware, async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ data: project });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/projects/:id - admin only
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ data: updated });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/projects/:id - admin only
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
