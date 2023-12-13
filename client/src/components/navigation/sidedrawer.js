import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider, ListItemIcon, toggleButtonClasses } from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HouseIcon from "@mui/icons-material/House";
// import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ContactPageIcon from "@mui/icons-material/ContactPage";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";


const SimpleDrawer = ({ users, Signout }) => {
  const [open, setOpen] = useState(false);
 
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { route: "Home", icon: <HouseIcon />, to: "/" },
    //  { route: 'About', icon: <AssignmentIndIcon />, to: '/about' },
    { route: "Contact", icon: <ContactPageIcon />, to: "/contact" }
  ];
  const signIn = [{ route: "Sign in", icon: <VpnKeyIcon />, to: "/auth" }];
  const dividerList = [
    { route: "Sign Out", icon: <ExitToAppIcon />},
    { route: "Dashboard", icon: <DashboardIcon />},
  ];
  const list = (
    <List>
      {menuItems.map((item, index) => (
        <ListItem
          button
          key={index}
          component={RouterLink}
          to={item.to}
          onClick={() => toggleDrawer(false)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.route} />
        </ListItem>
      ))}

      <>
        {users.auth ? (
          <>
            <Divider style={{ borderTop: "3px solid lightgrey" }} />
                      <ListItem
                          button
                          component={RouterLink}
                          to="/dashboard"
                          onClick={() => toggleDrawer(false)}
                      >
                          <ListItemIcon>
                              <DashboardIcon />
                          </ListItemIcon>
                          <ListItemText primary={'Dashbard'} />
                      </ListItem>
                      <ListItem
                          button
                          onClick={() => {
                              alert('sign out')
                              Signout()
                              setOpen(false)
                              navigate("/")
                          }}
                      >
                          <ListItemIcon>
                              <VpnKeyIcon />
                          </ListItemIcon>
                          <ListItemText primary="Sign out" />
                      </ListItem>

          </>
        ) : (
          signIn.map((item, index) => (
            <ListItem
              button
              key={index}
              component={RouterLink}
              to={item.to}
              onClick={() => toggleDrawer(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.route} />
            </ListItem>
          ))
        )}
      </>
    </List>
  );

  return (
    <div>
      <Button onClick={toggleDrawer}>
        <MenuOpenIcon style={{ fontSize: "2rem" }} />
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        style={{ width: "400px" }}
      >
        {list}
      </Drawer>
    </div>
  );
};

export default SimpleDrawer;
