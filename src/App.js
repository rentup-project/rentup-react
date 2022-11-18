import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";
import Navbar from "./components/Navbar/Navbar";
//import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import EditPropertyScreen from "./screens/EditPropertyScreen/EditPropertyScreen";
import ErrorScreen from "./screens/ErrorScreen/ErrorScreen";
import FavsScreen from "./screens/FavsScreen/FavsScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen";
import MyAreaScreen from './screens/MyAreaScreen/MyAreaScreen';
import MyRentDetailsScreen from "./screens/MyRentDetailsScreen/MyRentDetailsScreen";
import NewProperty from "./screens/NewPropertyScreen/NewPropertyScreen";
import NotificationsScreen from "./screens/NotificationsScreen/NotificationsScreen";
import PropertiesScreen from "./screens/PropertiesScreen/PropertiesScreen";
import PropertyDetailScreen from "./screens/PropertyDetailScreen/PropertyDetailScreen";
import ReservePaymentScreen from "./screens/ReservePaymentScreen/ReservePaymentScreen";
import ReviewScreen from "./screens/ReviewScreen/ReviewScreen";
import SelectVisitScreen from './screens/SelectVisitScreen/SelectVisitScreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomeScreen />} />
        {/* AUTH */}
        <Route path="/validation" element={<LoadingScreen />} />
        <Route path="/activate/:token" element={<LoadingScreen />} />
        {/* ACCOUNT */}
        <Route path="/account/favs" element={
          //<ProtectedRoute>
            <FavsScreen />
          //</ProtectedRoute>
        } />
        {/* PROPERTIES */}
        <Route path="/search" element={<PropertiesScreen />} />
        <Route path="/search/:search" element={<PropertiesScreen />} />
        <Route path="/property/create" element={
          //<ProtectedRoute>
            <NewProperty />
          //</ProtectedRoute>
        } />
        <Route path="/property/edit/:id" element={
          //<ProtectedRoute>
            <EditPropertyScreen />
          //</ProtectedRoute>
        } />
        <Route path="/property/:id" element={<PropertyDetailScreen />} />
        {/* PAYMENTS */}
        <Route path="/payment/reserve/:id" element={<ReservePaymentScreen />} />
        <Route path="/chekout" element={<CheckoutForm />} />
        {/* NOTIFICATIONS */}
        <Route path="/notifications" element={
          //<ProtectedRoute>
            <NotificationsScreen />
          //</ProtectedRoute>
        } />
        {/* MY PERSONAL AREA */}
        <Route path="/my-area" element={
          //<ProtectedRoute>
            <MyAreaScreen />
          //</ProtectedRoute>
        } />
        <Route path="/my-area/:owner" element={
          //<ProtectedRoute>
            <MyAreaScreen />
          //</ProtectedRoute>
        } />
        <Route path="/my-area/prequalification" element={
          //<ProtectedRoute>
            <MyAreaScreen />
          //</ProtectedRoute>
        } />
        <Route path="/my-area/messages" element={
          //<ProtectedRoute>
            <MyAreaScreen />
          //</ProtectedRoute>
        } />
        <Route path="/my-area/myRents" element={
          //<ProtectedRoute>
            <MyAreaScreen />
          //</ProtectedRoute>
        } />
        {/* RENT DETAILS*/}
        <Route path="/rent/details/:id" element={
          //<ProtectedRoute>
            <MyRentDetailsScreen />
          //</ProtectedRoute>
        } />
        <Route path="/rent/review/:id" element={
          //<ProtectedRoute>
            <ReviewScreen />
          //</ProtectedRoute>
        } />
        {/* VISITS */}
        <Route path="/visits/select/:id" element={
          //<ProtectedRoute>
            <SelectVisitScreen />
          //</ProtectedRoute>
        } />
        {/* MISC */}
        <Route path="/error" element={<ErrorScreen />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </div>
  );
}

export default App;