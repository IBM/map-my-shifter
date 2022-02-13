import React from "react";
import { Add32 } from "@carbon/icons-react";
import { Button, Row, Column } from "@carbon/ibm-security";
import { useDispatch, useSelector } from "react-redux";
import { openNewObjectModal } from "../../store/actions/to_stix";
import MappingObjects from "./MappingObjects";
import SelectFieldModal from "./SelectFieldModal";
import MoveFieldToObjectModal from "./MoveFieldToObjectModal";
import NewObjectModal from "./NewObjectModal";
import { MAPPING_TYPE } from "../../global/constants";
import styles from "./to_stix.module.scss";

const MappingTab = ({ type, addingFunction }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.toStix.isNewObjectModalOpen);
  const isStix = type === MAPPING_TYPE.OBJECT;

  return (
    <>
      <NewObjectModal isOpen={isOpen} add={addingFunction} type={type} />
      {isStix && (
        <>
          <SelectFieldModal />
          <MoveFieldToObjectModal />
        </>
      )}
      <Row>
        <Column className={styles.mapping_objects__top_menu}>
          <Button
            renderIcon={Add32}
            onClick={() => {
              dispatch(openNewObjectModal());
            }}
          >
            New {type}
          </Button>
        </Column>
      </Row>

      <MappingObjects type={type} />
    </>
  );
};

export default React.memo(MappingTab);
