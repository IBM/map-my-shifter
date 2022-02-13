import React from "react";
import { Grid, Row, Column, Link } from "carbon-components-react";
import { useNavigate } from "react-router-dom";
import styles from "./headerSection.module.scss";

const HeaderSection = () => {
  const navigate = useNavigate();
  const goTo = (link) => {
    navigate(link);
  };
  return (
    <Grid>
      <Row>
        <Column>
          <Row>
            <Link onClick={() => goTo("/")} className={styles.tile__btn}>
              Map My Shifter
            </Link>
            <div className={styles.tile__separator}>|</div>
            <Link onClick={() => goTo("/about")} className={styles.tile__btn}>
              About
            </Link>
            <div className={styles.tile__separator}>|</div>
            <Link
              onClick={() => goTo("/from_stix")}
              className={styles.tile__btn}
            >
              From STIX
            </Link>
            <div className={styles.tile__separator}>|</div>
            <Link onClick={() => goTo("/to_stix")} className={styles.tile__btn}>
              To STIX
            </Link>
          </Row>
        </Column>
      </Row>
    </Grid>
  );
};

export default HeaderSection;
