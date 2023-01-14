import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
  mobile: "",
  password: "",
};

const validationSchema = Yup.object({
  mobile: Yup.number()
    .min(1000000000, "Invalid mobile number")
    .max(9999999999, "Invalid mobile number")
    .required("Required"),

  password: Yup.string()
    .test(
      "password",
      "Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      (value) => {
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return passwordRegex.test(value);
      },
    )
    .required("Required"),
});
function Login() {
  const [msg, setMsg] = useState("");

  const postUrl = "http://localhost:8080/users/login";

  const login = (values) => {
    console.log(values);
    axios
      .post(postUrl, values)
      .then((res) => {
        console.log(res);
        setMsg(res.data.message);
        localStorage.setItem("name", res.data.name);
      })
      .catch((err) => {
        console.log(err);
        setMsg(err.response.data.error);
      });
  };

  return (
    <div className="h-screen  max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Login
          <span className="text-blue-500 mx-2 ">Here</span>
        </h1>
      </div>

      <div className="mb-6">
        <p className="text-2sm">
          Welcome to our login page! We take the security of your personal
          information very seriously and have implemented the latest measures to
          protect your data. By logging in, you will have access to all of our
          features and services. Please enter your email and password to
          proceed. If you have any issues or concerns, please don't hesitate to
          reach out to our support team.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // console.log(values);
          login(values);
        }}
      >
        {({ handleSubmit }) => (
          <div className="bg-white shadow-md text-black rounded px-8 pt-6 pb-8 mb-4 w-full">
            <div className="mb-4">
              <p className="text-xl text-gray-900">{msg}</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="label text-blue-500">Mobile</div>
                  <Field
                    name="mobile"
                    type="number"
                    className="input-field"
                    placeholder="Enter your mobile number"
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="error-msg"
                  />
                </div>

                <div>
                  <div className="label text-blue-500">Password</div>
                  <Field
                    name="password"
                    type="password"
                    className="input-field"
                    placeholder="Enter your password"
                  />

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-msg"
                  />
                </div>
                <div>
                  <button
                    className="mt-6 w-full bg-blue-500 hover:bg-blue-400 text-white 
                  font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Login;
