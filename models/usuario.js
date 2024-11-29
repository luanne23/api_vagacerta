const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Função para criar o usuário administrador caso não exista nenhum usuário
const inicializarAdministrador = async () => {
  try {
    
    const usuarios = await Usuario.findAll();

    // Se não houver usuários, cria o administrador
    if (usuarios.length === 0) {
      await Usuario.create({
        nome: 'Administrador',
        email: 'admim@admin.com',
        senha: 'admin', 
      });
      console.log('Usuário administrador criado com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao inicializar o administrador:', error);
  }
};

// Chama a função para garantir que o administrador seja criado na inicialização
inicializarAdministrador();

module.exports = Usuario;
