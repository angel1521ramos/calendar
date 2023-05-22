import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

export default function SeeMoreModal() {
  const {
    setShowSeeMoreModal,
    filteredEvents,
    userAuth,
    daySeeMore,
    setShowEventModal,
    setSelectedEvent,
  } = useContext(GlobalContext);

  return (
    <>
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
        <div class="relative w-full max-w-md max-h-full">
          <div class="relative rounded-lg shadow bg-gray-700">
            <button
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
              onClick={() => {
                setShowSeeMoreModal(false);
              }}
            >
              <span className="material-icons-outlined text-gray-400 ">
                close
              </span>
            </button>

            <div class="px-6 py-4 border-b rounded-t border-gray-600">
              <h3 class="text-base font-semibold  lg:text-xl  text-white">
                {daySeeMore.locale("es-mx").format("dddd").toUpperCase()}{" "}
                {daySeeMore.locale("es-mx").format("DD").toUpperCase()} DE{" "}
                {daySeeMore.locale("es-mx").format("MMMM").toUpperCase()}
              </h3>
            </div>

            <div class="p-6">
              <ul class="my-4 space-y-3">
                {filteredEvents.map((x, idx) => (
                  <>
                    {userAuth.specialty === "recepcion" ? (
                      <li>
                        <a
                          key={idx}
                          onClick={(e) => {
                            setShowSeeMoreModal(false);
                            setShowEventModal(true);
                            setSelectedEvent(x);
                          }}
                          class={`bg-gradient-to-r from-${x.color}-500 via-${
                            x.color
                          }-600 to-${
                            x.color
                          }-700 flex items-center p-3 text-base font-bold rounded-lg group hover:bg-gradient-to-br text-white ${
                            dayjs(x.day).format("DD-MM-YY") !==
                            dayjs(daySeeMore).format("DD-MM-YY")
                              ? "hidden"
                              : ""
                          }`}
                        >
                          <span class="flex-1 ml-3 whitespace-nowrap">
                            Dr. {x.doctor}
                          </span>
                        </a>
                      </li>
                    ) : (
                      userAuth.color === x.color && (
                        <li>
                          <a
                            key={idx}
                            onClick={(e) => {
                              setShowSeeMoreModal(false);
                              setShowEventModal(true);
                              setSelectedEvent(x);
                            }}
                            class={`bg-gradient-to-r from-${x.color}-500 via-${
                              x.color
                            }-600 to-${
                              x.color
                            }-700 flex items-center p-3 text-base font-bold rounded-lg group hover:bg-gradient-to-br text-white ${
                              dayjs(x.day).format("DD-MM-YY") !==
                              dayjs(daySeeMore).format("DD-MM-YY")
                                ? "hidden"
                                : ""
                            }`}
                          >
                            <span class="flex-1 ml-3 whitespace-nowrap">
                              {x.patient}
                            </span>
                          </a>
                        </li>
                      )
                    )}
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
