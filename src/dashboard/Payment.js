import { useEffect, useState } from "react";
import React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Title from "./Title";
import { IconButton, Typography } from "@mui/material";
import { firestoredb } from "../firebase/firebase";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function preventDefault(event) {
  event.preventDefault();
}

export default function Payment() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentList, setPaymentList] = useState([]);


  useEffect(() => {
    const getItems = async () => {
      setIsLoading(true);
      await firestoredb.collection("payments").onSnapshot(async (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          var name = doc.data().name;
          console.log("name: " + name);
          var date = doc.data().date.toDate();
          console.log("date: " + date);

          var amount = doc.data().amount;
          var uid = doc.data().uid;
          var deposit = doc.data().deposit;
          
          data.push({
            date: date,
            name: name,
            amount: amount,
            uid: uid,
            deposit: deposit,
          });
          console.log("Payment data: " + doc.data());
        });
        setPaymentList(data);

        setIsLoading(false);
        // console.log("teams: " + teams.data());
      });
    };
    getItems();
  }, []);

  return (
    <React.Fragment>
      <Title>Payments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date Added</TableCell>
            {/* <TableCell>Customer Name</TableCell>
            <TableCell align="right">Total</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentList.map((payment) => {
            
            var open = true;
            return (
              <>
                <TableRow key={payment.uid}>
                  {/* <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => {
                        open = !open;
                        setChecked(false);
                      }}
                    >
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell> */}
                  <TableCell>{payment.date.toString()}</TableCell>
                  <TableCell>{"Customer Name: " + payment.name}</TableCell>

                  <TableCell align="right">{`Amount: Ksh ${payment.totalprice}`}</TableCell>
                  
                </TableRow>
                
                <br />
                <br />
              </>
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
