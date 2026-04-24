import Job from "../models/job.model.js";

// GET ALL JOBS (Admin / Public)
export const getAllJobs = async ({ page, limit, search, isAdmin }) => {
  const query = {
    ...(search && { title: { $regex: search, $options: "i" } }),
    ...(!isAdmin && { isActive: true }), // public sees only active jobs
  };

  const total = await Job.countDocuments(query);

  const jobs = await Job.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalPages = Math.ceil(total / limit);

  return {
    jobs,
    pagination: {
      total,
      page,
      page_size: limit,
      total_pages: totalPages,
      has_next: page < totalPages,
      has_previous: page > 1,
    },
  };
};

// GET SINGLE JOB
export const getJobBySlug = async (slug) => {
  return await Job.findOne({ slug, isActive: true });
};

// CREATE JOB
export const createJob = async (data) => {
  return await Job.create(data);
};

// UPDATE JOB
export const updateJob = async (id, data) => {
  return await Job.findByIdAndUpdate(id, data, { returnDocument: "after" });
};
 
// DELETE JOB
export const deleteJob = async (id) => {
  return await Job.findByIdAndDelete(id);
};

// TOGGLE ACTIVE STATUS
export const toggleJobStatus = async (id) => {
  const job = await Job.findById(id);
  if (!job) return null;

  job.isActive = !job.isActive;
  await job.save();

  return job;
};