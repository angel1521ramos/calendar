import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

export default function Colors() {
  const { colors, updateColor, doctors, userAuth } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className="text-white font-bold mt-10">Doctores</p>

      {colors.map(({ color, checked }, idx) => (
        <>
          {userAuth.specialty === "recepcion" ? (
            <label key={idx} className="items-center mt-3 block">
              <input
                type="checkbox"
                checked={checked}
                className={`form-checkbox h-5 w-5 accent-${color}-500 rounded focus:ring-0 cursor-pointer `}
                onChange={() =>
                  updateColor({
                    color: color,
                    checked: !checked,
                  })
                }
              />
              <span className="ml-2 text-gray-100 capitalize">
                {doctors.map((x) => {
                  if (x.color === color) {
                    return x.name;
                  }
                })}
              </span>
            </label>
          ) : (
            userAuth.color === color && (
              <label key={idx} className="items-center mt-3 block">
                <input
                  type="checkbox"
                  checked={checked}
                  className={`form-checkbox h-5 w-5 accent-${color}-500 rounded focus:ring-0 cursor-pointer `}
                  onChange={() =>
                    updateColor({
                      color: color,
                      checked: !checked,
                    })
                  }
                />
                <span className="ml-2 text-gray-100 capitalize">
                  {doctors.map((x) => {
                    if (x.color === color) {
                      return x.name;
                    }
                  })}
                </span>
              </label>
            )
          )}
        </>
      ))}
    </React.Fragment>
  );
}
