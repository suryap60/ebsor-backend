import Brand from "../models/brand.model.js";

export const getAllBrands = async ({ page, limit, search }) => {
  let query = {};

  if (search) {
    query.name = {
      $regex: search,
      $options: "i",
    };
  }

  const total = await Brand.countDocuments(query);

  const brands = await Brand.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    brands,
    pagination: {
      total,
      page,
      page_size: limit,
      total_pages: Math.ceil(total / limit),
    },
  };
};

export const getBrandById = async (id) => {
  return await Brand.findById(id);
};

export const getBrandBySlug = async (slug) => {
  return await Brand.findOne({ slug });
};

export const createBrand = async (data) => {
  return await Brand.create(data);
};

export const updateBrand = async (id, data) => {
  return await Brand.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
};

export const deleteBrand = async (id) => {
  return await Brand.findByIdAndDelete(id);
};