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
import { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import InputAdornment from "@mui/material/InputAdornment";

export default function AddPayment() {
  const [CustomerName, setCustomerName] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [orderPrice, setOrderPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [orderCustomerName, setOrderCustomerName] = useState([]);
  const [totalList, setTotalList] = useState([]);
  const [orderUID, setOrderUID] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const getItems = async () => {
      await firestoredb.collection("orders").onSnapshot(async (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          var name = doc.data().name;
          console.log("name: " + name);
          var date = doc.data().date.toDate();
          console.log("date: " + date);

          var totalprice = doc.data().totalprice;
          var uid = doc.data().uid;
          var items = doc.data().items;
          console.log("items: " + items);
          data.push({
            date: date,
            name: name,
            cleared: doc.data().cleared,
            totalprice: totalprice,
            uid: uid,
            items: items,
          });
          console.log("Order data: " + doc.data());
        });
        setOrderList(data);

        // console.log("teams: " + teams.data());
      });
    };
    getItems();
  }, []);

  function clearAllFields() {
    setCustomerName("");
    setOrderPrice(0);
    setAmount(0);
    setOrderCustomerName("");
    setOrderUID("");
    setOrderUID(0);
  }

  function addPaymentToDB(amount, name, uid, orderuid, isDeposit, orderPrice) {
    if (isDeposit) {
      firestoredb
        .collection("Deposits")
        .doc(uid)
        .set({
          date: new Date(),
          name: name,
          uid: uid,
          orderuid: orderuid,
          amount: Number(amount),
        });
      firestoredb
        .collection("orders")
        .doc(orderuid)
        .update({
          amountdeposited: Number(amount),
          totalprice: Number(orderPrice - amount),
        });
      alert("Payment successfully made");
    } else {
      firestoredb
        .collection("payments")
        .doc(uid)
        .set({
          date: new Date(),
          name: name,
          uid: uid,
          orderuid: orderuid,
          amount: Number(amount),
        });
      alert("Payment successfully made");
    }
  }
  function makePayment(uid, amount, price) {
    if (price - amount <= 0) {
      firestoredb
        .collection("orders")
        .doc(uid)
        .update({
          cleared: true,
          totalprice: price - amount,
        });
    } else {
      firestoredb
        .collection("orders")
        .doc(uid)
        .update({
          totalprice: price - amount,
        });
    }
  }

  function onClose() {}
  function handleToggle(params) {}

  return (
    <React.Fragment>
      <Title>Make Payment</Title>
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
        <TextField
          onChange={(e) => setAmount(e.target.value)}
          label="Amount"
          value={amount}
          type="number"
          id="outlined-start-adornment"
          //  sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Ksh</InputAdornment>
            ),
          }}
        />
        {/* <TextField
          onChange={(e) => setAmount(e.target.value)}
          id="outlined-number"
          value={amount}
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        /> */}
        <TextField
          id="outlined-select-role"
          select
          sx={{ width: "25ch" }}
          label="Select Order"
          onChange={(value) => {
            // setRole(value.target.value);

            setOrderCustomerName(value.target.value.name);
            setOrderUID(value.target.value.uid);
            setOrderPrice(value.target.value.totalprice);
            // setOrderPrice(value.target.price);
          }}
        >
          <Button
            variant="text"
            onClick={() => {
              console.log("order UID: " + orderUID);

              console.log(orderCustomerName);
            }}
          >
            test
          </Button>
          {orderList.map((order) => {
            return (
              <MenuItem
                key={order.uid}
                price={order.totalprice}
                value={order}
                uid={order.uid}
              >
                {order.name +
                  "\nDate: " +
                  order.date.toString() +
                  "\nUID: " +
                  order.uid}
              </MenuItem>
            );
          })}
        </TextField>

        <Button
          onClick={() => {
            addPaymentToDB(
              amount,
              CustomerName,
              uuidv4(),
              orderUID,
              false,
              orderPrice
            );
            makePayment(orderUID, amount, orderPrice);

            clearAllFields();
          }}
          variant="text"
        >
          Add as payment
        </Button>
        <Button
          onClick={() => {
            addPaymentToDB(
              amount,
              CustomerName,
              uuidv4(),
              orderUID,
              true,
              orderPrice
            );

            clearAllFields();
          }}
          variant="text"
        >
          Add as deposit
        </Button>
      </Form>
    </React.Fragment>
  );
}
