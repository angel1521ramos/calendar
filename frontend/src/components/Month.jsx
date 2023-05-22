import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Day from "./Day";

export default function Month({ month }) {
  const { setMonthIndex, monthIndex } = useContext(GlobalContext);
  function handleMonth(e) {
    e.preventDefault();
    if (e.deltaY < 0) {
      setMonthIndex(monthIndex - 1);
    } else if (e.deltaY > 0) {
      setMonthIndex(monthIndex + 1);
    }
  }
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-4 py-4 pr-4" onWheel={handleMonth}>
      {month.map((week, i) => (
        <React.Fragment key={i}>
          {week.map((dia, idx) => (
            <Day dia={dia} key={idx} weekdays={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
