import { getIO } from "./socket.js";

// PRODUCTS
export const emitProductCreated = (product) => {
  getIO().emit("product:created", product);
};

export const emitProductUpdated = (product) => {
  getIO().emit("product:updated", product);
};

export const emitProductDeleted = (productId) => {
  getIO().emit("product:deleted", productId);
};

// BLOGS
export const emitBlogCreated = (blog) => {
  getIO().emit("blog:created", blog);
};

export const emitBlogUpdated = (blog) => {
  getIO().emit("blog:updated", blog);
};

export const emitBlogDeleted = (blogId) => {
  getIO().emit("blog:deleted", blogId);
};

// JOBS
export const emitJobCreated = (job) => {
  getIO().emit("job:created", job);
};

export const emitJobUpdated = (job) => {
  getIO().emit("job:updated", job);
};

export const emitJobDeleted = (jobId) => {
  getIO().emit("job:deleted", jobId);
};

// TESTIMONIALS
export const emitTestimonialCreated = (testimonial) => {
  getIO().emit("testimonial:created", testimonial);
};

export const emitTestimonialUpdated = (testimonial) => {
  getIO().emit("testimonial:updated", testimonial);
};

export const emitTestimonialDeleted = (testimonialId) => {
  getIO().emit("testimonial:deleted", testimonialId);
};

// BRANDS
export const emitBrandCreated = (brand) => {
  getIO().emit("brand:created", brand);
};

export const emitBrandUpdated = (brand) => {
  getIO().emit("brand:updated", brand);
};

export const emitBrandDeleted = (brandId) => {
  getIO().emit("brand:deleted", brandId);
};

// SECTIONS
export const emitSectionCreated = (section) => {
  getIO().emit("section:created", section);
};

export const emitSectionUpdated = (section) => {
  getIO().emit("section:updated", section);
};

export const emitSectionDeleted = (sectionId) => {
  getIO().emit("section:deleted", sectionId);
};


// FAQCATEGORIES
export const emitFaqCategoryCreated = (faqCategory) => {
  getIO().emit("faqCategory:created", faqCategory);
};

export const emitFaqCategoryUpdated = (faqCategory) => {
  getIO().emit("faqCategory:updated", faqCategory);
};

export const emitFaqCategoryDeleted = (faqCategoryId) => {
  getIO().emit("faqCategory:deleted", faqCategoryId);
};

// CONTACT
export const emitContactCreated = (contact) => {
  getIO().to().emit("contact:created", contact);
};

export const emitContactUpdated = (contact) => {
  getIO().to().emit("contact:updated", contact);
};

export const emitContactDeleted = (contactId) => {
  getIO().to().emit("contact:deleted", contactId);
};

// APPLICATION
export const emitApplicationCreated = (application) => {
  getIO().to().emit("application:created", application);
};

export const emitApplicationUpdated = (application) => {
  getIO().to().emit("application:updated", application);
};

// PROFILE
export const emitProfileUpdated = (profile) => {
  getIO().to().emit("profile:updated", profile);
};