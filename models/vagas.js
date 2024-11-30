const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vaga = sequelize.define('Vagas', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataCadastro: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  empresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Vaga;
