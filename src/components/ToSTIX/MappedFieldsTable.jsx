import React from "react";
import { Add20 } from "@carbon/icons-react";
import { addStixField, addMetadataField } from "../../store/actions/to_stix";
import { useDispatch } from "react-redux";
import MappedField from "./MappedField";
import { Button, Row, Column } from "@carbon/ibm-security";

const MappedFieldsTableBody = ({
  objectKey,
  sourceFieldId,
  fieldsData,
  isStix,
}) => {
  return fieldsData.map((mappedField) => {
    const mappedFieldTransformer = mappedField?.transformer;
    const mappedFieldReferences =
      mappedField.references && mappedField.references.length !== 0
        ? mappedField.references
        : [];
    return (
      <MappedField
        isStix={isStix}
        key={`${objectKey}_${mappedField.id}`}
        sourceFieldId={sourceFieldId}
        objectKey={objectKey}
        mappedFieldId={mappedField.id}
        mappedFieldKey={mappedField.key}
        mappedFieldTransformer={mappedFieldTransformer}
        mappedFieldReferences={mappedFieldReferences}
      />
    );
  });
};

const MappedFieldsTable = ({
  objectKey,
  sourceFieldId,
  sourceFieldData,
  isStix,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <MappedFieldsTableBody
        key={`${objectKey}_${sourceFieldId}`}
        isStix={isStix}
        objectKey={objectKey}
        sourceFieldId={sourceFieldId}
        fieldsData={isStix ? sourceFieldData.mapped_to : sourceFieldData}
      />

      <Row style={{ marginBottom: "1rem" }}>
        <Column>
          <Button
            renderIcon={Add20}
            kind="secondary"
            size="sm"
            onClick={() => {
              isStix
                ? dispatch(addStixField(objectKey, sourceFieldId, ""))
                : dispatch(addMetadataField(objectKey, ""));
            }}
          >
            Add {isStix ? "STIX field" : "key"}
          </Button>
        </Column>
      </Row>
    </>
  );
};

export default MappedFieldsTable;
