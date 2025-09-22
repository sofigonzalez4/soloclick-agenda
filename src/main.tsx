import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter , Routes, Route } from "react-router-dom"; // Ensure this is the correct import
import HomePage from "./pages/HomePage";
import RegisterProfessionalPage from "./pages/RegisterProfessionalPage";
import RegisterUserPage from "./pages/RegisterUserPage";
import LoginPage from "./pages/LoginPage";
import AgendaPage from "./pages/agendaPage"; 
import "./index.css";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/soloclick">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register-professional" element={<RegisterProfessionalPage />} />
        <Route path="/register-user" element={<RegisterUserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/agenda" element={<AgendaPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

