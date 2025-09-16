const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabaseClient');

// GET all categories
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST create a new category
router.post('/', async (req, res) => {
  const { name, thumbnail_url } = req.body;
  if (!name) return res.status(400).json({ error: 'Category name required' });

  const { data, error } = await supabase
    .from('categories')
    .insert([{ name, thumbnail_url }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// PATCH update category thumbnail
router.patch('/:id/thumbnail', async (req, res) => {
  const { id } = req.params;
  const { thumbnail_url } = req.body;

  if (!thumbnail_url) return res.status(400).json({ error: 'Thumbnail URL required' });

  const { data, error } = await supabase
    .from('categories')
    .update({ thumbnail_url })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// DELETE category (cascades to videos)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('categories').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true });
});

module.exports = router;