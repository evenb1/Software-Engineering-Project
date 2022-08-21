import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { Form, InputGroup, Container } from "react-bootstrap";
import Table from "@mui/material/Table";
import {
  MenuItem,
  TextField,
  Button,
  Alert,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import { firestoredb } from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../firebase";
import InputAdornment from "@mui/material/InputAdornment";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import { Label } from "@material-ui/icons";

export default function AddOrder() {
  const [CustomerName, setCustomerName] = useState("");
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [item, setItem] = useState([]);
  const [totalList, setTotalList] = useState([]);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const [stockList, setStockList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      firestoredb.collection("inventory").onSnapshot(async (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          var name = doc.data().name;
          var Iprice = doc.data().price;
          var uid = doc.data().uid;

          data.push({
            name: name,
            price: Iprice,
            quantity: 0,
          });
        });
        setStockList(data);

        // console.log("teams: " + teams.data());
      });
    };
    getItems();
  }, []);
  function clearAllFields() {
    setCustomerName("");
    setPrice(0);
    setAmount(0);
    setTotalList([]);
    setTotal(0);
  }

  function addOrderToDB(total, name, uid, items) {
    firestoredb
      .collection("orders")
      .doc(uid)
      .set({
        date: new Date(),
        name: name,
        uid: uid,
        cleared: false,
        totalprice: Number(total),
        items: items,
      });
    alert("Order successfully added");
  }

  function SimpleDialog(onClose, selectedValue, open, handleToggle) {
    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
      onClose(value);
    };
    // var totalList = [];
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Items in stock</DialogTitle>
        <List sx={{ pt: 0 }}>
          {stockList.map((stock) => {
            var amount = 0;
            return (
              <ListItem key={stock.name}>
                <ListItemText primary={stock.name} />
                <Typography>Ksh: </Typography>
                <ListItemText primary={stock.price} />
                <TextField
                  onChange={(e) => {
                    amount = e.target.value;
                    console.log(amount);
                    setChecked();
                  }}
                  id="outlined-number"
                  label="Quantity"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button
                  onClick={() => {
                    // handleListItemClick("addAccount");
                    var addedAmount = amount * stock.price;
                    console.log("added amount: " + addedAmount);
                    var data = [];
                    data.push({
                      name: stock.name,
                      total: addedAmount,
                      amount: amount,
                    });
                    var temp = totalList;
                    console.log("temp: " + data.name);

                    setTotalList(temp.concat(data));
                    console.log(totalList);
                    setTotal(total + amount * stock.price);

                    amount = 0;
                  }}
                  variant="text"
                >
                  Add
                </Button>
              </ListItem>
            );
          })}

          <Button
            onClick={() => {
              setTotal(0);
              setTotalList([]);
            }}
            variant="text"
          >
            Clear
          </Button>
        </List>

        <Typography variant="h5">{"Total:\n"}</Typography>
        <Typography variant="h6">
          {"Ksh "}
          {total}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalList.map((item) => {
              return (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.total}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Button
          onClick={() => {
            // handleListItemClick("addAccount");
            setPrice(total);
            setOpen(false);
          }}
          variant="text"
        >
          Continue
        </Button>
      </Dialog>
    );
  }
  function onClose() {}
  function handleToggle(params) {}

  return (
    <React.Fragment>
      <Title>Add order</Title>
      <Form>
        <TextField
          onChange={(e) => {
            setCustomerName(e.target.value);
          }}
          id="outlined-basic"
          value={CustomerName}
          label="Buyer Name"
          variant="outlined"
        />
        {/* <TextField
          onChange={(e) => setPrice(e.target.value)}
          label="Unit Price"
          type="number"
          id="outlined-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Ksh</InputAdornment>
            ),
          }}
        /> */}
        Total: Ksh {price}
        <Button
          onClick={() => {
            setTotal(0);
            setTotalList([]);
            setOpen(true);
          }}
          variant="text"
        >
          View items
        </Button>
        <Button
          onClick={() => {
            addOrderToDB(price, CustomerName, uuidv4(), totalList);

            clearAllFields();
          }}
          variant="text"
        >
          Add order
        </Button>
      </Form>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {totalList.map((item) => {
            return (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.total}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {SimpleDialog(onClose(), selectedItems, open, handleToggle())}
    </React.Fragment>
  );
}
