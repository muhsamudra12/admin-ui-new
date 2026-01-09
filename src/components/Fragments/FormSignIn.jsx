import React from "react";
import LabeledInput from "../Elements/LabeledInput";
import CheckBox from "../Elements/CheckBox";
import Button from "../Elements/Button";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Validasi Form
const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
});

function FormSignIn({ onSubmit }) {
  return (
    <div className="mt-16">
      <Formik
        initialValues={{
          email: "",
          password: "",
          status: false,
        }}
        validationSchema={SignInSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // Memanggil fungsi onSubmit dari props (dari signIn.jsx)
          await onSubmit(values.email, values.password);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            {/* EMAIL */}
            <div className="mb-6">
              <Field name="email">
                {({ field }) => (
                  <LabeledInput
                    {...field}
                    id="email"
                    type="email"
                    label="Email Address"
                    placeholder="hello@example.com"
                  />
                )}
              </Field>
              {errors.email && touched.email ? (
                <div className="text-red-500 text-xs mt-1">{errors.email}</div>
              ) : null}
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <Field name="password">
                {({ field }) => (
                  <LabeledInput
                    {...field}
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="••••••••••"
                  />
                )}
              </Field>
              {errors.password && touched.password ? (
                <div className="text-red-500 text-xs mt-1">
                  {errors.password}
                </div>
              ) : null}
            </div>

            {/* CHECKBOX */}
            <div className="mb-3">
              <Field name="status" type="checkbox">
                {({ field }) => (
                  <CheckBox {...field} label="Keep me signed in" id="status" />
                )}
              </Field>
            </div>

            {/* BUTTON LOGIN */}
            <Button
              variant={`w-full text-white py-3 ${
                isSubmitting ? "bg-gray-400" : "bg-primary"
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>

      {/* Divider */}
      <div className="flex items-center justify-center my-6">
        <div className="border-t border-gray-300 flex-grow"></div>
        <span className="px-3 text-gray-400 text-sm">or</span>
        <div className="border-t border-gray-300 flex-grow"></div>
      </div>

      {/* Tombol Google (Warna & Logo Persis FormSignUp) */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition-all shadow-sm"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 48 48"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="Shapes"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <path
              d="M46.1454545,24.5454545 C46.1454545,22.8218182 45.9927273,21.1636364 45.7090909,19.5709091 L24,19.5709091 L24,29.0018182 L36.4145455,29.0018182 C35.8745455,31.9036364 34.2381818,34.3636364 31.7672727,36.0272727 L31.7672727,42.2181818 L39.3054545,42.2181818 C43.7181818,38.1581818 46.2545455,32.1272727 46.2545455,24.5454545"
              fill="#4285F4"
            ></path>
            <path
              d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
              fill="#34A853"
            ></path>
            <path
              d="M10.4618182,27.5018182 C10.0036364,26.1381818 9.74181818,24.6818182 9.74181818,23.1636364 C9.74181818,21.6454545 10.0036364,20.1890909 10.4618182,18.8254545 L2.7,12.8090909 C1.15636364,15.8836364 0.272727273,19.3418182 0.272727273,23.0054545 C0.272727273,26.6690909 1.15636364,30.1272727 2.7,33.2018182 L10.4618182,27.5018182 Z"
              fill="#FBBC05"
            ></path>
            <path
              d="M24,9.15272727 C27.3818182,9.15272727 30.4145455,10.3145455 32.8036364,12.5945455 L39.7309091,5.66727273 C35.5309091,1.75636364 30.3163636,-0.447272727 24,-0.447272727 C15.1854545,-0.447272727 7.64727273,4.60363636 3.79636364,11.8363636 L11.5581818,17.8527273 C13.3745455,12.4090909 18.4581818,8.35636364 24,8.35636364"
              fill="#EA4335"
            ></path>
          </g>
        </svg>
        <span className="text-gray-700 font-semibold">Sign in with Google</span>
      </button>

      {/* Navigasi ke Register */}
      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary font-bold hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default FormSignIn;
