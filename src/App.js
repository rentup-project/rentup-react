import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import Navbar from "./components/Navbar/Navbar";
import LoadingScreen from "./screens/LoadingScreen";
import PropertiesScreen from "./screens/PropertiesScreen/PropertiesScreen";
import PropertyDetailScreen from "./screens/PropertyDetailScreen/PropertyDetailScreen";
import ErrorScreen from './screens/ErrorScreen/ErrorScreen';

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
        <Route path="/error" element={<ErrorScreen />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </div>
  );
}

export default App;
