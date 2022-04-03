import React from "react";

const Schange = () => {
  return (
    <div id="schange" className="w-full h-full sticky p-4 mt-20">
      <div className="w-full rounded-lg px-4 py-8 flex  items-center space-x-12  bg-custom-gray">
        <select data-choose-theme>
          <option value="">Default</option>
          <option value="green">green</option>
          <option value="orange">orange</option>
        </select>
      </div>
    </div>
  );
};

export default Schange;
