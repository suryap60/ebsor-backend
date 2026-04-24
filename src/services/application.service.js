import Application from "../models/application.model.js";

export const createApplication = async (data) => {
  return await Application.create(data);
};

export const getApplications = async ({ page, limit, status, search }) => {
  const query = {};

  // filter by status
  if (status) {
    query.status = status;
  }

  // search by name/email
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const total = await Application.countDocuments(query);

  const applications = await Application.find(query)
    .populate("job")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalPages = Math.ceil(total / limit);

  return {
    applications,
    pagination: {
      total,
      page,
      page_size: limit,
      total_pages: totalPages,
    },
  };
};

export const getApplicationById = async (id) => {
  return await Application.findById(id).populate("job");
};

export const updateStatus = async (id, status) => {
  return await Application.findByIdAndUpdate(
    id,
    { status },
    { returnDocument: "after" }
  );
};   