const express = require('express');
const router = express.Router();
const usuarioRepository = require('../repositories/usuarioRepository');
router.get('/', async (req, res) => {
  try {
    const user = await usuarioRepository.findAll();
    console.log(user);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await usuarioRepository.findById(req.params.id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = await usuarioRepository.create(req.body);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const user = await usuarioRepository.update(req.params.id, req.body);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try{
  const user = await usuarioRepository.remove(req.params.id);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    
    const usuario = await usuarioRepository.findByEmail(email);
    console.log(usuario);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Verifica se a senha está correta
    if (usuario.senha !=  senha) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }
    // Login bem-sucedido
    return res.status(200).json({
      message: 'Login realizado com sucesso.',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

module.exports = router;
