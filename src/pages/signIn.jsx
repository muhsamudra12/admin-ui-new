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

  // State untuk notifikasi error/sukses
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await loginService(email, password);

      // Simpan token ke context
      login(response.refreshToken);

      // Arahkan ke dashboard
      navigate("/");
    } catch (err) {
      // Tampilkan pesan error jika login gagal
      setSnackbar({
        open: true,
        message: err.msg || "Login gagal, silakan coba lagi.",
        severity: "error",
      });
    }
  };

  return (
    <AuthLayout>
      <FormSignIn onSubmit={handleLogin} />

      {/* Komponen Snackbar untuk menampilkan error */}
      {snackbar.open && (
        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      )}
    </AuthLayout>
  );
}

export default signIn;
