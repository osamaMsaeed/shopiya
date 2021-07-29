import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "25rem",
    backgroundColor: "#f0f0f0",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    borderRadius: "1rem",
    padding: "2rem",
  },
  mobilePaper: {
    position: "absolute",
    width: "16rem",
    backgroundColor: "#f0f0f0",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    borderRadius: "1rem",
    padding: "1rem",
  },
  modalTitle: {
    textAlign: "center",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "50px",
  },
  flexItem: {
    width: "200px",
    fontSize: "1rem",
  },
}));

export default function CustomerInfo(props) {
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  const customer = props.customer;

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div
      style={modalStyle}
      className={clsx(matches ? classes.paper : classes.mobilePaper)}
    >
      <h2 id="simple-modal-title" className={classes.modalTitle}>
        Customer Information
      </h2>
      <div className={classes.flexContainer}>
        <h5 className={classes.flexItem}>Name: </h5>
        <p className={classes.flexItem}>
          {customer.firstName + " " + customer.lastName}
        </p>
      </div>
      <div className={classes.flexContainer}>
        <h5 className={classes.flexItem}>Email: </h5>
        <p className={classes.flexItem}>{customer.email}</p>
      </div>
      <div className={classes.flexContainer}>
        <h5 className={classes.flexItem}>Phone: </h5>
        <p className={classes.flexItem}>{customer.phone}</p>
      </div>
      <div className={classes.flexContainer}>
        <h5 className={classes.flexItem}>Address: </h5>
        <p className={classes.flexItem}>{customer.address}</p>
      </div>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Customer Information
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
