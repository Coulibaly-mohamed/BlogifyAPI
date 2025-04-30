import express from 'express';

const router = express.Router();

//Post /register
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
  }

  try {
    // Vérifie si l’email ou le username existe déjà
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Email ou nom d’utilisateur déjà utilisé.' });
    }

    const newUser = new User({ email, username, password });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur enregistré avec succès !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de l’inscription.' });
  }
});


  // GET /users/:id
  router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await user.findById(id).select('-password'); // Exclut le mot de passe
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération du profil." });
  }
});

// PUT /users/:id
router.put('/id', async (req, res)=>{
  const  { id } = req.params;
  const { username, email, password } = req.body

  try {
      const updatedUser = await User.findByIdAndUpdate(
          id,
          { username, email, password },
          { new: true }
      )

      if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' })
      }

      res.status(200).json(updatedUser)
  } catch (error) {
      console.error('Error updating user:', error)
      res.status(500).json({ error: 'Internal server error' })
  }
  
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
      const deletedUser = await User.findByIdAndDelete(id)

      if (!deletedUser) {
          return res.status(404).json({ error: 'User not found' })
      }

      res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
      console.error('Error deleting user:', error)
      res.status(500).json({ error: 'Internal server error' })
  }
})




export default router;
