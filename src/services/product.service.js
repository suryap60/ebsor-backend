import Product from "../models/product.model.js";

export const getAllProducts = async ({ page, limit, search }) => {
  const query = search
    ? { name: { $regex: search, $options: "i" } }
    : {};

  const total = await Product.countDocuments(query);

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalPages = Math.ceil(total / limit);

  return {
    products,
    pagination: {
      total,
      page,
      page_size: limit,
      total_pages: totalPages,
      has_next: page < totalPages,
      has_previous: page > 1,
    },
  };
};

export const getProductBySlug = async (slug) => {
  return await Product.findOne({ slug });
};

export const createProduct = async (data) => {
  return await Product.create(data);
};


export const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
};


export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};