import React from "react";
import { Modal } from "@carbon/ibm-security";
import { useDispatch, useSelector } from "react-redux";
import { closeSelectFieldModal } from "../../store/actions/to_stix";
import AddFields from "../STIX/AddFields";
import {updateSearchFieldValue} from "../../store/actions/stix";

const SelectFieldModal = () => {
  const dispatch = useDispatch();
  const selectFieldModalData = useSelector(
    (state) => state.toStix.selectFieldModalData
  );
  const isOpen = !(selectFieldModalData === null);

  return (
    <Modal
      shouldSubmitOnEnter={true}
      open={isOpen}
      onRequestClose={() => {
        dispatch(closeSelectFieldModal());
        dispatch(updateSearchFieldValue(""));
      }}
      modalHeading={"Select field"}
      hasForm={false}
      passiveModal={true}
    >
      {isOpen && <AddFields fieldNameToUpdate={"key"} />}
    </Modal>
  );
};

export default SelectFieldModal;
