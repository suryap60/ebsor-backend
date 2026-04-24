import * as applicationService from "../services/application.service.js";
import { success, created, error } from "../utils/response.js";

/**
 * @desc Apply for job (USER)
 * @route POST /api/applications
 */
export const applyJob = async (req, res, next) => {
  try {
    const { job, name, email, phone } = req.body;

    if (!job || !name || !email || !phone) {
      return error(res, "All fields are required", 400);
    }

    const application = await applicationService.createApplication(req.body);

    return created(res, application, "Application submitted successfully");
  } catch (err) {
    next(err);
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

    return success(
      res,
      result.applications,
      "Applications fetched successfully",
      result.pagination
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

    if (!updated) return error(res, "Application not found", 404);

    return success(res, updated, "Status updated");
  } catch (err) {
    next(err);
  }
};