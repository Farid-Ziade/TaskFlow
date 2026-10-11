import * as yup from "yup";
import { priorities, statuses } from "./taskUtils";

const taskSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Please enter a task title.")
    .min(3, "The title must contain at least 3 characters.")
    .max(100, "Keep the title under 101 characters."),
  description: yup
    .string()
    .trim()
    .max(500, "Keep the description under 501 characters."),
  priority: yup.string().oneOf(priorities).required("Choose a priority."),
  status: yup.string().oneOf(statuses).required("Choose a status."),
});

export default taskSchema;
