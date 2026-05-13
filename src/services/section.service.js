import Section from "../models/section.model.js";

export const getAllSections = async ({ page, limit, search }) => {
  const query = search
    ? { title: { $regex: search, $options: "i" } }
    : {};

  const total = await Section.countDocuments(query);

  const sections = await Section.find(query)
    .populate("faqs.categories")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    sections,
    pagination: {
      total,
      page,
      page_size: limit,
      total_pages: Math.ceil(total / limit),
    },
  };
};

export const getSectionBySlug = async (slug) => {
  return await Section.findOne({ slug })
  .populate("faqs.categories");
};

export const getSectionById = async (id) => {
  return await Section.findById(id)
  .populate("faqs.categories")
};

export const createSection = async (data) => {
  return await Section.create(data);
};

export const updateSection = async (id, data) => {
  return await Section.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
};

export const deleteSection = async (id) => {
  return await Section.findByIdAndDelete(id);
};