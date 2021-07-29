import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: "2rem",
    textAlign: "center",
  },
  label: {
    fontSize: "1.3rem",
  },
  input: {
    width: "100%",
    minHeight: "1.3rem",
  },
  credential: {
    marginBottom: "2rem",
  },
  button: {
    "&:hover": {
      backgroundColor: "#4a4945",
    },
    "&": {
      maxWidth: "100%",
      maxHeight: "3rem",
      minWidth: "100%",
      minHeight: "3rem",
      fontSize: "0.9rem",
      backgroundColor: "#000000",
      color: "#ffff",
    },
  },
  button2: {
    "&:hover": {
      backgroundColor: "#4a4945",
    },
    "&": {
      maxWidth: "50%",
      maxHeight: "3rem",
      minWidth: "50%",
      minHeight: "3rem",
      fontSize: "0.9rem",
      backgroundColor: "#000000",
      color: "#ffff",
      marginTop: "2rem",
    },
  },
  link: {
    textDecoration: "none",
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (err) {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "18px" }}>
      <Grid
        item
        container
        spacing={4}
        style={{ marginTop: "8px", boxSizing: "border-box" }}
        alignItems="stretch"
      >
        <Grid item container xs={12}>
          <Grid item xs={false} md={3}></Grid>
          <Grid item xs={12} md={6}>
            <Card style={{ padding: "20px" }}>
              <Typography className={classes.heading}>Log In</Typography>
              {error && <Alert severity="error">{error}</Alert>}
              {message && <Alert severity="success">{message}</Alert>}
              <form onSubmit={(e) => handleSubmit(e)}>
                <Grid item container xs={12} className={classes.credential}>
                  <Grid item xs={12}>
                    <label htmlFor="email">
                      <Typography className={classes.label}>Email:</Typography>
                    </label>
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className={classes.input}
                      required
                      ref={emailRef}
                      autoComplete="off"
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    disabled={loading}
                    className={classes.button}
                  >
                    Reset Password
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Link to="/login">
                    <Typography
                      style={{
                        textAlign: "center",
                        marginTop: "1rem",
                        textDecoration: "underline",
                      }}
                    >
                      Log In
                    </Typography>
                  </Link>
                </Grid>
              </form>
            </Card>
          </Grid>
          <Grid item xs={false} md={3}></Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ForgotPassword;
