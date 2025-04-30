import express from 'express';

const router = express.Router();
router.post('/posts', async (req, res) => {
    try {
      const { title, content, author, tags } = req.body;
      const newPost = new Post({ title, content, author, tags });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  export default router;