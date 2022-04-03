import React from "react";

const Stheme = () => {
  return (
    <div id="stheme" className="w-full sticky h-full p-4 mt-20 ">
      <div className="w-full rounded-lg px-8 py-8   bg-custom-gray">
        <p className="text-4xl mb-6">Theme</p>
        <select
          data-choose-theme
          className="w-32 select bg-gray2 px-3 py-1 text-lg"
        >
          <option value="green">green</option>
          <option value="orange">orange</option>
          <option value="blue">blue</option>
          <option value="pink">pink</option>
        </select>
      </div>
    </div>
  );
};

export default Stheme;
