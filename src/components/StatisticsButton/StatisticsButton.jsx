import React from "react";
import { Button } from "@carbon/ibm-security";
import { useDispatch, useSelector } from "react-redux";
import styles from "./statisticsbutton.module.scss";
import {updateStatistics} from "../../store/actions/to_stix";

const StatisticsButton = () => {
  const dispatch = useDispatch();
  const isStatisticsShown = useSelector((state) => state.toStix.isStatisticsShown);
  console.log(isStatisticsShown);
  return (
    <Button
      kind="tertiary"
      size="sm"
      className={styles.statistics__btn}
      onClick={() => {
        dispatch(updateStatistics(!isStatisticsShown));
      }}
    >
      {isStatisticsShown? "Hide Statistics" : "Show Statistics"}
    </Button>
    
  );
};


export default React.memo(StatisticsButton);
