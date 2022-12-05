import React from "react";
import { useMutation, gql } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import TwitterLogo from "../styles/assets/twitter-logo.png";

const SIGNUP_MUTATION = gql`
  mutation signup($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

interface SignupValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Signup() {
  const history = useNavigate();
  const [signup, { data }] = useMutation(SIGNUP_MUTATION);
  const initialValues: SignupValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  return (
    <div>
      <img src={TwitterLogo} alt="Logo" style={{width: "50px"}} className="logo" />
      <h3>Sign Up to Twitter</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await signup({
            variables: values,
          });
          localStorage.setItem("token", response.data.signup.token);
          setSubmitting(false);
          history("/");
        }}
      >
        <Form>
          <Field name="name" type="text" placeholder="Name" />
          <ErrorMessage name="name" component="div" />
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component={"div"} />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component={"div"} />
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <ErrorMessage name="confirmPassword" component={"div"} />
          <button type="submit" className="login-button"><span>Sign Up</span></button>
        </Form>
      </Formik>
      <div className="register">
        <h4>Already have an account?</h4>
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default Signup;
