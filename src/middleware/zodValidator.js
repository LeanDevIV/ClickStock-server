import { z } from "zod";

export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.errors || error.issues;
      if (!issues) {
        console.error(
          "ZodError encountered but 'errors' and 'issues' are missing:",
          error
        );
        return res.status(400).json({ message: "Validation error occurred." });
      }
      return res.status(400).json({
        errors: issues.map((err) => ({
          message: err.message,
          path: err.path,
        })),
      });
    }
    console.error("Internal Server Error in zodValidator:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
