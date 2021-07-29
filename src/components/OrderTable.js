import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import CustomerInfo from "./CustomerInfo";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableRowHeader: {
    backgroundColor: "#e0e0e0",
    fontWeight: "bold",
  },
  tableRowHeader2: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
});

function Row(props) {
  const { order } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  let orderDate = order.createdAt.toDate();

  orderDate = moment(orderDate).format("DD/MM/YYYY");

  const grandTotal =
    "$" +
    order.cartProducts
      .reduce((sum, current) => sum + +current.price.slice(1), 0)
      .toFixed(2);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.orderID}
        </TableCell>
        <TableCell align="right">{orderDate}</TableCell>
        <TableCell align="right">{order.status}</TableCell>
        <TableCell align="right">{grandTotal}</TableCell>
        {/*  <TableCell align="right">{order.status}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow className={classes.tableRowHeader2}>
                    <TableCell className={classes.tableRowHeader2}>
                      Product Name
                    </TableCell>
                    <TableCell className={classes.tableRowHeader2}>
                      Unit Price
                    </TableCell>
                    <TableCell
                      className={classes.tableRowHeader2}
                      align="right"
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      className={classes.tableRowHeader2}
                      align="right"
                    >
                      Total price ($)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.cartProducts.map((prd) => (
                    <TableRow key={prd.id}>
                      <TableCell component="th" scope="row">
                        {prd.title}
                      </TableCell>
                      <TableCell>{prd.subtitle}</TableCell>
                      <TableCell align="right">{prd.quantity}</TableCell>
                      <TableCell align="right">{prd.price}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell component="th" scope="row"></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">{grandTotal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <CustomerInfo customer={order.customerInfo} />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function OrderTable(props) {
  const allOrders = useSelector((state) => state.allOrders);
  const classes = useRowStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow className={classes.tableRowHeader}>
            <TableCell />
            <TableCell className={classes.tableRowHeader}>Order No.</TableCell>
            <TableCell align="right" className={classes.tableRowHeader}>
              Date
            </TableCell>
            <TableCell align="right" className={classes.tableRowHeader}>
              Status
            </TableCell>
            <TableCell align="right" className={classes.tableRowHeader}>
              Total
            </TableCell>
            {/* <TableCell align="right" className={classes.tableRowHeader}>
              Actions
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders.map((order) => (
            <Row key={order.orderID} order={order} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
