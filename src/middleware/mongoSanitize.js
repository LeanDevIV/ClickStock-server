import sanitize from "mongo-sanitize";

export const mongoSanitize = () => (req, res, next) => {
  if (req.body) {
    req.body = sanitize(req.body);
  }
  if (req.params) {
    req.params = sanitize(req.params);
  }
  if (req.query) {
    try {
      req.query = sanitize(req.query);
    } catch (error) {
      if (req.query && typeof req.query === "object") {
        for (const key in req.query) {
          if (key.startsWith("$") || key.includes(".")) {
            delete req.query[key];
          }
        }
      }
    }
  }
  next();
};
