const router = require('express').Router();
const { Post, Comment } = require('../models');
const withAuth = require('../config/middleware').withAuth;

// GET all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: Comment }],
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new post
router.post('/posts', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a post
router.put('/posts/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a post
router.delete('/posts/:id', withAuth, async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all comments for a specific post
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        post_id: req.params.postId,
      },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new comment
router.post('/posts/:postId/comments', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.params.postId,
    });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
