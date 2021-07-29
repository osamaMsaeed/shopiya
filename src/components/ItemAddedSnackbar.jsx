import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import {useDispatch, useSelector} from 'react-redux'
import {itemAdded} from '../actions/itemAddedNotification'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
        
      },
    },
  }));

  export default function ItemAddedSnackbar() {
      const open = useSelector(state=>state.itemAddedNotification)
    const classes = useStyles();

    const dispatch = useDispatch();
    
  
    return (
      <div className={classes.root}>
        
        <Snackbar open={open} autoHideDuration={2000} onClose={()=>{dispatch(itemAdded(false))}}>
          <Alert onClose={()=>{dispatch(itemAdded(false))}} severity="success">
            Product added to the cart!
          </Alert>
        </Snackbar>
        
        
      </div>
    );
  }