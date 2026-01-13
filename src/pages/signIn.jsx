import React, { useContext, useState } from "react";
import AuthLayout from "../components/Layout/AuthLayout";
import FormSignIn from "../components/Fragments/FormSignIn";
import { loginService } from "../services/authService";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import AppSnackbar from "../components/Elements/AppSnackbar";

function signIn() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleLogin = async (email, password) => {
    try {
      const response = await loginService(email, password);
      login(response.refreshToken);
      navigate("/");
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.msg || "Login gagal.",
        severity: "error",
      });
    }
  };

  return (
    <AuthLayout>
      <FormSignIn onSubmit={handleLogin} />
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </AuthLayout>
  );
}
export default signIn;
