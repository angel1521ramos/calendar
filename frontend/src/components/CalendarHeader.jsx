import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import calendar from "../assets/calendar.svg";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";
import { Link } from "react-router-dom";
import "dayjs/locale/es-mx";

export default function CalendarHeader() {
  const {
    monthIndex,
    setMonthIndex,
    setDaySelected,
    doctors,
    users,
    userAuth,
    setUserAuth,
  } = useContext(GlobalContext);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
    setDaySelected(dayjs());
  }

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const { data } = await axios.get("http://localhost:8000/home/", {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setUserAuth(data.message);
        } catch (e) {
          console.log("not auth");
        }
      })();
    }
  }, []);

  users.map((user) => {
    if (user.username === userAuth) {
      let id = user.id;
      doctors.map((doctor) => {
        if (doctor.user === id) {
          setUserAuth(doctor);
        }
      });
    }
  });

  return (
    <header className="px-4 py-2 flex items-center bg-gray-800">
      <img src={calendar} alt="calendar" className="mr-2 w-9 h-9" />
      <h1 className="mr-10 text-xl text-white fond-bold">Calendario agenda</h1>
      <button
        className="bg-gradient-to-br from-violet-500 to-fuchsia-600 hover:bg-gradient-to-bl rounded py-2 px-4 mr-5 text-white"
        onClick={handleReset}
      >
        Hoy
      </button>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-100 mx-2">
          chevron_left
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-100 mx-2">
          chevron_right
        </span>
      </button>
      <h2 className="ml-4 text-xl text-white font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex))
          .locale("es-mx")
          .format("MMMM YYYY")
          .toUpperCase()}
      </h2>
      <Link
        to="/logout"
        class="rounded py-2 px-4 mr-5 absolute right-0 text-white bg-gradient-to-br from-violet-700 to-fuchsia-800 hover:bg-gradient-to-bl"
      >
        <a>Salir</a>
      </Link>
    </header>
  );
}
