import React from 'react'
import { Link, Form, redirect, useNavigation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({request})=>{
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/login',data)
    toast.success("LoggedIn Successfully")
    return redirect("/dashboard")
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

export default function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const navigate = useNavigate()

  const loginDemo = async ()=>{
    const data = {
      email: "test@test.com",
      password: "secret123"
    }
    try {
      await customFetch.post("/auth/login", data);
      toast.success("Test The Application");
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  }

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow
          name="email"
          type="email"
          labelText="Email"
        />
        <FormRow
          name="password"
          type="password"
          labelText="Password"
        />

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
        <button type="button" className="btn btn-block" onClick={loginDemo}>
          Explore the app
        </button>
        <p>
          Not a Member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}
