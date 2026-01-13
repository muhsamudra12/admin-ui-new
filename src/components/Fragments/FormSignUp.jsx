import React, { useState } from "react";
import LabeledInput from "../Elements/LabeledInput";
import CheckBox from "../Elements/CheckBox";
import Button from "../Elements/Button";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AppSnackbar from "../Elements/AppSnackbar";

// Skema Validasi
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Nama wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
});

function FormSignUp() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <p className="mt-3 text-xl font-semibold text-gray-800 flex justify-center">
        Create an account
      </p>

      <div className="mt-16">
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post(
                "https://jwt-auth-eight-neon.vercel.app/register",
                values
              );
              setSnackbar({
                open: true,
                message: response.data.message || "Registration Berhasil!",
                severity: "success",
              });
            } catch (err) {
              setSnackbar({
                open: true,
                message: err.response?.data?.msg || "Registration Gagal",
                severity: "error",
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              {/* Field Name */}
              <div className="mb-6">
                <Field name="name">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      label="Name"
                      id="name"
                      type="text"
                      placeholder="Your Name"
                    />
                  )}
                </Field>
                {errors.name && touched.name && (
                  <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                )}
              </div>

              {/* Field Email */}
              <div className="mb-6">
                <Field name="email">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      label="Email Address"
                      id="email"
                      type="email"
                      placeholder="hello@example.com"
                    />
                  )}
                </Field>
                {errors.email && touched.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Field Password */}
              <div className="mb-6">
                <Field name="password">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      label="Password"
                      id="password"
                      type="password"
                      placeholder="••••••••••"
                    />
                  )}
                </Field>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Komponen yang sebelumnya hilang (Term of Service & Checkbox) */}
              <p className="text-xs text-gray-500 mb-5 px-1">
                By continuing, you agree to our{" "}
                <span className="text-teal-600 font-semibold cursor-pointer">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-teal-600 font-semibold cursor-pointer">
                  Privacy Policy
                </span>
                .
              </p>

              <div className="mb-3">
                <CheckBox
                  label="I agree to the terms and conditions"
                  id="agree"
                  name="agree"
                />
              </div>

              {/* Tombol dengan status Loading.. */}
              <Button
                variant={`w-full text-white py-3 ${
                  isSubmitting ? "bg-gray-400" : "bg-primary"
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading.." : "Create Account"}
              </Button>
            </Form>
          )}
        </Formik>

        {/* Divider & Google Logo */}
        <div className="flex items-center justify-center my-6">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition-all shadow-sm"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <g fill="none" fillRule="evenodd">
              <path
                d="M46.145,24.545 C46.145,22.822 45.993,21.164 45.709,19.571 L24,19.571 L24,29.002 L36.415,29.002 C35.875,31.904 34.238,34.364 31.767,36.027 L31.767,42.218 L39.305,42.218 C43.718,38.158 46.255,32.127 46.255,24.545"
                fill="#4285F4"
              ></path>
              <path
                d="M23.714,37.867 C17.549,37.867 12.355,33.888 10.532,28.356 L2.623,34.395 C6.445,42.156 14.427,47.467 23.714,47.467 C29.446,47.467 34.918,45.431 39.025,41.618 L31.518,35.814 C29.4,37.149 26.732,37.867 23.714,37.867"
                fill="#34A853"
              ></path>
              <path
                d="M10.462,27.502 C10.004,26.138 9.742,24.682 9.742,23.164 C9.742,21.645 10.004,20.189 10.462,18.825 L2.7,12.809 C1.156,15.884 0.273,19.342 0.273,23.005 C0.273,26.669 1.156,30.127 2.7,33.202 L10.462,27.502 Z"
                fill="#FBBC05"
              ></path>
              <path
                d="M24,9.153 C27.382,9.153 30.415,10.315 32.804,12.595 L39.731,5.667 C35.531,1.756 30.316,-0.447 24,-0.447 C15.185,-0.447 7.647,4.604 3.796,11.836 L11.558,17.853 C13.375,12.409 18.458,8.356 24,8.356"
                fill="#EA4335"
              ></path>
            </g>
          </svg>
          <span className="text-gray-700 font-semibold">
            Sign up with Google
          </span>
        </button>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
}

export default FormSignUp;
