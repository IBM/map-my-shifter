import React from "react";
import { useSelector } from "react-redux";
import MappingObject from "./MappingObject";
import Minimap from "./Minimap";
import { MAPPING_TYPE } from "../../global/constants";
import { Row, Column } from "@carbon/ibm-security";

const MappingObjects = ({ type }) => {
  const isStix = type === MAPPING_TYPE.OBJECT;
  const mappingObjects = isStix ? "stixMapping" : "metadataMapping";
  const mapping = useSelector((state) => state.toStix[mappingObjects]);
  const isMappingEmpty = Object.keys(mapping).length === 0;

  if (isMappingEmpty) {
    return (
      <Row>
        <Column>
          <p style={{ paddingTop: "1rem" }}>
            There are currently no {type}s to show. Click the “New {type}”
            button to start mapping or load configuration.
          </p>
        </Column>
      </Row>
    );
  }

  return (
    <Row>
      <Minimap isStix={isStix} />
      <Column sm={3}>
        {Object.keys(mapping).map((o) => {
          return (
            <div id={`${o}`} key={`${o}`}>
              <MappingObject
                key={`${o}`}
                objectKey={o}
                objectData={mapping[o]}
                isStix={isStix}
              />
            </div>
          );
        })}
      </Column>
    </Row>
  );
};

export default MappingObjects;
