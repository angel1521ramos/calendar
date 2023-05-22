import React, { useContext } from "react";
import add from "../../assets/add.svg";
import GlobalContext from "../../context/GlobalContext";
export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      className="p-2 rounded flex items-center shadow-md bg-gradient-to-br from-violet-500 to-fuchsia-600 hover:bg-gradient-to-bl"
      onClick={() => setShowEventModal(true)}
    >
      <img src={add} width="25" height="25" alt="añadir" className="w-5 h-5" />
      <span className="pl-3 pr-7 text-base text-white">Crear evento</span>
    </button>
  );
}
