import * as applicationService from "../services/application.service.js";
import { success, created, error } from "../utils/response.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import { emitApplicationCreated, emitApplicationUpdated } from "../socket/socketEvents.js";

/**
 * @desc Apply for job (USER)
 * @route POST /api/applications
 */
export const applyJob = async (req, res) => {
  try {
    console.log("BODY =>", req.body);
    console.log("FILE =>", req.file);

    const { job, firstName, email, phone } = req.body;

    if (!job || !firstName || !email || !phone) {
      return error(res, "All fields are required", 400);
    }

    if (!req.file) {
      return error(res, "Resume file is required", 400);
    }

    // Upload to Cloudinary
    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "job-applications",
            resource_type: "raw",
          },

          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await uploadFromBuffer();

    const application =
      await applicationService.createApplication({
        ...req.body,
        resume: result.secure_url,
      });

    emitApplicationCreated(application);

    return created(
      res,
      application,
      "Application submitted successfully"
    );

  } catch (err) {
    console.log("FULL ERROR =>", err);

    return res.status(500).json({
      success: false,
      message: err?.message || "Server Error",
    });
  }
};

/**
 * @desc Get all applications (ADMIN)
 */
export const getApplications = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    const result = await applicationService.getApplications({
      page: Number(page),
      limit: Number(limit),
      status,
      search,
    });

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

    const currentPage = Number(page);
    const totalPages = result.pagination.total_pages;

    // next
    const next =
      currentPage < totalPages
        ? `${baseUrl}?page=${currentPage + 1}&limit=${limit}&status=${status}&search=${search}`
        : null;

    // previous
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
      result.applications,
      "Applications fetched successfully",
      pagination
    );
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Get single application (ADMIN)
 */
export const getApplicationById = async (req, res, next) => {
  try {
    const app = await applicationService.getApplicationById(req.params.id);

    if (!app) return error(res, "Application not found", 404);

    return success(res, app, "Application details fetched");
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Update status (ADMIN)
 */
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const updated = await applicationService.updateStatus(
      req.params.id,
      status
    );

    emitApplicationUpdated(updated);

    if (!updated) return error(res, "Application not found", 404);

    return success(res, updated, "Status updated");
  } catch (err) {
    next(err);
  }
};