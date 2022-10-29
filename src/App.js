import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import EditPropertyScreen from "./screens/EditPropertyScreen/EditPropertyScreen";
import ErrorScreen from "./screens/ErrorScreen/ErrorScreen";
import FavsScreen from "./screens/FavsScreen/FavsScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";
import MessagesScreen from "./screens/MessagesScreen/MessagesScreen";
import MyAreaScreen from './screens/MyAreaScreen/MyAreaScreen';
import NewProperty from "./screens/NewPropertyScreen/NewPropertyScreen";
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
        {/* ACCOUNT */}
        <Route path="/account/favs/:user" element={<FavsScreen />} />
        {/* PROPERTIES */}
        <Route path="/search" element={<PropertiesScreen />} />
        <Route path="/search/:search" element={<PropertiesScreen />} />
        <Route path="/property/create" element={<NewProperty />} />
        <Route path="/property/edit/:id" element={<EditPropertyScreen />} />
        <Route path="/property/:id" element={<PropertyDetailScreen />} />
        {/* MESSAGES */}
        <Route path="/messages/:id" element={<MessagesScreen />} />
        {/* MY PERSONAL AREA */}
        <Route path="/my-area" element={<MyAreaScreen />} />
        {/* MISC */}
        <Route path="/error" element={<ErrorScreen />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </div>
  );
}

export default App;
