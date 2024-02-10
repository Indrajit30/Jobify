import React from 'react'
import {Link , useRouteError} from "react-router-dom"
import Wrapper from "../assets/wrappers/ErrorPage"
import img from "../assets/images/not-found.svg"

export default function Error() {

  const error = useRouteError()
  if(error.status === 404){
    return(
      <Wrapper>
        <div>
          <img src={img} alt="Not-Found" />
          <h3>Ohh! page not found</h3>
          <p>We can't Find your page you are looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </Wrapper>
    )
  }

  return (
    <div>
      <h1>Error Page</h1>
      <Link to="/">Back Home</Link>
    </div>
  );
}
