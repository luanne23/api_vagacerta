const Vaga = require('../models/vagas');

async function findAll() {
  try {
    return await Vaga.findAll();
  } catch (error) {
    throw new Error('Error fetching all jobs: ' + error.message);
  }
}

async function findById(id) {
  try {
    return await Vaga.findByPk(id);
  } catch (error) {
    throw new Error('Error fetching job by id: ' + error.message);
  }
}

async function create({ titulo, descricao, dataCadastro, telefone, status, empresa, ativo }) {
  try {
    return await Vaga.create({ titulo, descricao, dataCadastro, telefone, status, empresa, ativo });
  } catch (error) {
    throw new Error('Error creating job: ' + error.message);
  }
}

async function update(id, { titulo, descricao, dataCadastro, telefone, status, empresa, ativo }) {
  try {
    const vaga = await Vaga.findByPk(id);
    if (vaga) {
      vaga.titulo = titulo;
      vaga.descricao = descricao;
      vaga.dataCadastro = dataCadastro;
      vaga.telefone = telefone;
      vaga.status = status;
      vaga.empresa = empresa;
      vaga.ativo = ativo;
      await vaga.save();
      return vaga;
    }
    return null;
  } catch (error) {
    throw new Error('Error updating job: ' + error.message);
  }
}

async function remove(id) {
  try {
    const job = await Vaga.findByPk(id);
    if (job) {
      await job.destroy();
      return job;
    }
    return null;
  } catch (error) {
    throw new Error('Error deleting job: ' + error.message);
  }
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
