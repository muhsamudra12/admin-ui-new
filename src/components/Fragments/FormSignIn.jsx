import React from "react";
import LabeledInput from "../Elements/LabeledInput";
import CheckBox from "../Elements/CheckBox";
import Button from "../Elements/Button";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
});

function FormSignIn({ onSubmit }) {
  return (
    <div className="mt-16">
      <Formik
        initialValues={{ email: "", password: "", status: false }}
        validationSchema={SignInSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await onSubmit(values.email, values.password);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
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
                <div className="text-red-500 text-xs mt-1">{errors.email}</div>
              )}
            </div>
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
            <div className="mb-3">
              <Field name="status" type="checkbox">
                {({ field }) => (
                  <CheckBox {...field} label="Keep me signed in" id="status" />
                )}
              </Field>
            </div>
            <Button
              variant={`w-full text-white py-3 ${
                isSubmitting ? "bg-gray-400" : "bg-primary"
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading.." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="flex items-center justify-center my-6">
        <div className="border-t border-gray-300 flex-grow"></div>
        <span className="px-3 text-gray-400 text-sm">or</span>
        <div className="border-t border-gray-300 flex-grow"></div>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-md hover:bg-gray-50 transition-all"
      >
        <svg width="20" height="20" viewBox="0 0 48 48">
          <path
            d="M46.1,24.5c0-1.7-0.1-3.4-0.4-5H24v9.4h12.4c-0.5,2.9-2.2,5.4-4.6,7l0,6.2h7.5C43.7,38.2,46.3,32.1,46.3,24.5z"
            fill="#4285F4"
          />
          <path
            d="M23.7,47.5c6.3,0,11.6-2.1,15.5-5.7l-7.5-6.2c-2.1,1.4-4.8,2.3-7.8,2.3c-6,0-11-4-12.8-9.5l-7.9,6C7,42.2,14.7,47.5,23.7,47.5z"
            fill="#34A853"
          />
          <path
            d="M10.9,28.4c-0.5-1.4-0.7-2.9-0.7-4.4s0.2-3,0.7-4.4l-7.9-6C1.4,16.7,0.5,19.8,0.5,23s0.9,6.3,2.5,9.4L10.9,28.4z"
            fill="#FBBC05"
          />
          <path
            d="M23.7,9.2c3.4,0,6.4,1.2,8.8,3.4l6.6-6.6C34.9,2.2,29.7,0,23.7,0C14.7,0,7,5.3,3.1,12.8l7.9,6C12.7,13.3,17.7,9.2,23.7,9.2z"
            fill="#EA4335"
          />
        </svg>
        <span className="text-gray-700 font-semibold">Sign in with Google</span>
      </button>

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
