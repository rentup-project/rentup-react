import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import Navbar from "./components/Navbar/Navbar";
import LoadingScreen from "./screens/LoadingScreen";
import PropertiesScreen from "./screens/PropertiesScreen/PropertiesScreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomeScreen />} />
        {/* AUTH */}
        <Route path="/activate/:token" element={<LoadingScreen />} />
        {/* PROPERTIES */}
        <Route path="/search" element={<PropertiesScreen />} />
        {/* <Route path="/search/:search" element={<PropertiesScreen />} /> */}
        {/* MISC */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
