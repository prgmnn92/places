import React from "react";

import { Paper } from "@material-ui/core";

import { ReactComponent as EarthIcon } from "../../assets/earth.svg";

import "./info-paper.styles.scss";

const InfoPaper = ({ children }) => (
  <Paper className="info-paper" elevation={3}>
    <h3>{children}</h3>
    <EarthIcon className="earth-icon" />
  </Paper>
);

export default InfoPaper;
