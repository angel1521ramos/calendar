import React, { useEffect, useMemo, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import axios from "axios";

//childrend se escribio mal xd
export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month()); //estado indice calendario grande
  const [daySeeMore, setDaySeeMore] = useState(
    dayjs(dayjs()).format("DD-MM-YY")
  ); //estado del dia seleccionado para visualizar mas
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null); //estado indice del calendario pequeño que afecta solo al calendario grande
  const [daySelected, setDaySelected] = useState(dayjs()); //estado que guarda el dia seleccionado
  const [showEventModal, setShowEventModal] = useState(false); //estado del modal mostrado
  const [showSeeMoreModal, setShowSeeMoreModal] = useState(false); //estado del modal mostrado
  const [showConfirmModal, setShowConfirmModal] = useState(false); //estado del modal mostrado
  const [selectedEvent, setSelectedEvent] = useState(null); //estado que guarda el evento seleccionado
  const [colors, setColors] = useState([]); //estado que guarda los colores en una matriz
  const [idEvents, setIdEvents] = useState(0);

  const [events, setEvents] = useState([]); //estado que guarda los eventos
  const [doctors, setDoctors] = useState([]); //estado que guarda los doctores
  const [users, setUsers] = useState([]); //estado que guarda los usuarios
  const [userAuth, setUserAuth] = useState([]); //estado que guarda el usuario doctor autenticado

  const [isAuth, setIsAuth] = useState(false); //estado que guarda si esta autenticado o no
  const [username, setUsername] = useState(null); //estado que guarda el username del usuario autenticado
  const [password, setPassword] = useState(null); //estado que guarda la contraseña del usuario autenticado

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/get/")
      .then((e) => {
        setEvents(e.data);
        console.log("eventos", e.data);
      })
      .catch(() => {
        console.log("Algo fue mal!");
      });

    axios
      .get("http://127.0.0.1:8000/get/doctors/")
      .then((e) => {
        setDoctors(e.data);
        console.log(e.data);
      })
      .catch(() => {
        console.log("Algo fue mal!");
      });

    axios
      .get("http://127.0.0.1:8000/get/users/")
      .then((e) => {
        setUsers(e.data);
        console.log(e.data);
      })
      .catch(() => {
        console.log("Algo fue mal!");
      });
  }, []);

  useEffect(() => {
    setColors((prevColors) => {
      return [...new Set(events.map((evtX) => evtX.color))].map((color) => {
        const currentColor = prevColors.find((clors) => clors.color === color);
        return {
          color: color,
          checked: currentColor ? currentColor.checked : true,
        };
      });
    });
    console.log("COLORES", colors);
  }, [events]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  const filteredEvents = useMemo(() => {
    return events.filter((x) =>
      colors
        .filter((clors) => clors.checked)
        .map((clors) => clors.color)
        .includes(x.color)
    );
  }, [events, colors]);

  function updateColor(color) {
    setColors(colors.map((x) => (x.color === color.color ? color : x))); //quita el check en la lista de colores
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        daySeeMore,
        setDaySeeMore,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        showSeeMoreModal,
        setShowSeeMoreModal,
        showConfirmModal,
        setShowConfirmModal,
        events,
        setEvents,
        selectedEvent,
        setSelectedEvent,
        colors,
        setColors,
        updateColor,
        filteredEvents,
        idEvents,
        setIdEvents,
        doctors,
        setDoctors,
        users,
        setUsers,
        isAuth,
        setIsAuth,
        username,
        setUsername,
        password,
        setPassword,
        userAuth,
        setUserAuth,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
