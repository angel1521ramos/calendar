import dayjs from "dayjs";
import "dayjs/locale/es-mx";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import getMonth from "../../util";
import "dayjs/locale/es-mx";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month()); //guarda el indice
  const [currentMonth, setCurrentMonth] = useState(getMonth()); //guarda la estructura del mes

  const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected } = useContext(GlobalContext);//acceso al contexto global


  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);



  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }

  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  function getDayClass(day) {
    const formato = "DD-MM-YY";
    const nowDay = dayjs().format(formato);//dia hoy
    const currDay = day.format(formato);//dia seleccionado
    const slcDay = daySelected && daySelected.format(formato);//dia sacado del estado global

    if (currDay === nowDay) {
      return "bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-full text-white";
    }else if (currDay === slcDay) {
      return "bg-gradient-to-br from-violet-800 to-fuchsia-950  rounded-full text-purple-600 font-bold";
    }else{
      return "";
    }
  }

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-white font-bold text-sm">
          {dayjs(new Date(dayjs().year(), currentMonthIdx))
            .locale("es-mx")
            .format("MMMM YYYY")
            .toUpperCase()}
        </p>
        <div>
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
        </div>
      </header>

      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((days, i) => (
          <span key={i} className="text-sm py-1 text-center text-white font-bold">
            {days.locale("es-mx").format("dd").charAt(0).toUpperCase()}
          </span>
        ))}

        {currentMonth.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day, idx) => (
              <button
                key={idx}
                className={`py-1 w-full ${getDayClass(day)}`}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day)//cambia el estado del dia al seleccionado
                }}
              >
                <span className="text-xs text-white">
                  {day.locale("es-mx").format("D")}
                </span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>

    </div>
  );
}
