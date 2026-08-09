const express = require('express');
const multer = require('multer');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { storage } = require('../config/cloudinary');
const {
  getEntries,
  createEntry,
  deleteEntry,
  updateEntry,
} = require('../controllers/entriesController');

const upload = multer({ storage });

// All routes here require a valid JWT
router.use(requireAuth);

router.get('/', getEntries);
router.post('/', upload.array('images', 10), createEntry);
router.put('/:id', updateEntry);
router.delete('/:id', deleteEntry);

module.exports = router;
