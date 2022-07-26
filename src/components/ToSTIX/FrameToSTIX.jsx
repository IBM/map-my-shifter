import React from "react";
import { useSelector } from "react-redux";
import { saveJsonToDisk } from "../STIX/utils";
import styles from "./to_stix.module.scss";
import ToSTIX from ".";
import Import from "../Import/Import";
import Export from "../Export/Export";
import StatisticsButton from "../StatisticsButton/StatisticsButton";
import { stateMappingToShifterMapping, loadJsonFromDisk } from "./utils";
import {
  updateMappingsFromFile,
  clearMappings,
} from "../../store/actions/to_stix";
import {useState} from 'react';

const FrameToSTIX = () => {
  const stixMapping = useSelector((state) => state.toStix.stixMapping);
  const metadataMapping = useSelector((state) => state.toStix.metadataMapping);
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col--sm-1">
          <h1 className="page-title">{"To STIX"}</h1>
        </div>
        <div className="bx--col">
          <div className="bx--row" style={{ float: "right" }}>
            <div className="bx--col--sm">
              <Import
                clearMappings={clearMappings}
                loadJsonFromDisk={loadJsonFromDisk}
                updateMappingsFromFile={updateMappingsFromFile}
              />
            </div>
            <div className="bx--col--sm">
              <Export
                saveJsonToDisk={saveJsonToDisk}
                stateMappingToShifterMapping={stateMappingToShifterMapping}
                stixMapping={stixMapping}
                metadataMapping={metadataMapping}
              />
            </div>
            <div  className="bx--col--sm">  
              <StatisticsButton
              />
            </div>
          </div>
        </div>
      </div>
      <ToSTIX/>
    </div>
  );
};

export default FrameToSTIX;
