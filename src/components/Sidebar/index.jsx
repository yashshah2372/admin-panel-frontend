import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Navbar from '../Navbar';
import Lead from "../../assets/images/leadManagement.png";
import Permission from "../../assets/images/Permission.png";
import Ads from "../../assets/images/Ads.png";
import { Link ,Navigate, NavLink} from 'react-router-dom'

const drawerWidth = 240;

const sidebarData = [
  {
    label: 'Dashboard',
    link: '/admin',
    icon: Lead
  },
  {
    label: 'Edit Profile',
    link: '/edit-profile',
    icon: Permission
  },
  {
    label: 'Property',
    link: '/property',
    icon: Ads
  },
  {
    label: 'User Management',
    link: '/user-management',
    icon: Permission
  },
  {
    label: 'Lead Management',
    link: '/lead-management',
    icon: Lead
  },
  {
    label: 'Permission Mngmnt',
    link: '/permission',
    icon: Permission
  },
  {
    label: 'Ads Mngmnt',
    link: '/ads',
    icon: Ads
  }
]

export default function Sidebar() {

    const loggedIn = false;

  return (
    <Box sx={{ display: 'flex',zIndex: 10 }}>
      <CssBaseline />
      <Drawer
        sx={{
          display: loggedIn ? 'none' : '',
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Toolbar />
        <List>
          {sidebarData.map((val, index) => (
            <NavLink key={val.label} to={val.link} style={{textDecoration: 'none',color: '#000'}} >
            <ListItem  disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <img src={val.icon}   />
                </ListItemIcon>
                <ListItemText primary={val.label} />
              </ListItemButton>
            </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />
        <List>
        </List>
      </Drawer>
    </Box>
  );
}
