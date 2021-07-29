import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import CardBadge from "./CartBadge";
import ProfileBadge from "./ProfileBadge";

const useStyles = makeStyles(() => ({
  typoGraphyStyles: {
    flex: 1,
    fontSize: "1.5em",
  },

  headerColor: {
    backgroundColor: "#4a4945",
    color: "#ffff",
  },
  link: {
    color: "#ffff",
    textDecoration: "none",
  },
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.headerColor}>
      <Toolbar>
        <Typography className={classes.typoGraphyStyles}>
          <Link to="/" className={classes.link}>
            Shopiyaa
          </Link>
        </Typography>
        <ProfileBadge />
        <CardBadge />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
