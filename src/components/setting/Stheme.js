import React from "react";
import { useLocalStorage } from "react-use";

const Stheme = () => {
  const [theme, ,] = useLocalStorage("theme");
  return (
    <div id="stheme" className="w-full sticky h-full p-4 mt-20 ">
      <div className="w-full rounded-lg px-8 py-8   bg-custom-gray">
        <p className="text-4xl mb-6">Theme</p>
        <select
          data-choose-theme
          className="w-32 select bg-gray2 px-3 py-1 text-lg"
        >
          <option selected={theme === "green"} value="green">
            green
          </option>
          <option selected={theme === "orange"} value="orange">
            orange
          </option>
          <option selected={theme === "blue"} value="blue">
            blue
          </option>
          <option selected={theme === "pink"} value="pink">
            pink
          </option>
        </select>
      </div>
    </div>
  );
};

export default Stheme;
