import axios from "axios";
import { useContext, useEffect } from "react";
import logo from "../../assets/logo.svg";
import GlobalContext from "../../context/GlobalContext";

export default function Login() {
  const { username, password, setUsername, setPassword, setIsAuth } =
    useContext(GlobalContext);

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      window.location.href = "/";
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const User = {
      username: username,
      password: password,
    };

    const { data } = await axios.post(
      "http://localhost:8000/token/",
      User,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );

    setIsAuth(true);
    localStorage.clear();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;
    window.location.href = "/";
  };

  return (
      <section class="bg-slate-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="https://minatitlan.gob.mx/category/dif/"
            class="flex items-center mb-6 text-2xl font-semibold text-purple-800"
          >
            <img
              class="w-20 h-20 mr-2"
              src={logo}
              alt="logo"
            />
            DIF MINATITLAN
          </a>
          <div class="w-full bg-slate-800 border border-slate-700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                Calendario de citas
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={submit}>
                <div>
                  <label
                    for="username"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    Ingresa tu usuario
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    class="bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-violet-500 block w-full p-2.5"
                    placeholder="usuario"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-white"
                  >
                    Ingresa tu contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    class="bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-violet-500 block w-full p-2.5"
                  />
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-gradient-to-br from-violet-500 to-fuchsia-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Ingresa a tu cuenta
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}
