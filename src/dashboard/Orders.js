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
import { Typography } from "@mui/material";
import { firestoredb } from "../firebase/firebase";


function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      setIsLoading(true);
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

        setIsLoading(false);
        // console.log("teams: " + teams.data());
      });
    };
    getItems();
  }, []);

  return (
    <React.Fragment>
      <Title>Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date Added</TableCell>
            {/* <TableCell>Customer Name</TableCell>
            <TableCell align="right">Total</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((order) => {
            console.log(order.cleared);
            var open = true;
            return (
              <>
                <TableRow key={order.uid}>
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
                  <TableCell>{order.date.toString()}</TableCell>
                  <TableCell>{"Customer Name: " + order.name}</TableCell>

                  <TableCell align="right">{`Total: Ksh ${order.totalprice}`}</TableCell>
                  {order.cleared === false ? (
                    <TableCell>Not Paid</TableCell>
                  ) : (
                    <></>
                  )}
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography gutterBottom component="div">
                          Items Ordered
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell align="right">Quantity</TableCell>

                              <TableCell align="right">
                                Total price (Ksh)
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.items.map((item) => (
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  {item.name}
                                </TableCell>

                                <TableCell align="right">
                                  {item.amount}
                                </TableCell>
                                <TableCell align="right">
                                  {item.total}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
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
