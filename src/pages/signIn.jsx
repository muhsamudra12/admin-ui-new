import React, { useContext } from "react";
import AuthLayout from "../components/Layout/AuthLayout";
import FormSignIn from "../components/Fragments/FormSignIn";
import { loginService } from "../services/authService";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function signIn() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await loginService(email, password);

      login(response.refreshToken);

      navigate("/");
    } catch (err) {
      alert(err.msg || "Login Gagal, periksa email dan password Anda");
      console.error(err.msg);
    }
  };

  return (
    <AuthLayout>
      <FormSignIn onSubmit={handleLogin} />
    </AuthLayout>
  );
}

export default signIn;
