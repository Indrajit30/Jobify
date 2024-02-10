import { Router } from "express";
import { validateJob, validateId } from "../middleware/validationMiddleware.js";
import { checkTestUser } from "../middleware/authMiddleware.js";
const router = Router();

import {
  getAllJobs,
  createJob,
  getJob,
  editJob,
  deleteJob,
  showStats
} from "../controllers/jobControllers.js";

router.route("/").get(getAllJobs).post(checkTestUser,validateJob, createJob);

router.route("/stats").get(showStats)

router
  .route("/:id")
  .get(validateId, getJob)
  .patch( checkTestUser,validateId, validateJob, editJob)
  .delete( checkTestUser,validateId, deleteJob);

export default router;
