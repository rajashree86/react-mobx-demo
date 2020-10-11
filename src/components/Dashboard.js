import React, { useState } from 'react';
import Inbox from './Inbox'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import {useObserver} from "mobx-react-lite";
import store from '../stores/Store'
import Spam from './Spam'
import CustomFolder from './CustomFolder'
import Trash from './Trash'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
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
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
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
    width: drawerWidth,
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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  
}));

export default function Dashboard() {
  const[allunreadmail] = useState(store.loadUnreadMail);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const[showInbox,setShowInbox] = useState(true)
  const[showSpam,setShowSpam] = useState(false)
  const[showTrash,setShowTrash] = useState(false)
  const[showCustomFolder,setShowCustomFolder] = useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  //while click on the inbox icon
  const handleInboxClick = (data,index) =>{
    setSelectedIndex(index);
    setShowCustomFolder(false)
    setShowTrash(false)
    setShowSpam(false)
    setShowInbox(true)
  }
  

  const handleSpamClick = (data,index) => {
    setSelectedIndex(index);
    setShowCustomFolder(false)
    setShowTrash(false)
    setShowSpam(true)
    setShowInbox(false)
  }
  const handleTrashClick = (data,index) => {
    setSelectedIndex(index);
    setShowCustomFolder(false)
    setShowTrash(true)
    setShowSpam(false)
    setShowInbox(false)

  }
  const handleCustomFClick = (data,index) => {
    setSelectedIndex(index);
    setShowCustomFolder(true)
    setShowTrash(false)
    setShowSpam(false)
    setShowInbox(false)
  }
  
  return useObserver(() => (
    <div className={classes.root}>
      <CssBaseline />
       <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
            <List component="nav" aria-label="main mailbox folders">
             <ListItem button selected={selectedIndex === 0}
              onClick={(event) => handleInboxClick(event, 0)}>
                <ListItemIcon>
                  <Badge badgeContent={allunreadmail} color="secondary">
                      <InboxIcon />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary="Inbox" />
             </ListItem>
            <Divider />
            <ListItem button  selected={selectedIndex === 1}
              onClick={(event) => handleSpamClick(event, 1)} >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Spam" />
            </ListItem>
            <Divider/>
            <ListItem button  selected={selectedIndex === 2}
              onClick={(event) => handleTrashClick(event, 2)} >
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Trash" />
            </ListItem>
            <Divider />
            <ListItem button  selected={selectedIndex === 3}
              onClick={(event) => handleCustomFClick(event, 3)}>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Custom Folder" />
            </ListItem>
         </List>
       </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {showInbox && <Inbox/>}
          {showSpam && <Spam/>}
          {showCustomFolder && <CustomFolder/>}
          {showTrash && <Trash/>}
        </Container>
      </main>
    </div>
  ));
}