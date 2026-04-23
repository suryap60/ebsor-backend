export const success = (res, data, message = "Success", pagination = null) => {
  const response = {
    success: true,
    message,
    data,
  };

  if (pagination) {
    response.pagination = pagination;
  }

  res.status(200).json(response);
};

export const created = (res, data, message = "Created successfully") => {
  res.status(201).json({
    success: true,
    message,
    data,
  });
};

export const error = (res, message = "Something went wrong", code = 400) => {
  res.status(code).json({
    success: false,
    message,
  });
};