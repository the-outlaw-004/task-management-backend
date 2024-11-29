const { check, validationResult } = require("express-validator");

// Task validation rules
const taskValidationRules = [
  check("name").notEmpty().withMessage("Task Name is required"),
  check("dueDate")
    .notEmpty()
    .withMessage("Due Date is required")
    .isISO8601()
    .withMessage("Due Date must be a valid date in the format YYYY-MM-DD"),
  check("priority")
    .notEmpty()
    .withMessage("Priority is required")
    // .isIn(["Low", "Medium", "High", "Very High"])
    // .withMessage("Priority must be one of Low, Medium, High, or Very High"),
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  taskValidationRules,
  handleValidationErrors,
};
