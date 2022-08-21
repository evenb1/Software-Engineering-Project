import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { Form, InputGroup, Container } from "react-bootstrap";
import { MenuItem, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { firestoredb } from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../firebase";
import InputAdornment from "@mui/material/InputAdornment";
export default function Addstock() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);

  const roles = [
    {
      value: "staff",
      label: "Staff",
    },
    {
      value: "employee",
      label: "Employee",
    },
  ];
  function clearAllFields() {
    setName("");
    setPrice(0);
    setAmount(0);
  }

  function addstockToDB(price, name, stock, uid) {
    firestoredb.collection("inventory").doc(uid).set({
      date: new Date(),
      name: name,
      stock: Number(stock),
      uid: uid,
      price: Number(price),
    });
  }

  return (
    <React.Fragment>
      <Title>Add stock</Title>
      <Form>
        <TextField
          onChange={(e) => {
            setName(e.target.value);
          }}
          id="outlined-basic"
          value={name}
          label="Item Name"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setAmount(e.target.value)}
          id="outlined-number"
          value={amount}
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
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
        />

        <Button
          onClick={() => {
            addstockToDB(price, name, amount, uuidv4());
            alert("Stock item added");
            clearAllFields();
          }}
          variant="text"
        >
          Add stock
        </Button>
      </Form>
    </React.Fragment>
  );
}
