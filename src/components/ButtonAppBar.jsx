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
        {['Project List', 'Users list', 'Settings', 'Drafts', 'Project Data'].map((text, index) => (
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
                        sx={{ mr: 8, backgroundColor: '#030303' }}
                    > <MenuIcon />

                    <Drawer open={open} 
                        onClose={toggleDrawer(false)}>
                            {DrawerList}
                          
                    </Drawer>

                    </IconButton>

                     <img src={DIS_loigo} className="logo" alt="DIS logo" 
                            style={{ width: '300px', height: '100px', objectFit: 'contain' }}
                        />
                    <Typography variant="h6" component="div" sx={{  mr: 8, flexGrow:2, backgroundColor: '#ffffff', color: '#272727' }}> BIM Project viewer
                       
                    </Typography>

                    <Button sx={{
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        '&:hover': {
                            backgroundColor: '#b67171'
                        }
                    }}  startIcon={<AccountCircleIcon />}
                     >Login</Button>

                     
                </Toolbar>
            </AppBar>
        </Box>
    );
}