// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper, CircularProgress, Box } from '@mui/material';
import KPICard from './KPICard';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './Dashboard.css'; // Importing custom CSS

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/metrics/summary')
      .then((response) => {
        setMetrics(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h5" color="error" align="center" sx={{ mt: 4 }}>
        Failed to load data
      </Typography>
    );
  }

  return (
    <div className="dashboard-container">
      <Typography className="title">ICAI 2024 Election Dashboard</Typography>

      <Grid container spacing={3} className="grid-layout">
        {/* References Data Section */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper className="section">
            <Typography variant="h6">References Data</Typography>
            <KPICard label="Total References" value={metrics.total_references} icon="fa-book" />
            <Typography variant="subtitle2" align="center">Met</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <KPICard label="Has Reference" value={metrics.met_with_references} icon="fa-check-circle" />
              </Grid>
              <Grid item xs={6}>
                <KPICard label="No Reference" value={metrics.met_no_references} icon="fa-times-circle" />
              </Grid>
            </Grid>
            <Typography variant="subtitle2" align="center">Not Met</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <KPICard label="Has Reference" value={metrics.not_met_with_references} icon="fa-ban" />
              </Grid>
              <Grid item xs={6}>
                <KPICard label="No Reference" value={metrics.not_met_no_references} icon="fa-times" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* MET Data Section */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper className="section">
            <Typography variant="h6">MET Data</Typography>
            <KPICard label="Met in Both Years" value={metrics.met_both_years} icon="fa-calendar-alt" />
            <KPICard label="Met in 2024 Only" value={metrics.met_2024_only} icon="fa-calendar" />
            <KPICard label="Met in 2021 Only" value={metrics.met_2021_only} icon="fa-calendar-day" />
            <KPICard label="Not Met Both Years" value={metrics.not_met_both_years} icon="fa-calendar-times" />
          </Paper>
        </Grid>

        {/* Voters & Met Data Section */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper className="section">
            <Typography variant="h6">Voters & Met Data</Typography>
            <KPICard label="Total Met 2024" value={metrics.total_met_2024} icon="fa-users" />
            <KPICard label="Total Met 2021" value={metrics.total_met_2021} icon="fa-user-check" />
            <KPICard label="Total Voters" value={metrics.total_voters} icon="fa-chart-bar" />
            <Typography variant="subtitle2" align="center">Voted 2021</Typography>
            <div className="plot-container">
              <Plot
                data={[
                  {
                    x: ['N', 'Y', 'New', 'Abroad', 'Postal'],
                    y: [49705, 49107, 30860, 2283, 449],
                    type: 'bar',
                    marker: { color: 'green' },
                  },
                ]}
                layout={{ title: 'Voted 2021', width: 300, height: 300 }}
              />
            </div>
          </Paper>
        </Grid>

        {/* ViShare Data Section */}
        <Grid item xs={12} md={6} lg={3}>
          <Paper className="section">
            <Typography variant="h6">ViShare Data</Typography>
            <KPICard label="Total ViShare" value={metrics.total_vishare} icon="fa-network-wired" />
            <Typography variant="subtitle2" align="center">MET ViShare</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <KPICard label="ViShare" value={metrics.met_with_vishare} icon="fa-check" />
              </Grid>
              <Grid item xs={6}>
                <KPICard label="No ViShare" value={metrics.met_no_vishare} icon="fa-times" />
              </Grid>
            </Grid>
            <Typography variant="subtitle2" align="center">Not MET ViShare</Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <KPICard label="ViShare" value={metrics.not_met_with_vishare} icon="fa-check" />
              </Grid>
              <Grid item xs={6}>
                <KPICard label="No ViShare" value={metrics.not_met_no_vishare} icon="fa-times" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
