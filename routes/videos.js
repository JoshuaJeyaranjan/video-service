const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabaseClient');

// GET videos by category ID
router.get('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST add video
router.post('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const { title, url, thumbnail_url, description } = req.body;

  if (!title || !url) return res.status(400).json({ error: 'Title and URL required' });

  const { data, error } = await supabase
    .from('videos')
    .insert([{ category_id: categoryId, title, url, thumbnail_url, description }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// PATCH update video thumbnail
router.patch('/:id/thumbnail', async (req, res) => {
  const { id } = req.params;
  const { thumbnail_url } = req.body;

  if (!thumbnail_url) return res.status(400).json({ error: 'Thumbnail URL required' });

  const { data, error } = await supabase
    .from('videos')
    .update({ thumbnail_url })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// DELETE video
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from('videos').delete().eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true });
});

module.exports = router;