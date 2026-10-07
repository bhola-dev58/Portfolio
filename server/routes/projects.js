const express = require('express');
const { Project } = require('../models');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const slugify = (text) => {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

// GET /api/projects - Public: returns only published projects
router.get('/', async (req, res) => {
    try {
        const data = await Project.find({ status: 'Published' }).sort({ displayOrder: 1, publishedAt: -1, _id: 1 });
        const mapped = data.map(d => {
            const obj = d.toObject();
            obj.id = obj._id;
            return obj;
        });
        res.json({ data: mapped });
    } catch (error) {
        console.error('Error fetching public projects:', error);
        res.status(500).json({ error: 'Server error fetching projects' });
    }
});

// GET /api/projects/admin/all - Admin only: returns all projects (Draft, Published, Archived)
router.get('/admin/all', authMiddleware, async (req, res) => {
    try {
        const data = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
        const mapped = data.map(d => {
            const obj = d.toObject();
            obj.id = obj._id;
            return obj;
        });
        res.json({ data: mapped });
    } catch (error) {
        console.error('Error fetching admin projects:', error);
        res.status(500).json({ error: 'Server error fetching admin projects' });
    }
});

// GET /api/projects/:slug - Public / Admin: fetch project by slug
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const project = await Project.findOne({ slug });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // If not published, check if admin request
        if (project.status !== 'Published') {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(404).json({ error: 'Project not found' });
            }
        }

        const obj = project.toObject();
        obj.id = obj._id;
        res.json({ data: obj });
    } catch (error) {
        console.error('Error fetching project by slug:', error);
        res.status(500).json({ error: 'Server error fetching project detail' });
    }
});

// POST /api/projects - Admin only: Create project
router.post('/', authMiddleware, async (req, res) => {
    try {
        const body = { ...req.body };
        if (!body.title) {
            return res.status(400).json({ error: 'Project title is required' });
        }

        if (!body.slug) {
            body.slug = slugify(body.title);
        } else {
            body.slug = slugify(body.slug);
        }

        // Ensure unique slug
        let existing = await Project.findOne({ slug: body.slug });
        if (existing) {
            body.slug = `${body.slug}-${Date.now().toString().slice(-4)}`;
        }

        const project = await Project.create(body);
        const obj = project.toObject();
        obj.id = obj._id;
        res.status(201).json({ data: obj });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: error.message || 'Server error creating project' });
    }
});

// PUT /api/projects/:id - Admin only: Update project
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const body = { ...req.body };
        if (body.slug) {
            body.slug = slugify(body.slug);
            const existing = await Project.findOne({ slug: body.slug, _id: { $ne: req.params.id } });
            if (existing) {
                return res.status(400).json({ error: 'A project with this slug already exists.' });
            }
        }

        const updated = await Project.findByIdAndUpdate(req.params.id, body, { new: true });
        if (!updated) {
            return res.status(404).json({ error: 'Project not found' });
        }
        const obj = updated.toObject();
        obj.id = obj._id;
        res.json({ data: obj });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: error.message || 'Server error updating project' });
    }
});

// PATCH /api/projects/:id/publish - Admin only: Toggle publish status
router.patch('/:id/publish', authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Draft', 'Published', 'Archived'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            { status, publishedAt: status === 'Published' ? new Date() : undefined },
            { new: true }
        );
        const obj = updated.toObject();
        obj.id = obj._id;
        res.json({ data: obj });
    } catch (error) {
        res.status(500).json({ error: 'Server error updating publish status' });
    }
});

// PATCH /api/projects/:id/featured - Admin only: Toggle featured
router.patch('/:id/featured', authMiddleware, async (req, res) => {
    try {
        const { featured } = req.body;
        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            { featured: Boolean(featured) },
            { new: true }
        );
        const obj = updated.toObject();
        obj.id = obj._id;
        res.json({ data: obj });
    } catch (error) {
        res.status(500).json({ error: 'Server error updating featured flag' });
    }
});

// POST /api/projects/reorder - Admin only: Reorder projects
router.post('/reorder', authMiddleware, async (req, res) => {
    try {
        const { items } = req.body; // Array of { id, displayOrder }
        if (!Array.isArray(items)) {
            return res.status(400).json({ error: 'Items array is required' });
        }

        const updates = items.map(item =>
            Project.findByIdAndUpdate(item.id, { displayOrder: item.displayOrder })
        );
        await Promise.all(updates);

        res.json({ message: 'Projects reordered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error reordering projects' });
    }
});

// DELETE /api/projects/:id - Admin only: Delete project
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error deleting project' });
    }
});

module.exports = router;
