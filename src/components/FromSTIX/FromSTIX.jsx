import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import SelectFields from "./SelectFields";
import Mapping from "./Mapping";
import Statistics from "./Statistics";
import { getDataForStatistics, getOfficialFieldsFromMapping } from "./utils";
import { requiredStixFields } from "../../global/requiredStixFields";

const FromSTIX = ({isShown}) => {
  const stixMapping = useSelector((state) => state.fromStix.stixMapping);
  const stixVersion = useSelector((state) => state.stix.stixVersion);
  const stixFields = useSelector((state) => state.stix.stixFields);
  const requiredFields = requiredStixFields[stixVersion];

  const officialStixFields = stixFields.reduce((acc, field) => {
    return {...acc, [field.type]: field.items.map((item) => item.name)};
  }, {});

  const officialStixKeys = useMemo(
    () =>
      Object.assign(
        {},
        ...Array.from(Object.keys(officialStixFields), (value) => ({
          [value]: new Set(),
        }))
      ),
    [officialStixFields]
  );

  const mappingOfficialFields = getOfficialFieldsFromMapping(
    stixMapping,
    officialStixFields,
    officialStixKeys
  );

  const [officialObjectsCount, requiredObjectsCount] = getDataForStatistics(
    mappingOfficialFields,
    requiredFields
  );

  // const [isShown, setIsShown] = useState(false);


  // const handleShowHideStatistics = () => {
  //   setIsShown(current => !current);
  // };
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-1">
          <SelectFields officialFields={mappingOfficialFields} />
        </div>
        <div className="bx--col">
          <Mapping />
        </div>
        {isShown &&
        <div className="bx--col-sm-1">
          <div className="bx--row">
            <div className="bx--col-sm-4">
              <Statistics
                officialObjectsCount={officialObjectsCount}
                requiredObjectsCount={requiredObjectsCount}
              />
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default FromSTIX;
