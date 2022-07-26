import React from "react";
import { useSelector } from "react-redux";
import MappingTabs from "./MappingTabs";
import Statistics from "./Statistics";

const ToSTIX = () => {
  const stixMapping = useSelector((state) => state.toStix.stixMapping);

  return (
    <>
      <div className="bx--grid">
        <div className="bx--row">
          <MappingTabs />
          <Statistics stixMapping={stixMapping} />
        </div>
      </div>
    </>
  );
};

export default ToSTIX;
