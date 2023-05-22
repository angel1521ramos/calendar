import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import "dayjs/locale/es-mx";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";

export default function Day({ dia, weekdays }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    setShowSeeMoreModal,
    filteredEvents,
    setSelectedEvent,
    events,
    setEvents,
    userAuth,
    setDaySeeMore,
    daySeeMore,
  } = useContext(GlobalContext);

  useEffect(() => {
    const evt = filteredEvents.filter(
      (x) => dayjs(x.day).format("DD-MM-YY") === dia.format("DD-MM-YY")
    );
    setDayEvents(evt);
  }, [filteredEvents, dia]);

  function currentDay() {
    return dia.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white rounded-full w-7"
      : "text-gray-300";
  }
  function dragStarted(e, id) {
    console.log("ha comenzado el arrastre");
    e.dataTransfer.setData("id", id);
  }
  function dragginOver(e) {
    e.preventDefault();
    console.log("objeto detectado me pongo gris");
  }
  function onDragDrop(e) {
    e.preventDefault();
    const eventDrop = parseInt(e.dataTransfer.getData("id"));
    events.map((x) => {
      if (eventDrop === x.id) {
        axios
          .put(`http://127.0.0.1:8000/put/${eventDrop}/`, {
            patient: x.patient,
            age: x.age,
            phone: x.phone,
            education: x.education,
            observations: x.observations,
            doctor: x.doctor,
            color: x.color,
            day: dia.valueOf(),
            date: x.date,
          })
          .then((response) => {
            const { data } = response;
            const newEvent = events.map((x) => {
              if (x.id === eventDrop) {
                return data;
              }
              return x;
            });
            setEvents(newEvent);
          })
          .catch(() => {
            alert("A ocurrido un error inesperado");
          });
      }
    });
  }

  const handleClick = (e) => {
    if (e.target.classList.contains("seeMore")) {
      setShowSeeMoreModal(true);
      setDaySeeMore(dia);
    } else {
      setShowEventModal(true);
      setDaySelected(dia);
    }
  };
  return (
    <>
      <div
        droppable="true"
        onDragOver={(e) => dragginOver(e)}
        onDrop={(e) => onDragDrop(e)}
        className="bg-gray-800 flex flex-col rounded-md cursor-pointer"
        onClick={(e) => handleClick(e)}
      >
        <header className="flex flex-col items-center">
          {weekdays === 0 && (
            <p className="text-sm mt-1 text-white font-bold">
              {dia.locale("es-mx").format("dddd").toUpperCase()}
            </p>
          )}
          <p
            className={`text-sm p-1 my-1 text-center ${currentDay()} text-gray-300`}
          >
            {dia.format("DD")}
          </p>
        </header>

        <div className="flex-1">
          {userAuth.specialty === "recepcion" ? (
            <>
              {dayEvents.map((x, idx) => (
                <>
                  <div
                    id="events"
                    draggable="true"
                    onDragStart={(e) => dragStarted(e, x.id)}
                    onClick={(e) => {
                      setShowEventModal(true);
                      setSelectedEvent(x);
                    }}
                    key={idx}
                    className={`p-0.5 mx-3 bg-gradient-to-r from-${
                      x.color
                    }-500 via-${x.color}-600 to-${
                      x.color
                    }-700 hover:bg-gradient-to-br text-white text-sm rounded mb-1 truncate ${
                      idx >= 3 ? "hidden" : ""
                    }`}
                  >
                    Dr. {x.doctor}
                  </div>
                  <div
                    id="seeMore"
                    className={`seeMore p-0.5 mx-3 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 hover:bg-gradient-to-br text-white text-sm rounded mb-1 truncate ${
                      idx !== 3 ? "hidden" : ""
                    }`}
                  >
                    <span className="seeMore">Ver Más ...</span>
                  </div>
                </>
              ))}
            </>
          ) : (
            <>
              {dayEvents
                .filter((x) => x.color === userAuth.color)
                .map((x, idx) => (
                  <>
                    <div
                      id="events"
                      onClick={(e) => {
                        setShowEventModal(true);
                        setSelectedEvent(x);
                      }}
                      key={idx}
                      className={`p-0.5 mx-3 bg-gradient-to-r from-${
                        x.color
                      }-500 via-${x.color}-600 to-${
                        x.color
                      }-700 hover:bg-gradient-to-br text-white text-sm rounded mb-1 truncate ${
                        idx >= 3 ? "hidden" : ""
                      }`}
                    >
                      {x.patient}
                    </div>
                    <div
                      id="seeMore"
                      className={`seeMore p-0.5 mx-3 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 hover:bg-gradient-to-br text-white text-sm rounded mb-1 truncate ${
                        idx !== 3 ? "hidden" : ""
                      }`}
                    >
                      <span className="seeMore">Ver Más ...</span>
                    </div>
                  </>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
