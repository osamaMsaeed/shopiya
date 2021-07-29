import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Alert from "@material-ui/lab/Alert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
import { Grid, Typography, Divider, Button } from "@material-ui/core";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useDispatch, useSelector } from "react-redux";

import { setProfilePanel } from "../actions/profilePanel";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles({
  list: {
    width: 430,
  },
  mobileList: {
    width: "16em",
  },
  emptyList: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  button: {
    "&:hover": {
      backgroundColor: "#4a4945",
    },
    "&": {
      maxHeight: "6em",
      minWidth: "100%",
      minHeight: "2em",
      fontSize: "1rem",
      backgroundColor: "#000000",
      color: "#ffff",
    },
  },
  link: {
    color: "#000000",
    textDecoration: "none",
  },
  items: {
    "&": {
      cursor: "pointer",
    },
    "&:hover": {
      backgroundColor: "#e3e3e3",
    },
  },
});

export default function ProfileDrawer(props) {
  const dispatch = useDispatch();

  const matches = useMediaQuery("(min-width:600px)");

  const anchor = "panel";

  const classes = useStyles();

  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      history.push("/");
      dispatch(setProfilePanel(false));
    } catch (err) {
      setError("Failed to log out");
    }
  };

  const list = (anchor) => (
    <div className={classes.emptyList} role="presentation">
      <List>
        {currentUser ? (
          <>
            <ListItem style={{ backgroundColor: "#c6dec1" }}>
              <Grid item container>
                <ListItemText
                  primary={`User: ${currentUser.email}`}
                  primaryTypographyProps={{ style: { wordWrap: "normal" } }}
                />
              </Grid>
            </ListItem>
            <div className={classes.items}>
              <Link
                to="/dashboard"
                className={classes.link}
                onClick={() => dispatch(setProfilePanel(false))}
              >
                <ListItem>
                  <Grid item container>
                    <ListItemText
                      primary="Dashboard"
                      primaryTypographyProps={{ style: { wordWrap: "normal" } }}
                    />
                  </Grid>
                </ListItem>
              </Link>
            </div>
            <Divider />
            <div className={classes.items}>
              <Link
                to="/orders"
                className={classes.link}
                onClick={() => dispatch(setProfilePanel(false))}
              >
                <ListItem>
                  <Grid item container>
                    <ListItemText
                      primary="Orders"
                      primaryTypographyProps={{ style: { wordWrap: "normal" } }}
                    />
                  </Grid>
                </ListItem>
              </Link>
            </div>
            <Divider />
            <div className={classes.items}>
              <Link
                to="/update-profile"
                className={classes.link}
                onClick={() => dispatch(setProfilePanel(false))}
              >
                <ListItem>
                  <Grid item container>
                    <ListItemText
                      primary="Update Profile"
                      primaryTypographyProps={{ style: { wordWrap: "normal" } }}
                    />
                  </Grid>
                </ListItem>
              </Link>
            </div>
            <Divider />
            <div className={classes.items}>
              <Link
                to="/signup"
                className={classes.link}
                onClick={() => dispatch(setProfilePanel(false))}
              >
                <ListItem>
                  <Grid item container>
                    <ListItemText
                      primary="Create Another Account"
                      primaryTypographyProps={{ style: { wordWrap: "normal" } }}
                    />
                  </Grid>
                </ListItem>
              </Link>
            </div>
            <Divider />
            <div
              className={classes.items}
              onClick={() => {
                handleLogout();
              }}
            >
              <ListItem>
                <Grid item container>
                  <ListItemText
                    primary="Log Out"
                    primaryTypographyProps={{ style: { wordWrap: "normal" } }}
                  />
                </Grid>
              </ListItem>
            </div>
            {error && <Alert severity="error">{error}</Alert>}
          </>
        ) : (
          <>
            <div className={classes.items}>
              <Link
                to="/login"
                className={classes.link}
                onClick={() => dispatch(setProfilePanel(false))}
              >
                <ListItem>
                  <Grid item container>
                    <ListItemText
                      primary="Log In (for Admin)"
                      primaryTypographyProps={{ style: { wordWrap: "normal" } }}
                    />
                  </Grid>
                </ListItem>
              </Link>
            </div>
            <Divider />
          </>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor="right"
          open={useSelector((state) => state.profilePanel)}
          onClose={() => {
            dispatch(setProfilePanel(false));
          }}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
