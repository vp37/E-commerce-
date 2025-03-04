import { useFormik } from "formik";
import React from "react";
import { basicSchemma } from "../component/schema/schema";
import { useNavigate } from "react-router-dom";
import '../css/Register.css'

const Register = () => {
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: basicSchemma,
    onSubmit: (values) => {
      // Store the username in localStorage
      localStorage.setItem("username", values.username);
      console.log("Form data submitted and stored in localStorage", values);

      // Store registration data in localStorage for other purposes (if needed)
      localStorage.setItem("formValues", JSON.stringify(values));

      // Redirect to the login page
      navigate("/login");
    },
  });

  return (
    <div className="formcontent">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create your Account</h1>

        <div className="form-inputs">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your username"
            value={values.username}
            name="username"
            className="forminput"
            id="username"
          />
          {errors.username && touched.username && <p>{errors.username}</p>}
        </div>

        <div className="form-inputs">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email"
            value={values.email}
            name="email"
            className="forminput"
            id="email"
          />
          {errors.email && touched.email && <p>{errors.email}</p>}
        </div>

        <div className="form-inputs">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your password"
            value={values.password}
            name="password"
            className="forminput"
            id="password"
          />
          {errors.password && touched.password && <p>{errors.password}</p>}
        </div>

        <div className="form-inputs">
          <label htmlFor="password2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your confirm password"
            value={values.password2}
            name="password2"
            className="forminput"
            id="password2"
          />
          {errors.password2 && touched.password2 && <p>{errors.password2}</p>}
        </div>

        <button className="form-input-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
