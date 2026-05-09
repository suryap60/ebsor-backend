import Blog from "../models/blog.model.js";

export const getAllBlogs = async ({ page, limit, search, status }) => {
  let query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (status) {
    query.status = status; 
  }

  const total = await Blog.countDocuments(query);

  const blogs = await Blog.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalPages = Math.ceil(total / limit);

  return {
    blogs,
    pagination: {
      total,
      page,
      page_size: limit,
      total_pages: totalPages,
    },
  };
};

export const getBlogBySlug = async (slug) => {
  return await Blog.findOne({ slug });
};

export const createBlog = async (data) => {
  return await Blog.create(data);
};

export const updateBlog = async (id, data) => {
  return await Blog.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
};

export const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};