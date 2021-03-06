import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { selectCurrentUser } from 'modules/users/selectors';


const useStyles = makeStyles(theme => ({
  menuItemIcon: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 8,
    },
  },
  navLink: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));

const AppMenu = () => {

  const s = useStyles();
  const currentUser = useSelector(selectCurrentUser);

  return (
    <List>
      <NavLink className={s.navLink} to="/">
        <ListItem button>
          <ListItemIcon >
            <HomeIcon className={s.menuItemIcon} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </NavLink>
      {currentUser.role === 'customer' &&
        <NavLink className={s.navLink} to="/brands">
          <ListItem button>
            <ListItemIcon >
              <DashboardIcon className={s.menuItemIcon} />
            </ListItemIcon>
            <ListItemText primary="Brands" />
          </ListItem>
        </NavLink>
      }
      {currentUser.role === 'brand' &&
        <NavLink className={s.navLink} to="/customers">
          <ListItem button>
            <ListItemIcon >
              <PeopleIcon className={s.menuItemIcon} />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
        </NavLink>
      }
    </List>
  );
};

export default AppMenu;
