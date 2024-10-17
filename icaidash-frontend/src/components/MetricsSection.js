import React from 'react';
import { Grid } from '@mui/material';
import KPICard from './KPICard';

const MetricsSection = ({ metrics }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <KPICard label="Total References" value={metrics.total_references} icon="fa-book" />
    </Grid>
    <Grid item xs={6}>
      <KPICard label="Total Met 2021" value={metrics.total_met_2021} icon="fa-user-check" />
    </Grid>
    <Grid item xs={6}>
      <KPICard label="Total Met 2024" value={metrics.total_met_2024} icon="fa-users" />
    </Grid>
    <Grid item xs={6}>
      <KPICard label="Total Voters" value={metrics.total_voters} icon="fa-chart-bar" />
    </Grid>
  </Grid>
);

export default MetricsSection;
