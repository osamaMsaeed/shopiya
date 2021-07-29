import React from "react";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { useDispatch } from "react-redux";
import { setProfilePanel } from "../actions/profilePanel";

const useStyles = makeStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid #d32f2f`,
    padding: "0 4px",
    color: "#fff",
    fontSize: "0.7em",
    backgroundColor: "#d32f2f",
  },
  icon: {
    color: "#fff",
    fontSize: "1.2em",
  },
}));

export default function ProfileBadge(props) {
  const dispatch = useDispatch();

  const classes = useStyles();
  return (
    <IconButton
      aria-label="cart"
      onClick={() => {
        dispatch(setProfilePanel(true));
      }}
    >
      <Badge classes={{ badge: classes.badge }}>
        <AccountCircleIcon className={classes.icon} />
      </Badge>
    </IconButton>
  );
}
