import React, { useState } from "react";

function LabeledInput(props) {
  const { label, id, type, ...rest } = props;

  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const EyeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {showPassword ? (
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      ) : (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a1.86 1.86 0 0 1 2.68-2.68" />
          <path d="M6.06 6.06A10.07 10.07 0 0 0 12 4c7 0 10 7 10 7a1.86 1.86 0 0 0-2.68-2.68" />
          <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      )}
    </svg>
  );

  return (
    <>
      <label htmlFor={id} className="block text-sm mb-2">
        {label}
      </label>

      <div className="relative">
        <input
          className={`py-3 pl-4 text-sm rounded-md w-full bg-special-mainBg border border-gray-03 text-gray-01 focus:border-black focus:outline-none focus:ring-0 ${
            type === "password" ? "pr-10" : ""
          }`}
          id={id}
          type={inputType}
          {...rest}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {EyeIcon}
          </button>
        )}
      </div>
    </>
  );
}

export default LabeledInput;
