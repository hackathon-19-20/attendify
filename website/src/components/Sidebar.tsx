import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from 'next/link';
import { useTheme } from 'next-themes';
const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const { theme, resolvedTheme } = useTheme(); // Get the current theme

  const isDarkMode = theme === 'dark' || resolvedTheme === 'dark'; // Check if dark mode is active

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
    { text: 'Timetable', icon: <CalendarTodayIcon />, href: '/timetable' },
    { text: 'Attendance', icon: <CheckCircleIcon />, href: '/attendance' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: isDarkMode ? '#333' : '#fff',  // Set background based on theme
          color: isDarkMode ? '#fff' : '#000',   },
      }}
    >
      <Toolbar />
      <div>
        <List>
          {menuItems.map((item) => (
            <ListItem component={Link} href={item.href} key={item.text}>
              <ListItemIcon sx={{ color: isDarkMode ? '#fff' : '#000'}}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </Drawer>
  );
};

export default Sidebar;
