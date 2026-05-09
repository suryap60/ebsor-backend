// services/testimonial.service.js

import Testimonial from "../models/testimonial.model.js";

export const getAllTestimonials = async ({ page, limit, search }) => {
  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { designation: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const total = await Testimonial.countDocuments(query);

  const testimonials = await Testimonial.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalPages = Math.ceil(total / limit);

  return {
    testimonials,
    pagination: {
      total,
      page,
      page_size: limit,
      total_pages: totalPages,
    },
  };
};

export const getTestimonialById = async (id) => {
  return await Testimonial.findById(id);
};

export const createTestimonial = async (data) => {
  return await Testimonial.create(data);
};

export const updateTestimonial = async (id, data) => {
  return await Testimonial.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
};

export const deleteTestimonial = async (id) => {
  return await Testimonial.findByIdAndDelete(id);
};