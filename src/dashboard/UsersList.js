import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CircularProgress, Button } from "@mui/material";
import Title from "./Title";
import { useState } from "react";
import { useEffect } from "react";
import { firestoredb } from "../firebase/firebase";
import { getUID } from "../firebase/firebase";
import { Link } from "react-router-dom";
import * as routes from '../constants/routes'

export default function UsersList() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  
  const updateUserRole = async (uid, newRole) => {
    await firestoredb.collection("users").doc(uid).update({
      role: newRole,
    });
    alert("User role updated to: " + newRole);
  };
 
  var uid = getUID();
  useEffect(() => {
    const getItems = async () => {
      setIsLoading(true);
      firestoredb.collection("users").onSnapshot(async (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setUserList(data);
        setIsLoading(false);
        // console.log("teams: " + teams.data());
      });
    };
    getItems();
  }, [uid]);

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
                <TableCell>Email</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user) => {
                return (
                  <TableRow key={user.uid}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.fullname}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    {user.role === "employee" ? (
                      <TableCell>
                        <Link to={routes.LANDING}>
                          <Button
                          onClick={() => {
                            updateUserRole(user.uid, "staff");
                          }}
                          variant="text"
                        >
                          Change Role to staff
                        </Button>
                        </Link>
                        
                      </TableCell>
                    ) : (
                      <TableCell>
                        <Button
                          onClick={() => {
                            updateUserRole(user.uid, "employee");
                          }}
                          variant="text"
                        >
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
