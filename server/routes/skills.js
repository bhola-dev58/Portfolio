const express = require('express');
const { Skill } = require('../models');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/skills - public
router.get('/', async (req, res) => {
    try {
        const data = await Skill.find().sort({ _id: 1 });
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

// POST /api/skills - admin only
router.post('/', authMiddleware, async (req, res) => {
    try {
        const skill = await Skill.create(req.body);
        const obj = skill.toObject();
        obj.id = obj._id;
        res.status(201).json({ data: obj });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/skills/:id - admin only
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        const obj = updated.toObject();
        obj.id = obj._id;
        res.json({ data: obj });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/skills/:id - admin only
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
