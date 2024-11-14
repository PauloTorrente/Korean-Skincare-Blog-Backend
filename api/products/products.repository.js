import Product from './products.model.js';

export const create = async (productData) => {
  return await Product.create(productData);
};

export const findByCategory = async (category) => {
  return await Product.findAll({ where: { category } });
};

export const findAll = async (filter = {}) => {
  return await Product.findAll({ where: filter });
};

export const findById = async (id) => {
  return await Product.findByPk(id);
};

export const update = async (id, updateData) => {
  const [updated] = await Product.update(updateData, { where: { id } });
  if (updated) {
    return await Product.findByPk(id);
  }
  return null; 
};

// Excluir um produto por ID
export const deleteById = async (id) => {
  const deleted = await Product.destroy({ where: { id } });
  return deleted; 
};
