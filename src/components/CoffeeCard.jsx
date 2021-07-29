import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar, CardMedia } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

import { useDispatch, useSelector } from "react-redux";
import { productIncrement } from "../actions/cartProducts";
import { itemAdded } from "../actions/itemAddedNotification";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 185,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  button: {
    "&:hover": {
      backgroundColor: "#4a4945",
      color: "#ffff",
      border: "none",
    },
    "&": {
      maxWidth: "7em",
      maxHeight: "6em",
      minWidth: "7em",
      minHeight: "4em",
      fontSize: "0.7em",
      fontWeight: "bold",
      border: "0.5px solid black",
    },
  },
  link: {
    textDecoration: "none",
  },
  badge: {
    border: `2px solid #d32f2f`,
    padding: "0.7rem",
    color: "#fff",
    backgroundColor: "#d32f2f",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    position: "absolute",
    right: "0.3rem",
    top: "0.3rem",
    zIndex: "1",
    boxShadow: "0.2rem 0.2rem 0.1rem #888888",
  },

  action: {
    margin: 0,
  },
}));

export default function CoffeCard(props) {
  const dispatch = useDispatch();

  const classes = useStyles();

  const { id, avatarSrc, title, subtitle, description, imgSrc } = props;
  const cartProducts = useSelector((state) =>
    state.cartProducts.filter((prd) => prd.id == id)
  );

  const incrementItem = () => {
    const item = { id, title, subtitle, avatarSrc };
    dispatch(productIncrement(item));
    dispatch(itemAdded(true));
  };

  const getQuantity = () => {
    if (cartProducts.length == 0) {
      return 0;
    } else {
      return cartProducts.filter((prd) => prd.id == id)[0].quantity;
    }
  };

  const handleBadgeNode = () => {
    if (!getQuantity()) {
      return null;
    } else if (getQuantity()) {
      return (
        <span className={classes.badge}>
          <Badge badgeContent={getQuantity()}></Badge>
        </span>
      );
    }
  };

  return (
    <Card
      className={classes.root}
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <CardHeader
        avatar={
          <Avatar src={avatarSrc} alt="pic">
            R
          </Avatar>
        }
        action={
          /*  <IconButton aria-label="settings">
           
          </IconButton> */

          handleBadgeNode()
        }
        title={title}
        subheader={subtitle}
        classes={{ action: classes.action }}
      />
      <Link to={`/product/${props.id}`}>
        <CardMedia className={classes.media} image={imgSrc} />
      </Link>
      <CardContent>
        <Typography variant="body2" component="p" color="textSecondary" noWrap>
          {description}
        </Typography>
        <br></br>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          startIcon={<ShoppingCartOutlinedIcon />}
          className={classes.button}
          onClick={() => {
            incrementItem();
          }}
        >
          BUY
        </Button>
        <Link to={`/product/${props.id}`} className={classes.link}>
          <Button size="small" variant="outlined" className={classes.button}>
            Explore
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
