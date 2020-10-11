import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {useObserver} from "mobx-react-lite";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FlagIcon from '@material-ui/icons/Flag';
import store from '../stores/Store'
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
  }
  
}));

export default function Inbox() {
  const[allmail] = useState(store.allmail);
  const classes = useStyles();
  
  const[extetion] = useState('...')
 
  return useObserver(() => (
    <div className={''}>
      <main className={''}>
        <div />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <List className={classes.root1} >
                      {
                        allmail && allmail.map((item,index)=>{
                          return(
                            <div key={index}>
                              <ListItem alignItems="flex-start" key={index} onClick={() => store.updateMailCount(item,index)} selected={item.unread === false}>
                                 <ListItemAvatar>
                                  <Avatar alt="Remy Sharp"  />
                                 </ListItemAvatar>
                                 <ListItemText
                                   primary={item.mId}
                                   secondary={
                                    <span className={classes.inline}>
                                      {item.subject}
                                        <br/>
                                      <span>
                                        {item.content.slice(0, 70)}{extetion}
                                      </span>
                                    </span>
                                  }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments" onClick={() => store.updateCount(item,index)}>
                                        <DeleteIcon />
                                        <FlagIcon/>
                                    </IconButton>
                                   </ListItemSecondaryAction>
                                   <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments" onClick={() => store.updateFlagCount(item,index)}>
                                        <FlagIcon />
                                    </IconButton>
                                   </ListItemSecondaryAction>
                                </ListItem>
                              <Divider>
                                
                              </Divider>
                            </div>
                          )
                        })
                      }
                    </List>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <Grid item xs={3}>
                      <div style={{ width: '412%'}}>
                      {store.selectedmail && <List className={classes.root1}>
                            <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp"  />
                            </ListItemAvatar>
                            < ListItemText
                                primary={store.selectedmail.mId}
                                secondary={
                                    <span className={classes.inline}>
                                    {store.selectedmail.subject}
                                    <br/>
                                    <span>
                                      To:You
                                    </span>
                                    <br/>
                                    {store.selectedmail.content}
                                    </span>
                                   }
                                />
                            </ListItem>
                          </List>
                          }
                        </div>
                     </Grid>
                  </Paper>
              </Grid>
            </Grid>
        </Container>
      </main>
    </div>
  ));
}