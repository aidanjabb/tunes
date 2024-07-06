import React from "react"
import {Container} from "react-bootstrap"

/*
URL that we send a GET request to in order to request user auth;
includes the query params client_id, response_type, redirect_uri, and scope
*/
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=e96f2fc9b0dd476eb0e370daee89691a&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";


export default function Login() {
  console.log("Login")
  // render a link styled as a login button
  return (
    <Container className="d-flex justify-content-center align-items-center" style = {{minHeight: "100vh"}}>
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
            Login with Spotify
        </a>
    </Container>
  )
};

