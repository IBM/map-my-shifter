import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./from_stix.module.scss";
import StatisticObject from "./StatisticObject";
import { getNumOfFields } from "./utils";

const Statistics = ({ officialObjectsCount, requiredObjectsCount }) => {
  const isStatisticsShown = useSelector((state) => state.toStix.isStatisticsShown);
  const stixFields = useSelector((state) => state.stix.stixFields);
  const [officialFieldsCount, requiredFieldsCount] = useMemo(
    () => getNumOfFields(stixFields),
    [stixFields]
  );

  return (
    <>
    {isStatisticsShown &&
        <div className="bx--col-sm-1">
          <div className="bx--row">
            <div className="bx--col-sm-4">
              <div className="bx--row">
                <div className={"bx--col"}>
                  <h4 className={`${styles.section_title}`}>Coverage Statistics</h4>
                </div>
              </div>

              <div className="bx--row" style={{ marginBottom: ".75rem" }}>
                <div className={`bx--col ${styles.statistics__col}`}>
                  <div className="bx--row">
                    <StatisticObject
                      officialObjectsCount={officialObjectsCount}
                      requiredObjectsCount={requiredObjectsCount}
                      officialFieldsCount={officialFieldsCount}
                      requiredFieldsCount={requiredFieldsCount}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default React.memo(Statistics);
