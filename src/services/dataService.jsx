import axios from "axios";

const API_URL = "https://jwt-auth-eight-neon.vercel.app";

export const goalService = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw { status: 401, msg: "Token tidak ditemukan" };
    }

    const response = await axios.get(`${API_URL}/goals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Mengambil objek pertama dari array data
    return response.data.data && response.data.data.length > 0
      ? response.data.data[0]
      : null;
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      msg: error.response?.data?.msg || "Gagal mengambil data goals",
    };
  }
};

export const expenseService = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw { status: 401, msg: "Token tidak ditemukan" };
    }

    const response = await axios.get(`${API_URL}/expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // SESUAIKAN DI SINI:
    // Karena API Anda mengembalikan array langsung, gunakan response.data
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      msg: error.response?.data?.msg || "Gagal mengambil data expenses",
    };
  }
};
