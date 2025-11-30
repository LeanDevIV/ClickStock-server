import xss from "xss";

const clean = (data) => {
  if (!data) return data;
  if (typeof data === "string") {
    return xss(data);
  }
  if (Array.isArray(data)) {
    return data.map(clean);
  }
  if (typeof data === "object") {
    for (const key in data) {
      data[key] = clean(data[key]);
    }
  }
  return data;
};

export const xssSanitize = () => (req, res, next) => {
  if (req.body) {
    req.body = clean(req.body);
  }
  if (req.params) {
    req.params = clean(req.params);
  }
  if (req.query) {
    try {
      req.query = clean(req.query);
    } catch (error) {
      if (req.query && typeof req.query === "object") {
        for (const key in req.query) {
          req.query[key] = clean(req.query[key]);
        }
      }
    }
  }
  next();
};
