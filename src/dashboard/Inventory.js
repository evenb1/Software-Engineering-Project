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
import { getUID } from "../firebase/firebase";

export default function Inventory() {
  const [stockList, setStockList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <React.Fragment>
      <Title>Users</Title>
      <Table size="small">
        {isLoading === true ? (
          <CircularProgress color="inherit" />
        ) : (
          <div>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>In Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockList.map((stock) => {
                return (
                  <TableRow key={stock.uid}>
                    <TableCell>{stock.date}</TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>{stock.price}</TableCell>
                    <TableCell>{stock.stock} items left</TableCell>
                    {stock.role === "employee" ? (
                      <TableCell>
                        <Button onClick={() => {}} variant="text">
                          Change Role to staff
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <Button onClick={() => {}} variant="text">
                          Change Role to employee
                        </Button>
                      </TableCell>
                    )}
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
