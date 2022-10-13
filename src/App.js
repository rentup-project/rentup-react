import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";

import HomeScreen from './screens/HomeScreen';
import Navbar from './components/Navbar/Navbar';
import SignupScreen from './screens/SignupScreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomeScreen />} />
        {/* AUTH */}
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/login" element={<HomeScreen />} />
        {/* MISC */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
