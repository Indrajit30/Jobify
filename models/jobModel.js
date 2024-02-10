import mongoose from "mongoose";
import { job_Status , job_type} from "../utils/constants.js";

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
  },
  position: {
    type: String,
  },
  jobStatus: {
    type: String,
    enum: {
      values: Object.values(job_Status),
      msg: "Please provide a valid value",
    },
    default: job_Status.PENDING,
  },
  jobType: {
    type: String,
    enum: {
      values: Object.values(job_type),
      msg: "Please provide a valid value",
    },
    default: job_type.FULL_TIME,
  },
  jobLocation:{
    type:String,
    default:'my city'
  },
  createdBy:{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }

},{timestamps:true});

export default mongoose.model("Job",jobSchema)