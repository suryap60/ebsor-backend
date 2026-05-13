import FaqCategory from "../models/faqCategory.model.js";

// GET ALL FAQ CATEGORIES
export const getAllFaqCategories = async ({
  page,
  limit,
  search,
}) => {
  const query = {
    ...(search && {
      name: { $regex: search, $options: "i" },
    }),
  };

  const total = await FaqCategory.countDocuments(query);

  const categories = await FaqCategory.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalPages = Math.ceil(total / limit);

  return {
    categories,
    pagination: {
      total,
      page,
      page_size: limit,
      total_pages: totalPages,
    },
  };
};

// CREATE
export const createFaqCategory = async (data) => {
  return await FaqCategory.create(data);
};

// UPDATE
export const updateFaqCategory = async (id, data) => {
  return await FaqCategory.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
};

// DELETE
export const deleteFaqCategory = async (id) => {
  return await FaqCategory.findByIdAndDelete(id);
};