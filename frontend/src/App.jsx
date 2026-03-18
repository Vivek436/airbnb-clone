import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ListingPage1 from "./pages/ListingPage1";
import ListingPage2 from "./pages/ListingPage2";
import ListingPage3 from "./pages/ListingPage3";
import MyListing from "./pages/MyListing";
import ViewCard from "./pages/ViewCard";
import UpdateListing from "./pages/UpdateListing";
import MyBookings from "./pages/MyBookings";
import BookingConfirmation from "./pages/BookingConfirmation";
import Wishlist from "./pages/Wishlist";
import HostDashboard from "./pages/HostDashboard";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import { userDataContext } from "./Context/UserContext";

const App = () => {
  let { userData } = useContext(userDataContext);
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 4000,
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/listingpage1"
          element={
            userData != null ? <ListingPage1 /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/listingpage2"
          element={
            userData != null ? <ListingPage2 /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/listingpage3"
          element={
            userData != null ? <ListingPage3 /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/mylisting"
          element={
            userData != null ? <MyListing /> : <Navigate to={"/login"} />
          }
        />
        <Route path="/viewcard/:id" element={<ViewCard />} />
        <Route
          path="/updatelisting/:id"
          element={
            userData != null ? <UpdateListing /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/mybookings"
          element={
            userData != null ? <MyBookings /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/wishlist"
          element={
            userData != null ? <Wishlist /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/host-dashboard"
          element={
            userData != null ? <HostDashboard /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/booking-confirmation"
          element={
            userData != null ? <BookingConfirmation /> : <Navigate to={"/login"} />
          }
        />
        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
