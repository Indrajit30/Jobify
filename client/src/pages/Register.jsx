import React from 'react'
import {Link, Form, redirect, useNavigation} from "react-router-dom"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import Logo from '../components/Logo'
import FormRow from '../components/FormRow'
import customFetch from "../utils/customFetch"
import { toast } from 'react-toastify'

export const action = async ({request})=>{
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post("/auth/register",data)
    toast.success('Registration Succesfull')
    return redirect('/login')
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.msg)
    return error
  }
};

export default function Register() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo/>
        <h4>Register</h4>
        <FormRow name="name" type="text" labelText="Name" />
        <FormRow name="lastName" type="text" labelText="Last Name" />
        <FormRow name="location" type="text" labelText="Location" />
        <FormRow name="email" type="email" labelText="Email" />
        <FormRow name="password" type="password" labelText="Password" />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting? "Submitting": "Submit"}
        </button>
        <p>
          Already a Member?
          <Link to="/login" className='member-btn'>Login</Link>
        </p>
      </Form>
    </Wrapper>
  )
}
