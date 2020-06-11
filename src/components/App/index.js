import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToApp from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import AppMenu from 'components/AppMenu';
// import BrandPage from 'components/BrandPage';
// import BrandsPage from 'components/BrandsPage';
import LogInPage from 'components/LogInPage';
import SignUpPage from 'components/SignUpPage';
import { loadBrands } from 'modules/brands/actions';
import { selectAllBrands } from 'modules/brands/selectors';
import { loadCustomers } from 'modules/customers/actions';
import { selectAllCustomers } from 'modules/customers/selectors';
import { logOut } from 'modules/users/actions';
import { selectCurrentUser } from 'modules/users/selectors';
import { useLocalStorage } from 'utils/hooks';


const getAppTitle = (pathname) => {
  switch (pathname) {
    case '/':
      return 'Dashboard';
    case '/brands':
      return 'Dashboard - Brands';
    case '/customers':
      return 'Dashboard - Customers';
    default:
      return 'Dashboard';
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    paddingTop: 64,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const App = () => {

  const s = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const currentUser = useSelector(selectCurrentUser);
  const [isMenuOpen, setIsMenuOpen] = useLocalStorage('isAppMenuOpen', true);

  const brands = useSelector(selectAllBrands);
  const customers = useSelector(selectAllCustomers);
  useEffect(() => {
    // load initial brands and customers
    dispatch(loadBrands());
    dispatch(loadCustomers());
  }, [dispatch]);

  const noAuthRoutes = ['/log-in', '/sign-up'];
  if (!currentUser && !noAuthRoutes.includes(location.pathname)) {
    history.push('/log-in');
  } else if (currentUser && noAuthRoutes.includes(location.pathname)) {
    history.push('/');
  }

  return (
    <div className={s.root}>
      {!currentUser ?
        <Switch>
          <Route exact path="/log-in" component={LogInPage} />
          <Route exact path="/sign-up" component={SignUpPage} />
        </Switch> :
        <>
          <CssBaseline />
          <AppBar position="absolute" className={clsx(s.appBar, isMenuOpen && s.appBarShift)}>
            <Toolbar className={s.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setIsMenuOpen(true)}
                className={clsx(s.menuButton, isMenuOpen && s.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              <Typography component="h1" variant="h6" noWrap className={s.title}>
                {getAppTitle(location.pathname)}
              </Typography>
              <Typography align="right" variant="subtitle1" noWrap>
                {currentUser.firstName + ' ' + currentUser.lastName}
              </Typography>
              <IconButton color="inherit" onClick={() => dispatch(logOut())}>
                <ExitToApp />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{ paper: clsx(s.drawerPaper, !isMenuOpen && s.drawerPaperClose) }}
            open={isMenuOpen}
          >
            <div className={s.toolbarIcon}>
              <IconButton onClick={() => setIsMenuOpen(false)}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <AppMenu />
          </Drawer>
          <div className={s.content}>
            <Container maxWidth={false} className={s.container}>
              <Grid container spacing={3}>
                <Switch>
                  {/* <Route exact path="/" component={BrandsPage} /> */}
                  {/* <Route exact path="/brand/:brandId" component={BrandPage} /> */}
                  <Route cexact path="/" component={() => <div>Welcome!</div>} />
                  <Route component={() => <div>Page not found</div>} />
                </Switch>
              </Grid>
            </Container>
          </div>
        </>
      }
    </div>
  );
};

export default App;
