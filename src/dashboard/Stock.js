import React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CircularProgress, MenuItem, TextField, Button } from "@mui/material";
import Title from "./Title";
import { useState } from "react";
import { useEffect } from "react";
import { firestoredb } from "../firebase/firebase";

export default function StocksList() {
  const [stockList, setStockList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [stockAmount, setStockAmount] = useState(0);

  //   const updateStockRole = async (uid, newRole) => {
  //     await firestoredb.collection("Stocks").doc(uid).update({
  //       role: newRole,
  //     });
  //     alert("Stock role updated to: " + newRole);
  //   };

  useEffect(() => {
    const getItems = async () => {
      setIsLoading(true);
      firestoredb.collection("inventory").onSnapshot(async (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          var name = doc.data().name;
          console.log("name: " + name);
          var date = doc.data().date.toDate();
          console.log("date: " + date);

          var price = doc.data().price;
          var uid = doc.data().uid;
          var stock = doc.data().stock;
          data.push({
            date: date,
            name: name,
            price: price,
            uid: uid,
            stock: stock,
          });
          console.log("Stock data: " + doc.data());
        });
        setStockList(data);

        setIsLoading(false);
        // console.log("teams: " + teams.data());
      });
    };
    getItems();
  }, []);

  return (
    <React.Fragment>
      <Title>Stocks</Title>
      <Table size="small">
        {isLoading === true ? (
          <CircularProgress color="inherit" />
        ) : (
          <div>
            <TableHead>
              <TableRow>
                <TableCell>Recently Updated</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Item ID</TableCell>
                <TableCell>In Stock</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Add Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {stockList.map((stock) => {
                
                var stockAmount=0
                return (
                  <TableRow key={stock.uid}>
                    <TableCell>{stock.date.toString()}</TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>{stock.uid}</TableCell>
                    <TableCell>{stock.stock}</TableCell>

                    <TableCell>{stock.price}</TableCell>
                    <TableCell>
                      <TextField
                        onChange={(e) => stockAmount=e.target.value}
                        id="outlined-number"
                        
                        // label="In"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={async () => {
                          await firestoredb
                            .collection("inventory")
                            .doc(stock.uid)
                            .update({
                              stock:Number(stock.stock)+Number(stockAmount)
                            });
                        }}
                        variant="text"
                      >
                        Add Stock
                      </Button>
                      <Button
                        onClick={async () => {
                          await firestoredb
                            .collection("inventory")
                            .doc(stock.uid)
                            .update({
                              stock: Number(stock.stock)-Number(stockAmount)
                            });
                        }}
                        variant="text"
                      >
                        Reduce Stock
                      </Button>
                    </TableCell>
                    {/* {stock.role === "employee" ? (
                      <TableCell>
                        <Button
                          onClick={() => {
                            
                          }}
                          variant="text"
                        >
                          Change Role to staff
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <Button
                          onClick={() => {
                            updatestockRole(stock.uid, "employee");
                          }}
                          variant="text"
                        >
                          Change Role to employee
                        </Button>
                      </TableCell>
                    )} */}
                  </TableRow>
                );
              })}
            </TableBody>
          </div>
        )}
      </Table>
    </React.Fragment>
  );
}
