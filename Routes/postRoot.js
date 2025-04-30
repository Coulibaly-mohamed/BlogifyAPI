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
  // GET /posts (with optional filters: tag, author, date)
router.get('/posts', async (req, res) => {
  try {
    const { tag, author, date } = req.query;
    const filter = {};

    if (tag) {
      filter.tags = tag;
    }

    if (author) {
      filter.author = author;
    }

    if (date) {
      // suppose que `createdAt` est un champ Date dans le modèle
      const dateStart = new Date(date);
      const dateEnd = new Date(date);
      dateEnd.setHours(23, 59, 59, 999);
      filter.createdAt = { $gte: dateStart, $lte: dateEnd };
    }

    const posts = await Post.find(filter);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Route pour récupérer un post spécifique par ID
router.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'id depuis les paramètres de l'URL
    const post = await Post.findById(id); // Trouver le post dans la base de données par ID

    if (!post) {
      return res.status(404).json({ message: 'Post not found' }); // Si le post n'existe pas, renvoyer une erreur 404
    }

    res.status(200).json(post); // Si le post est trouvé, renvoyer le post avec une réponse 200
  } catch (err) {
    res.status(500).json({ message: err.message }); // En cas d'erreur serveur, renvoyer un message d'erreur
  }
});
// Route pour mettre à jour un post existant par ID
router.put('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID depuis les paramètres de l'URL
    const { title, content, tags } = req.body; // Récupérer les nouvelles données du post depuis le corps de la requête

    // Trouver le post dans la base de données par ID
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' }); // Si le post n'existe pas, renvoyer une erreur 404
    }

    // Mettre à jour les champs du post
    post.title = title || post.title; // Si un titre est fourni, on le met à jour, sinon on garde l'ancien
    post.content = content || post.content; // Idem pour le contenu
    post.tags = tags || post.tags; // Idem pour les tags

    // Sauvegarder les modifications dans la base de données
    const updatedPost = await post.save();

    res.status(200).json(updatedPost); // Renvoyer le post mis à jour avec une réponse 200
  } catch (err) {
    res.status(500).json({ message: err.message }); // En cas d'erreur serveur, renvoyer un message d'erreur
  }
});
// Route pour supprimer un post de manière définitive par ID
router.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID du post à supprimer depuis les paramètres de l'URL

    // Chercher le post par ID dans la base de données et le supprimer
    const post = await post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' }); // Si le post n'existe pas, retourner une erreur 404
    }

    res.status(200).json({ message: 'Post deleted successfully' }); // Si tout se passe bien, retourner une confirmation
  } catch (err) {
    res.status(500).json({ message: err.message }); // En cas d'erreur serveur, renvoyer un message d'erreur
  }
});


  export default router;