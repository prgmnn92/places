import React from 'react';

import { Paper } from '@material-ui/core';

import './info-paper.styles.scss';

const InfoPaper = ({ children }) => (
	<Paper className="info-paper" elevation={3}>
		<h3>{children}</h3>
	</Paper>
);

export default InfoPaper;
