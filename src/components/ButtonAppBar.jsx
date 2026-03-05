import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import DIS_loigo from '../assets/DIS_logo.png'
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Avatar from '@mui/material/Avatar';


export default function ButtonAppBar() {


  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleNavigation = (text) => {
    const routes = {
      'Project List': '/',
      'Users list': '/users',
      'Settings': '/settings',
      'Drafts': '/drafts',
      'Project Data': '/project-data'
    };
    navigate(routes[text]);
    setOpen(false);
  };



  const DrawerList = (
    <Box sx={{ width: 450 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>

        <img src={DIS_loigo} className="logo" alt="DIS logo"
          style={{ width: '100px', height: '40px', objectFit: 'contain' }}
        />

        <Divider />
        {['Project List', 'Users list', 'Settings', 'Drafts', 'Project Dashboard'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* ... rest of drawer */}
    </Box>
  );


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#fafafa' }}>

        <Toolbar sx={{ color: '#ffffff' }}>


          <IconButton size="large" edge="start" color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 8, backgroundColor: '#030303', '&:hover': { boxShadow: 8, transform: 'scale(1.09)' }, transition: 'all 0.2s ease', }}
          > <MenuIcon />

            <Drawer open={open}
              onClose={toggleDrawer(false)}>
              {DrawerList}

            </Drawer>
          </IconButton>


          

          <img src={DIS_loigo} className="logo" alt="DIS logo"
            style={{ width: '300px', height: '100px', objectFit: 'contain' }}
          />
          <Typography variant="h6" component="div" sx={{ mr: 8, flexGrow: 2, backgroundColor: '#ffffff', color: '#272727' }}> BIM Project viewer

          </Typography>


          
          <Box  sx={{ alignItems: 'flex-start', marginLeft: 1, mr: 8, '&:hover': { boxShadow: 3, transform: 'scale(1.05)' }, transition: 'all 0.2s ease' }}>
            <Button sx={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: '#b67171'
              }
            }} startIcon={<AccountCircleIcon />}
            >Login</Button>
          </Box>



          <Avatar sx={{
            backgroundColor: '#000000', border: '2px solid white', boxShadow: 2, border: '2px solid #1976d2',
            cursor: 'pointer', '&:hover': { boxShadow: 10, transform: 'scale(1.3)',  border: '3px solid #1976d2' },
            transition: 'all 0.2s ease'
          }}
             />

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 1 }}>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem' }}>
              Alex Lopez
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.7rem' }}>
              Admin
            </Typography>
          </Box>


        </Toolbar>
      </AppBar>
    </Box>
  );
}