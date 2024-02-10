import React from 'react'
import styled from "styled-components"
import Wrapper from "../assets/wrappers/LandingPage"
import main from "../assets/images/main.svg"
import Logo from '../components/Logo'
import {Link} from "react-router-dom"

export default function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div>
          <h1>job <span>tracking</span> app</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus nam repudiandae excepturi, architecto mollitia fugiat, ipsam sunt necessitatibus, officiis quaerat id nulla velit animi. Officia inventore debitis tenetur minus vitae omnis dicta ea molestiae voluptatem. Adipisci officiis tempore magnam, incidunt pariatur omnis, numquam eos provident rerum quae nemo quos ab!</p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn register-link">
            Login
          </Link>
        </div>
        <img src={main} alt="jobHunt" className='img main-img'/>
      </div>

    </Wrapper>
  )
}