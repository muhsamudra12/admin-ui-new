import React, { useContext, useState } from "react";
import Logo from "../Elements/Logo";
import Input from "../Elements/Input";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Icon from "../Elements/Icon";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import { AuthContext, logoutService } from "../../context/authContext";

function MainLayout(props) {
  const { children } = props;
  const { theme, setTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const username = user?.name || "User";

  const themes = [
    { name: "theme-green", bgcolor: "bg-[#299D91]", color: "#299D91" },
    { name: "theme-blue", bgcolor: "bg-[#1E90FF]", color: "#1E90FF" },
    { name: "theme-purple", bgcolor: "bg-[#6A5ACD]", color: "#6A5ACD" },
    { name: "theme-pink", bgcolor: "bg-[#DB7093]", color: "#DB7093" },
    { name: "theme-brown", bgcolor: "bg-[#8B4513]", color: "#8B4513" },
  ];

  const menu = [
    { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
    { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
    {
      id: 3,
      name: "Transaction",
      icon: <Icon.Transaction />,
      link: "/transaction",
    },
    { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
    { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expense" },
    { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
    { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
  ];

  const handleLogout = async () => {
    try {
      await logoutService();
      logout();
    } catch (err) {
      console.error(err);
      if (err.status === 401) {
        logout();
      }
    }
  };

  return (
    <div className={`flex min-h-screen ${theme.name}`}>
      {/* Sidebar */}
      <aside className="bg-defaultBlack w-28 sm:w-64 text-special-bg2 flex flex-col justify-between px-7 py-12">
        <div>
          <Logo />
          <nav className="mt-10">
            {menu.map((item) => (
              <NavLink
                key={item.id}
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? "flex bg-primary text-white py-3 px-4 rounded-md mb-4"
                    : "flex hover:bg-special-bg3 hover:text-white py-3 px-4 rounded-md mb-4"
                }
              >
                <div className="me-3">{item.icon}</div>
                <div className="hidden sm:block">{item.name}</div>
              </NavLink>
            ))}

            {/* --- LETAK PILIHAN WARNA DI SINI (Tepat di bawah Setting) --- */}
            <div className="flex justify-start mt-8 mb-4 gap-3 px-4">
              {themes.map((t) => (
                <button
                  key={t.name}
                  className={`${t.bgcolor} w-5 h-5 rounded-full border-2 ${
                    theme.name === t.name
                      ? "border-white"
                      : "border-transparent"
                  } hover:scale-110 transition-transform`}
                  onClick={() => setTheme(t)}
                />
              ))}
            </div>
            {/* --------------------------------------------------------- */}
          </nav>
        </div>

        <div>
          {/* Bagian Bawah hanya Logout dan Profil */}
          <div onClick={handleLogout} className="cursor-pointer">
            <div className="flex items-center text-white py-3 px-4 rounded-md mb-4 hover:bg-special-bg3">
              <div className="mx-auto sm:max-0 text-primary">
                <Icon.Logout />
              </div>
              <div className="ms-3 hidden sm:block">Logout</div>
            </div>
          </div>

          <div className="border my-10 border-b-special-bg"></div>

          <div className="flex justify-between items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold">
              {username.charAt(0)}
            </div>
            <div className="hidden sm:block ms-3">
              <div className="font-bold text-white">{username}</div>
              <div className="text-xs text-gray-400">View Profile</div>
            </div>
            <div className="hidden sm:block ms-auto">
              <Icon.Detail size={15} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="bg-special-mainBg flex-1 flex flex-col">
        <header className="border-b border-gray-05 px-6 py-7 flex justify-between items-center">
          <div className="flex items-center">
            <div className="font-bold text-2xl me-6 text-black">{username}</div>
            <div className="text-gray-03 flex items-center">
              <Icon.ChevronRight size={20} />
              <span className="ms-2">May 19, 2023</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="me-10">
              <NotificationsIcon className="text-primary scale-110" />
            </div>
            <Input backgroundColor="bg-white" border="border-white" />
          </div>
        </header>
        <main className="flex-1 px-6 py-4">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
