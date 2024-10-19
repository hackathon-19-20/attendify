'use client'
import { useState } from 'react';
import { Box, Tabs, Tab, Typography, Grid, Paper, Button } from '@mui/material';
import { format, isToday } from 'date-fns';


const timetable = [
  { day: '2024-10-18', classes: ['Electrical Machines-II', 'Microcontroller-Microprocessor', 'Power Electronics'] },
  { day: '2024-10-17', classes: ['Electrical Machines-II', 'Power System Analysis', 'Renewable Energy'] },

];

const Attendance = () => {
  const [tabIndex, setTabIndex] = useState(0);
  

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const markAttendance = (day: string, subject: string, status: string) => {
    console.log(`Marked ${subject} on ${day} as ${status}`);
   
  };

  return (
    <Box sx={{ width: '100%', marginTop: {
      xs: 2,     
      sm: 3,     
      md: 4,      
      lg: 5,      
    } }}>
     
      <Tabs value={tabIndex} onChange={handleChange} centered>
        <Tab label="Today's Classes" />
        <Tab label="Previous Classes" />
      </Tabs>
      
      <TabPanel value={tabIndex} index={0}>
        {/* Today's Classes */}
        <Typography variant="h6">Today's Classes - {format(new Date(), 'yyyy-MM-dd')}</Typography>
        <Grid container spacing={2}>
          {timetable.filter(day => isToday(new Date(day.day))).map((day) =>
            day.classes.map((subject, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Paper elevation={3} sx={{ padding: '16px' }}>
                  <Typography variant="h6">{subject}</Typography>
                  <Button variant="contained" color="primary" onClick={() => markAttendance(day.day, subject, 'Present')}>Present</Button>
                  <Button variant="contained" color="secondary" onClick={() => markAttendance(day.day, subject, 'Absent')}>Absent</Button>
                  <Button variant="contained" color="inherit" onClick={() => markAttendance(day.day, subject, 'Leave')}>Leave</Button>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        {/* Previous Classes */}
        {timetable.filter(day => !isToday(new Date(day.day))).map((day, idx) => (
          <div key={idx}>
            <Typography variant="h6">{day.day}</Typography>
            <Grid container spacing={2}>
              {day.classes.map((subject, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Paper elevation={3} sx={{ padding: '16px' }}>
                    <Typography variant="h6">{subject}</Typography>
                    <Button variant="contained" color="primary" onClick={() => markAttendance(day.day, subject, 'Present')}>Present</Button>
                    <Button variant="contained" color="secondary" onClick={() => markAttendance(day.day, subject, 'Absent')}>Absent</Button>
                    <Button variant="contained" color="inherit" onClick={() => markAttendance(day.day, subject, 'Leave')}>Leave</Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </TabPanel>
    </Box>
  );
};

// Tab Panel Component for Conditional Rendering
const TabPanel = (props: { children: React.ReactNode; value: number; index: number }) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default Attendance;
