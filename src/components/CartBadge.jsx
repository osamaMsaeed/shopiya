import React from 'react';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import {useDispatch, useSelector} from 'react-redux'
import {setCartPanel} from '../actions/panel'

const useStyles = makeStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid #d32f2f`,
    padding: '0 4px',
    color: '#fff',
    fontSize:'0.7em',
    backgroundColor:'#d32f2f'
  },
  icon:{
      color:'#fff',
      fontSize:'1.2em'
  }
}));

export default function CardBadge(props) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state=>state.cartProducts);
  
    const classes = useStyles();
  return (
    <IconButton aria-label="cart" onClick={()=>{dispatch(setCartPanel(true))}}>
      <Badge badgeContent={cartItems.length} classes={{badge:classes.badge}} >
        <ShoppingCartIcon className={classes.icon}/>
      </Badge>
    </IconButton>
  );
}