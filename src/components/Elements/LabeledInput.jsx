import React, { useState } from "react";

function LabeledInput(props) {
  const { label, id, type, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm mb-2">
        {label}
      </label>
      
      <div className="relative">
        <input
          id={id}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className="py-3 pl-4 pr-10 text-sm rounded-md w-full bg-special-mainBg border border-gray-03 text-gray-01 focus:border-black focus:outline-none"
          {...rest}
        />

        {/* ICON MATA */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              //IconBuka
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.01 9.964 7.183.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.01-9.964-7.183z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ) : (
              //IconTutup
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3l18 18M10.7 10.7A3 3 0 0113.3 13.3M9.88 9.88a3 3 0 104.24 4.24M6.24 6.24A9.973 9.973 0 003 12c1.387 4.173 5.324 7.183 9.964 7.183 2.033 0 3.946-.52 5.618-1.427M17.76 17.76A9.973 9.973 0 0021 12c-.553-1.665-1.47-3.156-2.62-4.37"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
export default LabeledInput;
