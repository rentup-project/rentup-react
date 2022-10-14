import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar/Navbar";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomeScreen />} />
        {/* AUTH */}
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/activate/:token" element={<LoadingScreen />} />
        {/* MISC */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
