import React from "react";
import styles from "./to_stix.module.scss";
import {
  openSelectFieldModal,
  removeStixField,
  removeMetadataField,
  updateStixField,
  updateMetadataField,
  addStixField,
  addMetadataField,
} from "../../store/actions/to_stix";
import { ComboBox, TextInput, Row, Column, Button } from "@carbon/ibm-security";
import { useDispatch } from "react-redux";
import transformers from "../../global/transformers";
import { Add20, Delete20, List20 } from "@carbon/icons-react";
import ReferencesSelector from "./ReferencesSelector";

const MappedField = ({
  isStix,
  objectKey,
  sourceFieldId,
  mappedFieldId,
  mappedFieldKey,
  mappedFieldTransformer,
  mappedFieldReferences,
}) => {
  const dispatch = useDispatch();
  return (
    <div key={mappedFieldId} className={styles.object_item__field}>
      <Row>
        <div>
          <Delete20
            className={`${styles.object_item__btn}`}
            onClick={() => {
              isStix
                ? dispatch(
                    removeStixField(objectKey, sourceFieldId, mappedFieldId)
                  )
                : dispatch(removeMetadataField(objectKey, mappedFieldId));
            }}
          />
        </div>
        <Column>
          <Row style={{ marginBottom: ".5rem" }}>
            <Column>
              <TextInput
                id={`${mappedFieldId}`}
                labelText={isStix ? "STIX field" : "Key"}
                onChange={(e) => {
                  isStix
                    ? dispatch(
                        updateStixField(
                          e.target.value,
                          "key",
                          objectKey,
                          sourceFieldId,
                          mappedFieldId
                        )
                      )
                    : dispatch(
                        updateMetadataField(
                          e.target.value,
                          "key",
                          objectKey,
                          mappedFieldId
                        )
                      );
                }}
                size={"sm"}
                value={mappedFieldKey}
              />
            </Column>
            {isStix && (
              <div>
                <Button
                  renderIcon={List20}
                  kind="ghost"
                  onClick={() => {
                    dispatch(
                      openSelectFieldModal(
                        objectKey,
                        sourceFieldId,
                        mappedFieldId
                      )
                    );
                  }}
                >
                  From list
                </Button>
              </div>
            )}
          </Row>

          <Row>
            <Column>
              <ComboBox
                id={`ComboBox_${mappedFieldId}`}
                size={"sm"}
                placeholder={"Search Transformer"}
                ariaLabel="transformers_combobox"
                items={transformers}
                selectedItem={
                  mappedFieldTransformer ? mappedFieldTransformer : null
                }
                onChange={(e) => {
                  isStix
                    ? dispatch(
                        updateStixField(
                          e.selectedItem,
                          "transformer",
                          objectKey,
                          sourceFieldId,
                          mappedFieldId
                        )
                      )
                    : dispatch(
                        updateMetadataField(
                          e.selectedItem,
                          "transformer",
                          objectKey,
                          mappedFieldId
                        )
                      );
                }}
              />
            </Column>
            <Column>
              {isStix && (
                <ReferencesSelector
                  objectKey={objectKey}
                  sourceFieldId={sourceFieldId}
                  mappedFieldId={mappedFieldId}
                  selectedReferences={mappedFieldReferences}
                />
              )}
            </Column>
          </Row>
        </Column>
      </Row>
    </div>
  );
};

export default React.memo(MappedField);
