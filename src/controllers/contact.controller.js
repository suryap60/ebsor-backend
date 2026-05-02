import * as contactService from "../services/contact.service.js";
import { success, created, error } from "../utils/response.js";

// PUBLIC: Submit Contact Form
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return error(res, "Name, email, and message are required");
    }

    const contact = await contactService.createContact(req.body);

    return created(res, contact, "Message submitted successfully");
  } catch (err) {
    return error(res, err.message);
  }
};

// ADMIN: Get All Messages
export const getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    const result = await contactService.getAllContacts({
      page: Number(page),
      limit: Number(limit),
      status,
      search,
    });

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

    const currentPage = Number(page);
    const totalPages = result.pagination.total_pages;

    // next URL
    const next =
      currentPage < totalPages
        ? `${baseUrl}?page=${currentPage + 1}&limit=${limit}&status=${status}&search=${search}`
        : null;

    // previous URL
    const previous =
      currentPage > 1
        ? `${baseUrl}?page=${currentPage - 1}&limit=${limit}&status=${status}&search=${search}`
        : null;

    const pagination = {
      ...result.pagination,
      next,
      previous,
    };

    return success(
      res,
      result.contacts,
      "Messages fetched",
      pagination
    );
  } catch (err) {
    next(err);
  }
};


// ADMIN: Get single contact
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await contactService.getContactById(id);

    if (!contact) {
      return error(res, "Message not found", 404);
    }

    return success(res, contact, "Message fetched successfully");
  } catch (err) {
    return error(res, err.message);
  }
};

// ADMIN: Mark as Resolved
export const updateContactStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "resolved"].includes(status)) {
    return error(res, "Invalid status");
  }

  const updated = await contactService.updateStatus(id, status);

  if (!updated) return error(res, "Message not found", 404);

  return success(res, updated, "Status updated");
};

// ADMIN: Delete Message
export const deleteContact = async (req, res) => {
  const deleted = await contactService.deleteContact(req.params.id);

  if (!deleted) return error(res, "Message not found", 404);

  return success(res, {}, "Message deleted");
};