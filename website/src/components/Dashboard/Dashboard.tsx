"use client"
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data
const attendanceData = [
  { name: 'Presents', value: 75, color: '#4caf50' },
  { name: 'Absents', value: 15, color: '#f44336' },
  { name: 'Leaves', value: 10, color: '#ff9800' },
];

const monthlyAttendance = [
  { month: 'Jan', Presents: 20, Absents: 2, Leaves: 1 },
  { month: 'Feb', Presents: 18, Absents: 3, Leaves: 1 },
  { month: 'Mar', Presents: 22, Absents: 1, Leaves: 0 },
];

const AttendanceDashboard: React.FC = () => {
  return ( 
    <Box sx={{ flexGrow: 1, padding: 3, marginTop: {
      xs: 2,     
      sm: 3,     
      md: 4,      
      lg: 5,      
    }, }}>
      <Grid container spacing={3}>
        {/* Attendance Summary */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Attendance Overview
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={attendanceData} dataKey="value" outerRadius={80}>
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Grid container spacing={1}>
              {attendanceData.map((entry, index) => (
                <Grid item xs={4} key={index}>
                  <Typography variant="body2">{entry.name}</Typography>
                  <Typography variant="h6" sx={{ color: entry.color }}>
                    {entry.value}%
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Attendance Counts */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Attendance
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyAttendance}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Presents" fill="#4caf50" />
                <Bar dataKey="Absents" fill="#f44336" />
                <Bar dataKey="Leaves" fill="#ff9800" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Detailed Statistics */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Detailed Attendance Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Typography variant="body2">Presents</Typography>
                <Typography variant="h5" color="success.main">
                  75
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2">Absents</Typography>
                <Typography variant="h5" color="error.main">
                  15
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2">Leaves</Typography>
                <Typography variant="h5" color="warning.main">
                  10
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2">Total Classes</Typography>
                <Typography variant="h5">
                  100
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttendanceDashboard;
