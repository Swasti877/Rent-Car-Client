import "./App.css";
import NavBar from "./components/NavBar.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RentalDashboard from "./components/RentalDashboard.js";
import LandingPage from "./components/LandingPage.js";
import LoginPage from "./components/LoginPage.js";
import Admin from "./components/Admin.js";
import AdminCarDash from "./components/AdminCarDash.js";
import { useState } from "react";
import AddCardModal from "./components/AddCardModal.js";
import AddLocationModal from "./components/AddLocationModal.js";
import AdminLocationDash from "./components/AdminLocationDash.js";
import AddRentalModal from "./components/AddRentalModal.js";
import AdminRentalDash from "./components/AdminRentalDash.js";
import OrderHistory from "./components/OrderHistory";
import Stripe from "./components/Stripe";
import AboutUs from "./components/AboutUs.js";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <LandingPage />
              </>
            }
          />
          <Route
            path="/fleet"
            element={
              <>
                <NavBar />
                <RentalDashboard />
              </>
            }
          />
          <Route
            path="/about-us"
            element={
              <>
                <NavBar />
                <AboutUs />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <LoginPage />
              </>
            }
          />
          <Route
            path="/orderHistory"
            element={
              <>
                <NavBar />
                <OrderHistory />
              </>
            }
          />
          <Route
            path="/pay"
            element={
              <>
                <Stripe />
              </>
            }
          />
          <Route
            path="/admin/car"
            element={
              <>
                <Admin
                  modal={
                    <>
                      <AddCardModal props={{ setIsModalOpen, isModalOpen }} />
                    </>
                  }
                  components={
                    <>
                      <AdminCarDash props={{ setIsModalOpen }} />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/admin/location"
            element={
              <>
                <Admin
                  modal={
                    <>
                      <AddLocationModal
                        props={{ setIsModalOpen, isModalOpen }}
                      />
                    </>
                  }
                  components={
                    <>
                      <AdminLocationDash props={{ setIsModalOpen }} />
                    </>
                  }
                />
              </>
            }
          />
          <Route
            path="/admin/rental"
            element={
              <>
                <Admin
                  modal={
                    <>
                      <AddRentalModal props={{ setIsModalOpen, isModalOpen }} />
                    </>
                  }
                  components={
                    <>
                      <AdminRentalDash props={{ setIsModalOpen }} />
                    </>
                  }
                />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
