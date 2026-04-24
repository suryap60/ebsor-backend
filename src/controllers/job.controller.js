import * as jobService from "../services/job.service.js";
import { success, created, error } from "../utils/response.js";
import { slugify } from "../utils/slugify.js";

// LIST JOBS
export const getJobs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const isAdmin = req.user?.role === "admin";

    const result = await jobService.getAllJobs({
      page: Number(page),
      limit: Number(limit),
      search,
      isAdmin,
    });

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

    const currentPage = Number(page);
    const totalPages = result.pagination.total_pages;

    // build next & previous
    const next =
      currentPage < totalPages
        ? `${baseUrl}?page=${currentPage + 1}&limit=${limit}&search=${search}`
        : null;

    const previous =
      currentPage > 1
        ? `${baseUrl}?page=${currentPage - 1}&limit=${limit}&search=${search}`
        : null;

    const pagination = {
      ...result.pagination,
      next,
      previous,
    };

    return success(res, result.jobs, "Jobs fetched", pagination);
  } catch (err) {
    next(err);
  }
};

// SINGLE JOB
export const getJobBySlug = async (req, res) => {
  const job = await jobService.getJobBySlug(req.params.slug);

  if (!job) return error(res, "Job not found", 404);

  return success(res, job, "Job fetched");
};

// CREATE JOB
export const createJob = async (req, res) => {
  const slug = slugify(req.body.title);

  const job = await jobService.createJob({
    ...req.body,
    slug,
  });

  return created(res, job, "Job created");
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const job = await jobService.updateJob(req.params.id, req.body);

  if (!job) return error(res, "Job not found", 404);

  return success(res, job, "Job updated");
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const job = await jobService.deleteJob(req.params.id);

  if (!job) return error(res, "Job not found", 404);

  return success(res, {}, "Job deleted successfully");
};

// ACTIVATE / DEACTIVATE
export const toggleJobStatus = async (req, res) => {
  const job = await jobService.toggleJobStatus(req.params.id);

  if (!job) return error(res, "Job not found", 404);

  return success(
    res,
    job,
    `Job ${job.isActive ? "activated" : "deactivated"}`
  );
}; 