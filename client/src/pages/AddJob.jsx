import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";
import { useOutletContext } from "react-router-dom";
import { job_Status, job_type } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({request})=>{
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post("/jobs",data)
    toast.success('Job Added Successfully')
    return redirect('all-jobs')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error
  }
}

export default function AddJob() {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add job</h4>
        <div className="form-center">
          <FormRow type="text" labelText="position" name="position" />
          <FormRow type="text" labelText="company" name="company" />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={user.location}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job_Status.PENDING}
            list={Object.values(job_Status)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job_type.FULL_TIME}
            list={Object.values(job_type)}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
}
