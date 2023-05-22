import React, { useState, useContext, useEffect } from "react";
import getMonth from "./util";
import CalendarHeader from "./components/CalendarHeader";
import EventModal from "./components/EventModal";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import GlobalContext from "./context/GlobalContext";
import SeeMoreModal from "./components/SeeMoreModal";
import ConfirmModal from "./components/ConfirmModal";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, showSeeMoreModal, showConfirmModal } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <BrowserRouter>
      {showEventModal && <EventModal />}
      {showSeeMoreModal && <SeeMoreModal />}
      {showConfirmModal && <ConfirmModal />}

      <Routes>
        <Route
          path="/"
          element={
            <div className="h-screen flex flex-col bg-slate-900">
              <CalendarHeader />
              <div className="flex flex-1">
                <Sidebar />
                <Month month={currenMonth} />
              </div>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
