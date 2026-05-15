import { getIO } from "./socket.js";

// PRODUCTS
export const emitProductCreated = (product) => {
  getIO().to("website-room").emit("product:created", product);

  getIO().to("admin-room").emit("admin:product:created", product);
};

export const emitProductUpdated = (product) => {
  getIO().to("website-room").emit("product:updated", product);

  getIO().to("admin-room").emit("admin:product:updated", product);
};

export const emitProductDeleted = (productId) => {
  getIO().to("website-room").emit("product:deleted", productId);

  getIO().to("admin-room").emit("admin:product:deleted", productId);
};

// BLOGS
export const emitBlogCreated = (blog) => {
  getIO().to("website-room").emit("blog:created", blog);

  getIO().to("admin-room").emit("admin:blog:created", blog);
};

export const emitBlogUpdated = (blog) => {
  getIO().to("website-room").emit("blog:updated", blog);

  getIO().to("admin-room").emit("admin:blog:updated", blog);
};

export const emitBlogDeleted = (blogId) => {
  getIO().to("website-room").emit("blog:deleted", blogId);

  getIO().to("admin-room").emit("admin:blog:deleted", blogId);
};

// JOBS
export const emitJobCreated = (job) => {
  getIO().to("website-room").emit("job:created", job);

  getIO().to("admin-room").emit("admin:job:created", job);
};

export const emitJobUpdated = (job) => {
  getIO().to("website-room").emit("job:updated", job);

  getIO().to("admin-room").emit("admin:job:updated", job);
};

export const emitJobDeleted = (jobId) => {
  getIO().to("website-room").emit("job:deleted", jobId);

  getIO().to("admin-room").emit("admin:job:deleted", jobId);
};

// TESTIMONIALS
export const emitTestimonialCreated = (testimonial) => {
  getIO().to("website-room").emit("testimonial:created", testimonial);
  getIO().to("admin-room").emit("admin:testimonial:created", testimonial);
};

export const emitTestimonialUpdated = (testimonial) => {
  getIO().to("website-room").emit("testimonial:updated", testimonial);
  getIO().to("admin-room").emit("admin:testimonial:updated", testimonial);
};

export const emitTestimonialDeleted = (testimonialId) => {
  getIO().to("website-room").emit("testimonial:deleted", testimonialId);
  getIO().to("admin-room").emit("admin:testimonial:deleted", testimonialId);
};

// BRANDS
export const emitBrandCreated = (brand) => {
  getIO().to("website-room").emit("brand:created", brand);
  getIO().to("admin-room").emit("admin:brand:created", brand);
};

export const emitBrandUpdated = (brand) => {
  getIO().to("website-room").emit("brand:updated", brand);
  getIO().to("admin-room").emit("admin:brand:updated", brand);
};

export const emitBrandDeleted = (brandId) => {
  getIO().to("website-room").emit("brand:deleted", brandId);
  getIO().to("admin-room").emit("admin:brand:deleted", brandId);
};

// SECTIONS
export const emitSectionCreated = (section) => {
  getIO().to("website-room").emit("section:created", section);
  getIO().to("admin-room").emit("admin:section:created", section);
};

export const emitSectionUpdated = (section) => {
  getIO().to("website-room").emit("section:updated", section);
  getIO().to("admin-room").emit("admin:section:updated", section);
};

export const emitSectionDeleted = (sectionId) => {
  getIO().to("website-room").emit("section:deleted", sectionId);
  getIO().to("admin-room").emit("admin:section:deleted", sectionId);
};


// FAQCATEGORIES
export const emitFaqCategoryCreated = (faqCategory) => {
  getIO().to("website-room").emit("faqCategory:created", faqCategory);
  getIO().to("admin-room").emit("admin:faqCategory:created", faqCategory);
};

export const emitFaqCategoryUpdated = (faqCategory) => {
  getIO().to("website-room").emit("faqCategory:updated", faqCategory);
  getIO().to("admin-room").emit("admin:faqCategory:updated", faqCategory);
};

export const emitFaqCategoryDeleted = (faqCategoryId) => {
  getIO().to("website-room").emit("faqCategory:deleted", faqCategoryId);
  getIO().to("admin-room").emit("admin:faqCategory:deleted", faqCategoryId);
};

// CONTACT
export const emitContactCreated = (contact) => {
  getIO().to("admin-room").emit("contact:created", contact);
};

export const emitContactUpdated = (contact) => {
  getIO().to("admin-room").emit("contact:updated", contact);
};

export const emitContactDeleted = (contactId) => {
  getIO().to("admin-room").emit("contact:deleted", contactId);
};

// APPLICATION
export const emitApplicationCreated = (application) => {
  getIO().to("admin-room").emit("application:created", application);
};

export const emitApplicationUpdated = (application) => {
  getIO().to("admin-room").emit("application:updated", application);
};

// PROFILE
export const emitProfileUpdated = (profile) => {
  getIO().to("admin-room").emit("profile:updated", profile);
};