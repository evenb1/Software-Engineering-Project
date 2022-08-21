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

export default function AddUser() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [role, setRole] = useState("employee");
  const [fullname, setFullname] = useState("");
  const [userRole, setUserRole] = useState("employee");
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
    setAge(0);
    setFullname("");
    setEmail("");
    setPassword("");
    setRole(roles[1]);
  }

  function addUserToDB(email, age, fullname, role, uid) {
    firestoredb.collection("users").doc(uid).set({
      email: email,
      fullname: fullname,
      age: age,
      role: role,
      uid: uid,
    });
  }

  return (
    <React.Fragment>
      <Title>Add User</Title>
      <Form>
        <TextField
          onChange={(e) => setFullname(e.target.value)}
          id="outlined-basic"
          value={fullname}
          label="Full Name"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          id="outlined-basic"
          value={email}
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setAge(e.target.value)}
          id="outlined-number"
          value={age}
          label="Age"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          id="outlined-password-input"
          value={password}
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-select-role"
          select
          label="Select"
          value={role}
          onChange={(value) => {
            setRole(value.target.value);
          }}
          
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          onClick={() => {
            auth
              .doCreateUserWithEmailAndPassword(email, password)
              .then((authUser) => {
                addUserToDB(email, age, fullname, role, authUser.user.uid);
                alert("User successfully added");
              })
              .catch((err) => {
                alert("Error: " + err.message);
              });
            clearAllFields();
          }}
          variant="text"
        >
          Add User
        </Button>
      </Form>
    </React.Fragment>
  );
}
