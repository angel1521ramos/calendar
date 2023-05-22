import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import "dayjs/locale/es-mx";
import dayjs from "dayjs";
import axios from "axios";

const labelsClasses = ["indigo", "gray", "green", "purple", "red", "purple"];
export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    setEvents,
    events,
    doctors,
    selectedEvent,
    setSelectedEvent,
    setDaySelected,
    userAuth,
    setShowConfirmModal,
  } = useContext(GlobalContext);

  const [patient, setPatient] = useState(
    selectedEvent ? selectedEvent.patient : ""
  );
  const [age, setAge] = useState(selectedEvent ? selectedEvent.age : "");
  const [phone, setPhone] = useState(selectedEvent ? selectedEvent.phone : "");
  const [education, setEducation] = useState(
    selectedEvent ? selectedEvent.education : ""
  );
  const [observations, setObservations] = useState(
    selectedEvent ? selectedEvent.observations : ""
  );
  const [doctor, setDoctor] = useState(
    selectedEvent ? selectedEvent.doctor : ""
  );
  const [color, setColor] = useState(selectedEvent ? selectedEvent.color : "");
  const [date, setDate] = useState(
    selectedEvent ? selectedEvent.date : dayjs().format("HH:mm")
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (selectedEvent) {
      axios
        .put(`http://127.0.0.1:8000/put/${selectedEvent.id}/`, {
          patient: patient,
          age: age,
          phone: phone,
          education: education,
          observations: observations,
          doctor: doctor,
          color: color,
          day: daySelected.valueOf(),
          date: date,
        })
        .then((response) => {
          const { data } = response;
          const newEvent = events.map((x) => {
            if (x.id === selectedEvent.id) {
              return data;
            }
            return x;
          });
          setEvents(newEvent);
        })
        .catch(() => {
          alert("A ocurrido un error inesperado");
        });
      setSelectedEvent(null);
    } else {
      axios
        .post("http://127.0.0.1:8000/post/", {
          patient: patient,
          age: age,
          phone: phone,
          education: education,
          observations: observations,
          doctor: doctor,
          color: color,
          day: daySelected.valueOf(),
          date: date,
        })
        .then((response) => {
          const { data } = response;
          setEvents([...events, data]);
        })
        .catch((e) => {
          console.log("A ocurrido un error inesperado", e);
        });
    }
    setShowEventModal(false);
  }
  function startDatepicker(e) {
    const datep = dayjs(e.target.valueAsNumber).add(1, "day");
    setDaySelected(datep);
  }
  function selectDoctor(e) {
    let nombre = e.target.value;
    doctors.map((x) => {
      if (x.name === nombre) {
        setColor(x.color);
      }
    });
    setDoctor(nombre);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="rounded-lg bg-gray-800 shadow-2xl w-1/3">
        <header className="rounded-t-lg bg-gray-700 px-2 py-2 flex justify-between items-center">
          <span className="material-icons-round text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <button
                class="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
                onClick={() => {
                  setShowConfirmModal(true);
                  setShowEventModal(false);
                }}
              >
                <span
                  className={`material-icons-round text-gray-400 cursor-pointer ${
                    userAuth.specialty !== "recepcion" ? "hidden" : ""
                  }`}
                >
                  delete
                </span>
              </button>
            )}
            <button
              class="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white"
              onClick={() => {
                setShowEventModal(false);
                setSelectedEvent(null);
              }}
            >
              <span className="material-icons-round text-gray-400 ">close</span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div class="relative z-0 w-full group">
              <label
                for="patient"
                class="block mb-2 text-sm font-medium text-white"
              >
                Paciente
              </label>
              <div class="relative" for="patient">
                <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <span className="material-icons-round text-gray-400">
                    person
                  </span>
                </div>
                <input
                  type="text"
                  name="patient"
                  id="patient"
                  class="border text-sm rounded-lg block w-full pl-10   p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                  placeholder=" "
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                  required
                  disabled={userAuth.specialty !== "recepcion" ? true : false}
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-full ">
                <div class="relative z-0 group">
                  <label
                    for="date"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    Dia
                  </label>
                  <div class="relative " for="date">
                    <input
                      name="date"
                      id="date"
                      type="date"
                      class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white [color-scheme:dark]"
                      value={daySelected.format("YYYY-MM-DD")}
                      onChange={(e) => {
                        startDatepicker(e);
                      }}
                      required
                      disabled={
                        userAuth.specialty !== "recepcion" ? true : false
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="w-full pl-5">
                <div class="relative z-0 group">
                  <label
                    for="time"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    Hora
                  </label>
                  <div class="relative " for="time">
                    <input
                      name="time"
                      id="time"
                      type="time"
                      class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white [color-scheme:dark]"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      disabled={
                        userAuth.specialty !== "recepcion" ? true : false
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center">
              <div className="w-full">
                <div class="relative z-0 group">
                  <label
                    for="age"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    Edad
                  </label>
                  <div class="relative " for="age">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                      <span className="material-icons-round text-gray-400">
                        cake
                      </span>
                    </div>
                    <input
                      type="number"
                      name="age"
                      min="0"
                      oninput="this.value = Math.abs(this.value)"
                      id="age"
                      class="pl-10 border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                      placeholder=" "
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                      disabled={
                        userAuth.specialty !== "recepcion" ? true : false
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="w-full pl-5">
                <div class="relative z-0 group">
                  <label
                    for="phone"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    Telefono
                  </label>
                  <div class="relative " for="phone">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                      <span className="material-icons-round text-gray-400">
                        phone
                      </span>
                    </div>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      class="pl-10 border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                      placeholder=" "
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      disabled={
                        userAuth.specialty !== "recepcion" ? true : false
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="relative z-0 w-full group">
              <label
                for="doctor"
                class="block mb-2 text-sm font-medium text-white"
              >
                Doctor
              </label>
              <select
                id="doctor"
                name="doctor"
                value={doctor}
                onChange={(e) => {
                  selectDoctor(e);
                }}
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                required
                disabled={userAuth.specialty !== "recepcion" ? true : false}
              >
                <option selected>Selecciona un doctor</option>
                {doctors.map((x, i) => (
                  <option key={i} value={x.name}>
                    {x.name} - {x.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div class="relative z-0 w-full group">
              <label
                for="education"
                class="block mb-2 text-sm font-medium text-white"
              >
                Educacion
              </label>
              <select
                id="education"
                name="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                required
                disabled={userAuth.specialty !== "recepcion" ? true : false}
              >
                <option selected>Selecciona un grado academico</option>
                <option value="Preescolar">Preescolar</option>
                <option value="Primaria">Primaria</option>
                <option value="Secundaria">Secundaria</option>
                <option value="Preparatoria">Preparatoria</option>
                <option value="Universitaria">Universitaria</option>
                <option value="Postgrado">Postgrado</option>
              </select>
            </div>

            <div class="relative z-0 w-full group">
              <label
                for="observations"
                class="block mb-2 text-sm font-medium text-white"
              >
                Observaciones
              </label>
              <textarea
                name="observations"
                id="observations"
                rows="4"
                class="block p-2.5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                placeholder=" "
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                required
                disabled={userAuth.specialty !== "recepcion" ? true : false}
              />
            </div>
          </div>
        </div>
        <footer className="rounded-b-lg flex bg-gray-700 justify-end p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className={`bg-gradient-to-br from-violet-500 to-fuchsia-600 hover:bg-gradient-to-bl px-6 py-2 rounded text-white ${
              userAuth.specialty !== "recepcion" ? "hidden" : ""
            }`}
          >
            Guardar
          </button>
        </footer>
      </form>
    </div>
  );
}
