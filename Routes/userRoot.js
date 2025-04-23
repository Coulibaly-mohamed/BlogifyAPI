import express from 'express';

const router = express.Router();

// Exemple de route
router.post('/', (req, res) => {
  res.send('Register user');
});

export default router;
