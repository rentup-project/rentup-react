import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import Navbar from "./components/Navbar/Navbar";
import LoadingScreen from "./screens/LoadingScreen";
import PropertiesScreen from "./screens/PropertiesScreen/PropertiesScreen";
import PropertyDetailScreen from "./screens/PropertyDetailScreen/PropertyDetailScreen";

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
        <Route path="/search/:search" element={<PropertiesScreen />} />
        <Route path="/property/:id" element={<PropertyDetailScreen />} />
        {/* MISC */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
