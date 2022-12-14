import React from "react";
import { useMutation, gql } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import TwitterLogo from "../styles/assets/twitter-logo.png";
import "../styles/login.css"

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

interface LoginValues {
  email: string;
  password: string;
}

function Login() {
  const history = useNavigate();
  const [login, { data }] = useMutation(LOGIN_MUTATION);
  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Password is required"),
  });

  return (
    <div className="maincontainer">
    <div className="container1">           
    <img src="https://i.pinimg.com/originals/0a/bb/e4/0abbe4df553289cad941a290bef03fd1.jpg" alt="Logo" style={{width: "400px"}} className="logo" />
          
    <h5 className="h5">Welcome to Twitter</h5></div>
    <div className="container">
    
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await login({
            variables: values,
          });
          localStorage.setItem("token", response.data.login.token);
          setSubmitting(false);
          history("/");
        }}
      >
        <Form>
          <img src={TwitterLogo} alt="Logo" style={{width: "80px"}}   className="logo1" /> 
          <h5 className="log">Log in to Twitter</h5>
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component={"div"} className="error"/>
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component={"div"} className="error" />
          <button type="submit" className="login-button"><span>Login</span></button> 
         
          <div className="register">
          <h3 style={{color: "#fff", fontSize: "12px", marginTop: "10px", marginBottom:"20px"}}>Don't have an account?</h3>
          <Link className="h51" to="/signup">Sign up</Link>
          </div>
        </Form>
      </Formik>
     
    </div> 
    </div>
    
  );
}

export default Login;