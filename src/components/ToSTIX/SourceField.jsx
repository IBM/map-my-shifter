import React, { useMemo } from "react";
import {
  removeDataSourceField,
  updateDataSourceField,
  openMoveFieldToObjectModal,
} from "../../store/actions/to_stix";
import { SubtractAlt20, WatsonHealthStackedMove20 } from "@carbon/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, Row, Column } from "@carbon/ibm-security";
import styles from "./to_stix.module.scss";
import MappedFieldsTable from "./MappedFieldsTable";

const SourceFieldHeader = ({ fieldId, objectKey, fieldData }) => {
  const dispatch = useDispatch();
  const stixObjects = useSelector((state) => state.toStix.stixObjects);
  const fieldName = fieldData.field;
  const allAvailableObjectKeys = useMemo(() => {
    return stixObjects.filter((o) => o !== objectKey);
  }, [objectKey, stixObjects]);
  const disableMovingField = allAvailableObjectKeys.length === 0;

  return (
    <Row className={styles.source_field__header}>
      <div>
        <SubtractAlt20
          style={{ marginLeft: "1rem" }}
          className={`${styles.object_item__btn}`}
          onClick={() => {
            dispatch(removeDataSourceField(objectKey, fieldId));
          }}
        />
      </div>
      <Column>
        <TextInput
          labelText={"Source field name"}
          id={`${fieldId}`}
          onChange={(e) => {
            dispatch(updateDataSourceField(objectKey, fieldId, e.target.value));
          }}
          value={fieldName}
          size={"sm"}
        />
      </Column>
      <div>
        <WatsonHealthStackedMove20
          style={{ marginRight: "1rem", border: 0 }}
          className={
            disableMovingField
              ? `${styles.object_item__btn_disable}`
              : `${styles.object_item__btn}`
          }
          aria-label="Move field to object"
          onClick={() =>
            disableMovingField
              ? {}
              : dispatch(
                  openMoveFieldToObjectModal(objectKey, fieldId, fieldName)
                )
          }
        />
      </div>
    </Row>
  );
};

const SourceField = ({ objectKey, fieldId, fieldData, isStix }) => {
  return (
    <div key={fieldId} className={styles.source_field__box}>
      <SourceFieldHeader
        objectKey={objectKey}
        fieldId={fieldId}
        fieldData={fieldData}
      />
      <Row className={styles.source_field__table}>
        <Column>
          <MappedFieldsTable
            isStix={isStix}
            objectKey={objectKey}
            sourceFieldId={fieldId}
            sourceFieldData={fieldData}
          />
        </Column>
      </Row>
    </div>
  );
};

export default React.memo(SourceField);
