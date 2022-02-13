import React from "react";
import { Row, Column } from "@carbon/ibm-security";
import SourceField from "./SourceField";
import styles from "./to_stix.module.scss";

const StixObjectBody = ({ sourceFields, objectKey }) => {
  const isEmptyObject = Object.keys(sourceFields).length === 0;

  if (isEmptyObject) {
    return (
      <Row>
        <Column>
          There are currently no data-source fields mapped. Click the "+" button
          to add your first data-source field.
        </Column>
      </Row>
    );
  }

  return Object.keys(sourceFields).map((fieldId) => {
    return (
      <SourceField
        isStix={true}
        key={fieldId}
        objectKey={objectKey}
        fieldId={fieldId}
        fieldData={sourceFields[fieldId]}
      />
    );
  });
};

export default React.memo(StixObjectBody);
