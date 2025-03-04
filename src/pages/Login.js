import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "../component/schema/schema";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Formik = () => {
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      // Get stored user credentials from localStorage
      const storedUser = JSON.parse(localStorage.getItem("formValues"));
    
      // Check if email and password match the stored values
      if (storedUser && storedUser.email === values.email && storedUser.password === values.password) {
        console.log("Login Successful", values);
    
        // Store login status in cookies
        Cookies.set("isLoggedIn", "true", { expires: 7 });
        Cookies.set("userEmail", values.email, { expires: 7 });
    
        // Navigate to the homepage/dashboard
        navigate("/");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    },
  });

  return (
    <div className="formcontent">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="form-inputs">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="forminput"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && <p>{errors.email}</p>}
        </div>

        <div className="form-inputs">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="forminput"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && <p>{errors.password}</p>}
        </div>

        <button className="form-input-btn" type="submit">Login</button>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} style={{ cursor: "pointer", color: "blue" }}>
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Formik;
