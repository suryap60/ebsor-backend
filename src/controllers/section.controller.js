import * as sectionService from "../services/section.service.js";
import { emitSectionCreated, emitSectionDeleted, emitSectionUpdated } from "../socket/socketEvents.js";
import { success, error, created } from "../utils/response.js";
import { slugify } from "../utils/slugify.js";

export const getSections = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const result = await sectionService.getAllSections({
      page: Number(page),
      limit: Number(limit),
      search,
    });
    

    return success(
      res,
      result.sections,
      "Sections fetched successfully",
      result.pagination
    );
  } catch (err) {
    next(err);
  }
};

export const getSectionBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const section = await sectionService.getSectionBySlug(slug);

    // IMPORTANT: NOT 404 (optional content)
    return success(
      res,
      section ?? null,
      section ? "Section fetched successfully" : "No content available"
    );
  } catch (err) {
    next(err);
  }
};

export const getSectionById = async (req, res, next) => {
  try {
    const section = await sectionService.getSectionById(req.params.id);

    if (!section) {
      return error(res, "Section not found", 404);
    }

    return success(res, section, "Section fetched");
  } catch (err) {
    next(err);
  }
};


export const createSection = async (req, res, next) => {
  try {
    const { title, type } = req.body;

    if (!title) {
      return error(res, "Title is required", 400);
    }

    const slug = slugify(title);

    // prevent duplicate slug
    const existing = await sectionService.getSectionBySlug(slug);
    if (existing) {
      return error(res, "Section already exists", 400);
    }
    

    const section = await sectionService.createSection({
      ...req.body,
      slug,
    });

    emitSectionCreated(section);

    const cleaned = {
        ...section.toObject(),
    };

    if (section.type !== "faq") {
        delete cleaned.faqs;
    }

    if (section.type === "faq") {
        delete cleaned.content;
    }
    

    return created(res, cleaned, "Section created successfully");
  } catch (err) {
    next(err);
  }
};

export const updateSection = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updated = await sectionService.updateSection(id, req.body);

    emitSectionUpdated(updated);

    if (!updated) {
      return error(res, "Section not found", 404);
    }

    return success(res, updated, "Section updated successfully");
  } catch (err) {
    next(err);
  }
};


export const deleteSection = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await sectionService.deleteSection(id);

    emitSectionDeleted(id);

    if (!deleted) {
      return error(res, "Section not found", 404);
    }

    return success(res, {}, "Section deleted successfully");
  } catch (err) {
    next(err);
  }
};