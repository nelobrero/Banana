const pool = require('../db/pool');

// GET /api/entries - get all entries for the logged-in user
async function getEntries(req, res) {
  try {
    const result = await pool.query(
      'SELECT * FROM entries WHERE user_id = $1 ORDER BY entry_date DESC, created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
}

// POST /api/entries - create a new entry (with image upload)
async function createEntry(req, res) {
  const { caption, location, entry_date } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'An image is required' });
  }

  try {
    const imageUrl = req.file.path; // Cloudinary URL via multer-storage-cloudinary

    const result = await pool.query(
      `INSERT INTO entries (user_id, caption, image_url, location, entry_date)
       VALUES ($1, $2, $3, $4, COALESCE($5, CURRENT_DATE))
       RETURNING *`,
      [req.user.id, caption || null, imageUrl, location || null, entry_date || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create entry' });
  }
}

// DELETE /api/entries/:id - delete an entry (only if it belongs to the user)
async function deleteEntry(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM entries WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json({ message: 'Entry deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete entry' });
  }
}

// PUT /api/entries/:id - update caption/location of an entry
async function updateEntry(req, res) {
  const { id } = req.params;
  const { caption, location, entry_date } = req.body;

  try {
    const result = await pool.query(
      `UPDATE entries SET
         caption = COALESCE($1, caption),
         location = COALESCE($2, location),
         entry_date = COALESCE($3, entry_date)
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [caption, location, entry_date, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update entry' });
  }
}

module.exports = { getEntries, createEntry, deleteEntry, updateEntry };
