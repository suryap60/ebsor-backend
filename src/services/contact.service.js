import Contact from "../models/contact.model.js";

// CREATE MESSAGE (Public)
export const createContact = async (data) => {
  return await Contact.create(data);
};

// GET ALL MESSAGES (Admin)
export const getAllContacts = async ({ page, limit, status }) => {
  const query = status ? { status } : {};

  const total = await Contact.countDocuments(query);

  const contacts = await Contact.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalPages = Math.ceil(total / limit);

  return {
    contacts,
    pagination: {
      total,
      page,
      page_size: limit,
      total_pages: totalPages,
    },
  };
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};

// UPDATE STATUS (Admin)
export const updateStatus = async (id, status) => {
  return await Contact.findByIdAndUpdate(
    id,
    { status },
    { returnDocument: "after" }
  );
};

// DELETE (optional)
export const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};