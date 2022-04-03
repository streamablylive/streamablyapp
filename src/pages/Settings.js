import React from "react";
import Settingsright from "../components/setting/Settingsright";
import Sgeneral from "../components/setting/Sgeneral";
import { useIdentityContext } from "react-netlify-identity";
import Stheme from "../components/setting/Stheme";
import Smic from "../components/setting/Smic";
import Schange from "../components/setting/Schange";
import { Element } from "react-scroll";
const Settings = () => {
  const identity = useIdentityContext();

  return (
    <div className="w-full h-full flex flex-row-reverse items-center justify-between">
      <Settingsright i={identity} />
      <div id="contain" className="w-full h-full py-10 px-12 overflow-scroll ">
        <Element
          name="sgeneral"
          className="w-full h-full flex-col flex items-center"
        >
          <Sgeneral i={identity} />
        </Element>
        <Element
          name="stheme"
          className="w-full h-full flex-col flex items-center"
        >
          <Stheme i={identity} />
        </Element>
        <Element
          name="smic"
          className="w-full h-full flex-col flex items-center"
        >
          <Smic i={identity} />
        </Element>
        <Element
          name="schange"
          className="w-full h-full flex-col flex items-center"
        >
          <Schange i={identity} />
        </Element>
      </div>
    </div>
  );
};

export default Settings;
