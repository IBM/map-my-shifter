import React, { useState } from "react";
import { TextInput, Button, Row, Column } from "@carbon/ibm-security";
import {
  Add24,
  Close24,
  Close16,
  ChevronUp24,
  ChevronDown24,
  Checkmark16,
  Edit16,
} from "@carbon/icons-react";
import {
  addDataSourceField,
  removeStixObject,
  removeMetadataObject,
  updateObjectName,
} from "../../store/actions/to_stix";
import { isValidObjectName } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import StixObjectBody from "./StixObjectBody";
import MetadataObjectBody from "./MetadataObjectBody";
import styles from "./to_stix.module.scss";

const ObjectHeader = ({ name, isOpen, setIsOpen, isStix }) => {
  const dispatch = useDispatch();
  const mappingObjects = isStix ? "stixObjects" : "metadataObjects";
  const objects = useSelector((state) => state.toStix[mappingObjects]);
  const [newName, setName] = useState(name);
  const [isEditingObjectName, setEditObjectName] = useState(false);
  const objectNameChangeHandler = () => {
    if (isValidObjectName(name, newName, objects)) {
      dispatch(updateObjectName(name, newName, isStix));
      setEditObjectName(false);
    }
  };

  return (
    <Row className={styles.object_item__header}>
      <span className={styles.expand_collapse__button}>
        {isOpen ? (
          <ChevronDown24
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        ) : (
          <ChevronUp24
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        )}
      </span>
      {isEditingObjectName ? (
        <>
          <Column sm={2}>
            <TextInput
              className={`bx--col ${styles.object_item__title}`}
              id={`${isStix}__${name}`}
              labelText={""}
              autoComplete={"off"}
              value={newName}
              invalid={!isValidObjectName(name, newName, objects)}
              invalidText={
                !newName
                  ? "Object name must contain at least one character."
                  : "Object name already exists."
              }
              onChange={(input) => {
                setName(input.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  objectNameChangeHandler();
                }
              }}
            />
          </Column>
          <Button
            kind="ghost"
            size="sm"
            renderIcon={Checkmark16}
            iconDescription="Submit new object name"
            hasIconOnly
            disabled={!isValidObjectName(name, newName, objects)}
            onClick={() => {
              objectNameChangeHandler();
            }}
          />
          <Button
            kind="ghost"
            size="sm"
            renderIcon={Close16}
            iconDescription="Cancel"
            hasIconOnly
            onClick={() => {
              setName(name);
              setEditObjectName(false);
            }}
          />
        </>
      ) : (
        <Column className={styles.object_item__title}>
          {name}

          <Button
            kind="ghost"
            size="sm"
            renderIcon={Edit16}
            iconDescription="Edit object name"
            hasIconOnly
            onClick={() => {
              setEditObjectName(true);
            }}
          />
        </Column>
      )}

      <Column className={styles.right_menu}>
        {isStix && (
          <Add24
            className={`${styles.object_item__btn}`}
            style={{
              marginRight: ".5rem",
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(addDataSourceField(name));
            }}
          />
        )}
        <Close24
          className={`${styles.object_item__btn}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            isStix
              ? dispatch(removeStixObject(name))
              : dispatch(removeMetadataObject(name));
          }}
        />
      </Column>
    </Row>
  );
};

const MappingObject = ({ objectKey, objectData, isStix }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={`bx--row ${styles.object_item__box}`}>
      <div className={`bx--col ${styles.object_item__content}`}>
        <ObjectHeader
          name={objectKey}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isStix={isStix}
        />
        {isOpen &&
          (isStix ? (
            <StixObjectBody objectKey={objectKey} sourceFields={objectData} />
          ) : (
            <MetadataObjectBody
              objectKey={objectKey}
              sourceFields={objectData}
            />
          ))}
      </div>
    </div>
  );
};

export default React.memo(MappingObject);
