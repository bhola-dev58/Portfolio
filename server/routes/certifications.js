const express = require('express');
const { Certification } = require('../models');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/certifications - public
router.get('/', async (req, res) => {
    try {
        const data = await Certification.find().sort({ _id: 1 });
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

// POST /api/certifications - admin only
router.post('/', authMiddleware, async (req, res) => {
    try {
        const cert = await Certification.create(req.body);
        res.status(201).json({ data: cert });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/certifications/:id - admin only
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updated = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ data: updated });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/certifications/:id - admin only
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Certification.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
